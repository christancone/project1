<?php
error_reporting(E_ALL);
ini_set('display_errors', 1); // Display errors for debugging

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once 'login.php';
require_once 'dbtest.php';

class OTPVerification
{
    private $db;

    public function __construct()
    {
        $this->db = new Database('tint_toy'); 
    }

    public function verifyOTP()
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $input = json_decode(file_get_contents('php://input'), true);

            if (isset($input['enteredOtp']) && !empty($input['enteredOtp']) && isset($input['email'])) {
                $otp_received = (int)$input['enteredOtp'];
                $email = $input['email'];

                try {
                    $connection = $this->db->getConnection();
                    $stmt = $connection->prepare("SELECT otp FROM otp_data WHERE email = ?");

                    if ($stmt === false) {
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Failed to prepare SQL statement: ' . $connection->error
                        ]);
                        return;
                    }

                    $stmt->bind_param("s", $email);

                    if (!$stmt->execute()) {
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Failed to execute SQL statement: ' . $stmt->error
                        ]);
                        return;
                    }

                    $stmt->store_result();
                    $stmt->bind_result($otp);

                    if ($stmt->num_rows > 0) {
                        $stmt->fetch();
                        $stmt->close();

                        if ($otp_received === (int)$otp) {

                            echo json_encode([
                                'status' => 'success',
                                'message' => 'OTP entered correctly.'
                            ]);
                        } else {
                            echo json_encode([
                                'status' => 'error',
                                'message' => 'Incorrect OTP entered.',
                                'email' => $email,
                                'otp fetch'=> (int)$otp
                            ]);
                        }
                    } else {
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'No data found for the given email and OTP.'
                        ]);
                    }
                } catch (Exception $e) {
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'An error occurred while processing the OTP.',
                        'error' => $e->getMessage()
                    ]);
                }
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'OTP not received or is empty.'
                ]);
            }
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Invalid request method. Only POST is allowed.'
            ]);
        }
    }
}

// Create an instance of OTPVerification and verify the OTP
$otpVerification = new OTPVerification();
$otpVerification->verifyOTP();
?>
