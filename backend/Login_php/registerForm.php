<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require 'dbtest.php';

class RegisterForm {
    private $db;

    public function __construct() {
        $this->db = new Database('tinytoes');
    }

    public function handleRequest() {
        try {
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $input = json_decode(file_get_contents('php://input'), true);

                if (json_last_error() !== JSON_ERROR_NONE) {
                    echo json_encode(['errors' => 'Invalid JSON input']);
                    return;
                }

                $enteredOtp = isset($input['enteredOtp']) ? (int)$input['enteredOtp'] : '';
                $email = isset($input['email']) ? filter_var($input['email'], FILTER_VALIDATE_EMAIL) : '';

                $errors = [];

                if (empty($email) || !$email) {
                    $errors['email'] = 'A valid email is required.';
                }

                if (!empty($errors)) {
                    echo json_encode(['errors' => $errors]);
                    return;
                }

                // Verify OTP and handle the result
                $verification = $this->verifyOTP($email, $enteredOtp);

                if ($verification['isValid']) {
                    $this->transferToMainDatabase($email);
                    echo json_encode(['message' => 'Verification successful']);
                } else {
                    echo json_encode([
                        'errors' => 'Invalid OTP',
                        'email' => $email,
                        
                    ]);
                }
            } else {
                echo json_encode(['message' => 'Invalid request method']);
            }
        } catch (Exception $e) {
            echo json_encode(['errors' => 'Server error: ' . $e->getMessage()]);
        }
    }

    public function verifyOTP($email, $enteredOtp) {
        try {
            // Use a parameterized query to prevent SQL injection
            $query = "SELECT otp FROM temporary_otp WHERE email = ?";
            $stmt = $this->db->getConnection()->prepare($query);

            if (!$stmt) {
                throw new Exception("Prepare failed: " . $this->db->getConnection()->error);
            }

            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result()->fetch_assoc();

            
          

            $stmt->close();

            return [
                'isValid' => $result && isset($result['otp']) && (int)$result['otp'] === (int)$enteredOtp,
                'storedOtp' => $result ? $result['otp'] : null
            ];
        } catch (Exception $e) {
            error_log('Database error: ' . $e->getMessage());
            return [
                'isValid' => false,
                'storedOtp' => null
            ];
        }
    }
    
    private function transferToMainDatabase($email) {
        try {
            // Fetch user details from temporary_otp table
            $query = "SELECT first_name, last_name, phone_no, address, password FROM temporary_otp WHERE email = ?";
            $stmt = $this->db->getConnection()->prepare($query);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $userData = $stmt->get_result()->fetch_assoc();

            if ($userData) {
                // Transfer details to the main_user_table
                $query = "INSERT INTO users (first_name, last_name, phone_no, address, email, password) 
                          VALUES (?, ?, ?, ?, ?, ?)";
                $stmt = $this->db->getConnection()->prepare($query);
                $stmt->bind_param(
                    "ssssss",
                    $userData['first_name'],
                    $userData['last_name'],
                    $userData['phone_no'],
                    $userData['address'],
                    $email,
                    $userData['password']
                );
                $stmt->execute();

                // Check if insert was successful
                if ($stmt->affected_rows === 0) {
                    throw new Exception('Failed to insert user data into the main database');
                }

                // Delete the OTP record
                $query = "DELETE FROM temporary_otp WHERE email = ?";
                $stmt = $this->db->getConnection()->prepare($query);
                $stmt->bind_param("s", $email);
                $stmt->execute();
                
                if ($stmt->affected_rows === 0) {
                    throw new Exception('Failed to delete OTP record');
                }
            } else {
                throw new Exception('User data not found');
            }
        } catch (Exception $e) {
            error_log('Database error: ' . $e->getMessage());
            throw new Exception('Failed to transfer data to the main database');
        }
    }
}

$form = new RegisterForm();
$form->handleRequest();
?>
