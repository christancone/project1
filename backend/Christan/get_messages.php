<?php
namespace Christan;
header("Access-Control-Allow-Origin: http://localhost:5173"); // Change this to your frontend URL
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); // Allow credentials

include "Messages.php";
use Christan\Messages;

header("Content-Type: application/json");
session_start(); // Start the session

$messages = new Messages();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true); // Get raw input

    // Ensure the parameters are set
    if (isset($data['sender_id']) && isset($data['receiver_id'])) {
        $senderId = $data['sender_id'];
        $receiverId = $data['receiver_id'];

        $x = new Messages();
        $messages = $x -> fetchMessages($senderId, $receiverId); // Call your function
        echo $messages; // Return messages as JSON
    } else {
        http_response_code(400); // Bad request
        echo json_encode(['error' => 'Missing parameters']);
    }
}

