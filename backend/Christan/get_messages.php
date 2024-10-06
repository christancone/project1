<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Allow all origins, change to specific domain if needed
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'Messages.php'; // Include the Messages class
use Christan\Messages;

$data = json_decode(file_get_contents("php://input"), true);

// Extract sender_id and receiver_id from the request
$senderId = $data['sender_id'] ?? null;
$receiverId = $data['receiver_id'] ?? null;

// Instantiate the Messages class
$messagesModel = new Messages();

// Fetch messages using the fetchMessages method
$response = $messagesModel->fetchMessages($senderId, $receiverId);

// Output the response
echo $response;
?>
