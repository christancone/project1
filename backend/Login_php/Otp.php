<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'mailotpsend.php';
require 'dbtest.php';

class RegisterForm {
    private $db;

    public function __construct() {
        $this->db = new Database('tint_toy');
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
            echo json_encode(['message' => 'Invalid request method']);
        }
    }

    public function generateOTP() {
        return rand(1000, 9999);
    }

    private function storeTemporaryData($firstName, $lastName, $phoneNumber, $address, $email, $hashedPassword, $otp) {
        $query = "INSERT INTO temporary_otp (first_name, last_name, phone_no, address, email, password, otp) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->getConnection()->prepare($query);

        if ($stmt === false) {
            error_log('Failed to prepare statement: ' . $this->db->getConnection()->error);
            echo json_encode(['errors' => 'Failed to prepare statement']);
            return;
        }

        $result = $stmt->execute([$firstName, $lastName, $phoneNumber, $address, $email, $hashedPassword, $otp]);
        if (!$result) {
            error_log('Failed to execute statement: ' . $stmt->error);
            echo json_encode(['errors' => 'Failed to execute statement']);
        }
    }
}

$form = new RegisterForm();
$form->handleRequest();
?>
