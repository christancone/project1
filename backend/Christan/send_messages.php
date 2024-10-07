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
    $senderId = $_SESSION['id']; // Assuming the user's ID is stored in the session
    $receiverId = $_POST['receiver_id'] ?? null;
    $message = $_POST['message'] ?? null;

    // Check if senderId, receiverId, and message are valid
    if (!$senderId || !$receiverId || !$message) {
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
        exit;
    }

    // Call the sendMessage method and return its response
    $result = $messages->sendMessage($senderId, $receiverId, $message);
    echo $result;
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}
