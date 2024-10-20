<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:5174"); // Ensure it's your frontend's URL
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

include 'mailotpsend.php';  // Assuming this file handles sending emails
require 'dbtest.php';  
session_start();
// Assuming this file handles database connection

class RegisterForm {
    private $db;

    public function __construct() {
        $this->db = new Database('tinytoes');  // Initialize database with 'tinytoes' as database name
    }

    public function handleRequest() {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $input = json_decode(file_get_contents('php://input'), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                error_log('Invalid JSON input');
                echo json_encode(['errors' => 'Invalid JSON input']);
                return;
            }

            // Fetching input values with validation
            $username = isset($input['username']) ? trim($input['username']) : '';
            $email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL) : '';
            $password = isset($input['password']) ? $input['password'] : '';
            $confirmPassword = isset($input['confirmPassword']) ? $input['confirmPassword'] : '';
            $firstName = isset($input['firstname']) ? htmlspecialchars(trim($input['firstname'])) : '';
            $lastName = isset($input['lastname']) ? htmlspecialchars(trim($input['lastname'])) : '';
            $phoneNumber = isset($input['phone_no']) ? htmlspecialchars(trim($input['phone_no'])) : '';
            $address = isset($input['address']) ? htmlspecialchars(trim($input['address'])) : '';
            $adminId = isset($input['adminId']) ? htmlspecialchars(trim($input['adminId'])) : '';

            // Validate input
            $errors = [];
            if (empty($username)) $errors['username'] = 'Username is required.';
            if (empty($firstName)) $errors['firstname'] = 'First name is required.';
            if (empty($lastName)) $errors['lastname'] = 'Last name is required.';
            if (empty($phoneNumber)) $errors['phone_no'] = 'Phone number is required.';
            if (empty($address)) $errors['address'] = 'Address is required.';
            if (empty($email) || !$email) $errors['email'] = 'A valid email is required.';
            if (empty($password)) $errors['password'] = 'Password is required.';
            if ($password !== $confirmPassword) $errors['confirmPassword'] = 'Passwords do not match.';
            if (empty($adminId)) $errors['adminId'] = 'adminId is required.';

            // Check if email already exists
            if ($this->emailExists($email)) {
                $errors['email'] = 'Email already exists. Please use a different email.';
            }

            if (!empty($errors)) {
                echo json_encode(['errors' => $errors]);
                return;
            }

            $otp = $this->generateOTP();
            $_SESSION['otp'] = $otp;
            try {
                if (sendEmail($email, $otp)) {
                    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                    $this->storeTemporaryData($firstName, $lastName, $phoneNumber, $address, $email, $hashedPassword, $otp, $username, $adminId);

                    echo json_encode([
                        'message' => 'OTP and email sent successfully',
                        'otp' => $otp
                    ]);
                } else {
                    error_log('Failed to send OTP email');
                    echo json_encode(['errors' => 'Failed to send OTP email']);
                }
            } catch (Exception $e) {
                error_log($e->getMessage());
                echo json_encode(['errors' => 'Error: ' . $e->getMessage()]);
            }
        } else {
            error_log('Invalid request method');
            echo json_encode(['errors' => 'Invalid request method']);
        }
    }

    public function generateOTP() {
        return random_int(1000, 9999);  // Use secure OTP generation
    }

    private function emailExists($email) {
        // Check in temporary_otp table
        $query = "SELECT COUNT(*) FROM temporary_otp WHERE email = ?";
        $stmt = $this->db->getConnection()->prepare($query);
        if (!$stmt) {
            error_log('Failed to prepare statement for temporary_otp: ' . $this->db->getConnection()->error);
            echo json_encode(['errors' => 'Failed to prepare statement for temporary_otp']);
            return false;
        }
        
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($countTemp);
        $stmt->fetch();
        $stmt->close();

        if ($countTemp > 0) {
            return true;
        }
        
        // Check in users table
        $query = "SELECT COUNT(*) FROM users WHERE email = ?";
        $stmt = $this->db->getConnection()->prepare($query);
        if (!$stmt) {
            error_log('Failed to prepare statement for users: ' . $this->db->getConnection()->error);
            echo json_encode(['errors' => 'Failed to prepare statement for users']);
            return false;
        }

        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($countMain);
        $stmt->fetch();
        $stmt->close();

        return $countMain > 0;
    }

    private function storeTemporaryData($firstName, $lastName, $phoneNumber, $address, $email, $hashedPassword, $otp, $username, $adminId) {
        $query = "INSERT INTO temporary_otp (first_name, last_name, phone_no, address, email, username, password, otp, adminId) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->getConnection()->prepare($query);

        if ($stmt === false) {
            error_log('Failed to prepare statement: ' . $this->db->getConnection()->error);
            echo json_encode(['errors' => 'Failed to prepare statement']);
            return;
        }

        $stmt->bind_param(
            "sssssssss",
            $firstName,
            $lastName,
            $phoneNumber,
            $address,
            $email,
            $username,
            $hashedPassword,
            $otp,
            $adminId
        );

        if (!$stmt->execute()) {
            error_log('Failed to execute statement: ' . $stmt->error);
            echo json_encode(['errors' => 'Failed to execute statement']);
            return;
        }

        $stmt->close();
    }
}

$form = new RegisterForm();
$form->handleRequest();
?>
