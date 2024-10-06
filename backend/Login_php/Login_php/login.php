<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require 'dbtest.php';

// Set session cookie parameters and start the session
session_set_cookie_params(0, "/");
session_start();

class Login {
    private $db;

    public function __construct() {
        $this->db = new Database('tinytoes');
    }

    public function loginRequest() {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $input = json_decode(file_get_contents('php://input'), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                error_log('Invalid JSON input');
                echo json_encode(['errors' => 'Invalid JSON input']);
                return;
            }

            $email = isset($input['email']) ? filter_var($input['email'], FILTER_VALIDATE_EMAIL) : '';
            $password = isset($input['password']) ? $input['password'] : '';

            $errors = [];

            if (empty($email) || !$email) {
                $errors['email'] = 'A valid email is required.';
            }

            if (empty($password)) {
                $errors['password'] = 'Password is required.';
            }

            if (!empty($errors)) {
                echo json_encode(['errors' => $errors]);
                return;
            }

            // Validate user credentials
            $this->validateUser($email, $password);
        } else {
            echo json_encode(['errors' => 'Invalid request method']);
        }
    }

    private function validateUser($email, $password) {
        try {
            // Modified query to fetch role and email along with password
            $query = "SELECT email, password, role FROM users WHERE email = ?";
            $stmt = $this->db->getConnection()->prepare($query);

            if (!$stmt) {
                throw new Exception("Prepare failed: " . $this->db->getConnection()->error);
            }

            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result()->fetch_assoc();

            if ($result && password_verify($password, $result['password'])) {
                // Successful login: store email and role in the session
                $_SESSION['email'] = $result['email'];
                $_SESSION['role'] = $result['role'];
                error_log($_SESSION['role']);

                // Return the login success response with email and role
                echo json_encode([
                    'message' => 'Login successful',
                    'email' => $result['email'],
                    'role' => $result['role']
                ]);
            } else {
                echo json_encode(['errors' => 'Invalid email or password']);
            }

            $stmt->close();
        } catch (Exception $e) {
            error_log('Database error: ' . $e->getMessage());
            echo json_encode(['errors' => 'Server error: ' . $e->getMessage()]);
        }
    }
}

$login = new Login();
$login->loginRequest();

?>
