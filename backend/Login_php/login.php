<?php
error_reporting(E_ALL);
ini_set('display_errors', 1); // Display errors for debugging

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'mailotpsend.php'; // Ensure this file contains the sendEmail function
require 'dbtest.php'; // Ensure this file contains the Database class



class OTPHandler
{
    private $db;

    public function __construct()
    {
        $this->db = new Database('tint_toy');
    }

    public function generateOTP()
    {
        return rand(1000, 9999);
    }

    public function handleRequest()
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $input = json_decode(file_get_contents('php://input'), true);

            if (isset($input['email']) && !empty($input['email'])) {
                $email = $input['email'];

                if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    try {
                        $otp = $this->generateOTP();
                        
                        if (sendEmail($email, $otp)) {
                            $connection = $this->db->getConnection();
                            if ($connection) {
                                $stmt = $connection->prepare("INSERT INTO otp_data (email, otp) VALUES (?, ?)");
                                if ($stmt === false) {
                                    throw new Exception("Failed to prepare SQL statement: " . $connection->error);
                                }
                                $stmt->bind_param("si", $email, $otp);
                                if ($stmt->execute()) {
                                    $stmt->close(); 
                                    
                                    // Call getDataByPlaceId to fetch the data
                                
                                } else {
                                    throw new Exception("Failed to execute SQL statement: " . $stmt->error);
                                }
                            } else {
                                echo json_encode([
                                    'status' => 'error',
                                    'message' => 'Database connection failed.'
                                ]);
                            }
                        } else {
                            echo json_encode([
                                'status' => 'error',
                                'message' => 'Failed to send the email.'
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
                        'message' => 'Invalid email format.'
                    ]);
                }
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Email not received or is empty.'
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

// Create an instance of OTPHandler and handle the request
$otpHandler = new OTPHandler();
$otpHandler->handleRequest();
?>
