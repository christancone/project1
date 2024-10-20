<?php

header("Access-Control-Allow-Origin: http://localhost:5174"); // Ensure it's your frontend's URL
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

require 'dbtest.php';

session_start(); // Start the session to access session variables

class RegisterForm {
    private $db;

    public function __construct() {
        $this->db = new Database('tinytoes');
    }

    public function handleRequest() {
        try {
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                // Decode JSON input
                $input = json_decode(file_get_contents('php://input'), true);

                if (json_last_error() !== JSON_ERROR_NONE) {
                    $this->sendResponse(['errors' => 'Invalid JSON input']);
                    return;
                }

                $enteredOtp = isset($input['enteredOtp']) ? (int)trim($input['enteredOtp']) : '';
                $email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL) : '';
                $adminId = ['adminId']; // Validate adminId
                $role = "Parent";
                $errors = [];

                // Input Validation
                if (empty($email)) {
                    $errors['email'] = 'A valid email is required.';
                }

                // Validate role
                $allowedRoles = ['ServiceProvider', 'Parent', 'Admin', 'Attendant'];
                if (!in_array($role, $allowedRoles)) {
                    $errors['role'] = 'Invalid role specified.';
                }

                if (!empty($errors)) {
                    $this->sendResponse(['errors' => $errors]);
                    return;
                }

                // Log adminId before processing
                error_log('Admin ID: ' . $adminId);

                // Verify OTP using session value
                if ($this->verifyOTPWithSession($email, $enteredOtp)) {
                    $this->transferToMainDatabase($email, $role, $adminId);
                    $this->sendResponse(['message' => 'Verification successful']);
                } else {
                    $this->sendResponse([
                        'errors' => 'Invalid OTP',
                        'email' => $email,
                        'otp' => $_SESSION["otp"]
                    ]);
                }
            } else {
                $this->sendResponse(['message' => 'Invalid request method']);
            }
        } catch (Exception $e) {
            // Log the adminId on error
            error_log('Error with Admin ID: ' . $adminId);
            $this->sendResponse(['errors' => 'Server error: ' . $e->getMessage()]);
        }
    }

    private function verifyOTPWithSession($email, $enteredOtp) {
        // Check if session OTP exists
        if (isset($_SESSION['otp'])) {
            // Log both OTP values for debugging
            error_log('Session OTP: ' . $_SESSION['otp'] . ' | Entered OTP: ' . $enteredOtp);
            // Compare session OTP with entered OTP
            return intval($_SESSION['otp']) === intval($enteredOtp);
        }
        return false; // No session OTP found
    }

    private function transferToMainDatabase($email, $role, $adminId) {
        try {
            // Check if the email already exists in the users table
            $checkQuery = "SELECT COUNT(*) FROM users WHERE email = ?";
            $checkStmt = $this->db->getConnection()->prepare($checkQuery);
            $checkStmt->bind_param("s", $email);
            $checkStmt->execute();
            $checkStmt->bind_result($count);
            $checkStmt->fetch();
            $checkStmt->close();

            if ($count > 0) {
                throw new Exception('Email already exists in the main database');
            }

            // Retrieve user data from the temporary_otp table
            $query = "SELECT first_name, last_name, username, phone_no, address, password, adminId FROM temporary_otp WHERE email = ?";
            $stmt = $this->db->getConnection()->prepare($query);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $userData = $stmt->get_result()->fetch_assoc();
            $stmt->close();

            if ($userData) {
                // Log adminId from retrieved data
                error_log('Admin ID from temporary_otp: ' . $userData['adminId']);

                // Hash the password
                $hashedPassword = password_hash($userData['password'], PASSWORD_BCRYPT);

                // Insert the user data into the users table
                $insertQuery = "INSERT INTO users (firstname, lastname, phone_no, address, email, username, password, role, admin_username) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                $stmt = $this->db->getConnection()->prepare($insertQuery);
                $stmt->bind_param(
                    "sssssssss",
                    $userData['first_name'],
                    $userData['last_name'],
                    $userData['phone_no'],
                    $userData['address'],
                    $email,
                    $userData['username'],
                    $hashedPassword,
                    $role,
                    $adminId // Here, we log the adminId that is passed in
                );
                $stmt->execute();

                if ($stmt->affected_rows === 0) {
                    throw new Exception('Failed to insert user data into the main database');
                }

                // Delete the temporary OTP record after successful transfer
                $deleteQuery = "DELETE FROM temporary_otp WHERE email = ?";
                $stmt = $this->db->getConnection()->prepare($deleteQuery);
                $stmt->bind_param("s", $email);
                $stmt->execute();
                if ($stmt->affected_rows === 0) {
                    throw new Exception('Failed to delete OTP record');
                }
            } else {
                throw new Exception('User data not found');
            }
        } catch (Exception $e) {
            // Log adminId on error
            error_log('Error during data transfer for Admin ID: ' . $adminId);
            throw new Exception('Failed to transfer data to the main database: ' . $e->getMessage());
        }
    }

    private function sendResponse($response) {
        header('Content-Type: application/json');
        echo json_encode($response);
    }
}

$form = new RegisterForm();
$form->handleRequest();
