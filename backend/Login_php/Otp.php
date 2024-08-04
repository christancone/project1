<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'mailotpsend.php';
require 'dbtest.php';

class RegisterForm {
    private $db;

    public function __construct() {
        $this->db = new Database('tiny');
    }

    public function handleRequest() {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $input = json_decode(file_get_contents('php://input'), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                error_log('Invalid JSON input');
                echo json_encode(['errors' => 'Invalid JSON input']);
                return;
            }

            $email = isset($input['email']) ? filter_var($input['email'], FILTER_VALIDATE_EMAIL) : '';
            $password = isset($input['password']) ? $input['password'] : '';
            $confirmPassword = isset($input['confirmPassword']) ? $input['confirmPassword'] : '';
            $firstName = isset($input['firstname']) ? htmlspecialchars($input['firstname']) : '';
            $lastName = isset($input['lastname']) ? htmlspecialchars($input['lastname']) : '';
            $phoneNumber = isset($input['phone_no']) ? htmlspecialchars($input['phone_no']) : '';
            $address = isset($input['address']) ? htmlspecialchars($input['address']) : '';

            // Validate input
            $errors = [];
            if (empty($firstName)) $errors['firstname'] = 'First name is required.';
            if (empty($lastName)) $errors['lastname'] = 'Last name is required.';
            if (empty($phoneNumber)) $errors['phone_no'] = 'Phone number is required.';
            if (empty($address)) $errors['address'] = 'Address is required.';
            if (empty($email) || !$email) $errors['email'] = 'A valid email is required.';
            if (empty($password)) $errors['password'] = 'Password is required.';
            if ($password !== $confirmPassword) $errors['confirmPassword'] = 'Passwords do not match.';

            // Check if email already exists
            if ($this->emailExists($email)) {
                $errors['email'] = 'Email already exists. Please use a different email.';
            }

            if (!empty($errors)) {
                echo json_encode(['errors' => $errors]);
                return;
            }

            $otp = $this->generateOTP();
            try {
                if (sendEmail($email, $otp)) {
                    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                    $this->storeTemporaryData($firstName, $lastName, $phoneNumber, $address, $email, $hashedPassword, $otp);

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
        return rand(1000, 9999);
    }

    private function emailExists($email) {
        // Check in temporary_otp table
        $query = "SELECT COUNT(*) FROM temporary_otp WHERE email = ?";
        $stmt = $this->db->getConnection()->prepare($query);
        
        if ($stmt === false) {
            error_log('Failed to prepare statement for temporary_otp: ' . $this->db->getConnection()->error);
            echo json_encode(['errors' => 'Failed to prepare statement for temporary_otp']);
            return false;
        }
        
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($countTemp);
        $stmt->fetch();
        $stmt->close();
        
        // // Debug output for temporary_otp table
        // error_log('Count in temporary_otp: ' . $countTemp);
        
        // If found in temporary_otp, return true
        if ($countTemp > 0) {
            return true;
        }
        
        // Check in main_user_table table
        $query = "SELECT COUNT(*) FROM users WHERE email = ?";
        $stmt = $this->db->getConnection()->prepare($query);
        
        if ($stmt === false) {
            error_log('Failed to prepare statement for main_user_table: ' . $this->db->getConnection()->error);
            echo json_encode(['errors' => 'Failed to prepare statement for main_user_table']);
            return false;
        }
        
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($countMain);
        $stmt->fetch();
        $stmt->close();
        
        // Debug output for main_user_table
        // error_log('Count in main_user_table: ' . $countMain);
        
        // Return true if found in 2  table
        return $countTemp > 0 || $countMain > 0;
    }
    

    private function storeTemporaryData($firstName, $lastName, $phoneNumber, $address, $email, $hashedPassword, $otp) {
        $query = "INSERT INTO temporary_otp (first_name, last_name, phone_no, address, email, password, otp) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->getConnection()->prepare($query);

        if ($stmt === false) {
            error_log('Failed to prepare statement: ' . $this->db->getConnection()->error);
            echo json_encode(['errors' => 'Failed to prepare statement']);
            return;
        }

        $stmt->bind_param(
            "sssssss",
            $firstName,
            $lastName,
            $phoneNumber,
            $address,
            $email,
            $hashedPassword,
            $otp
        );

        $result = $stmt->execute();
        if (!$result) {
            error_log('Failed to execute statement: ' . $stmt->error);
            echo json_encode(['errors' => 'Failed to execute statement']);
        }
    }
}

$form = new RegisterForm();
$form->handleRequest();
?>
