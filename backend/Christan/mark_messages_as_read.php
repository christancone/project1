<?php

namespace Christan;

// Add CORS headers for all responses
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true"); // Allow credentials

// Handle preflight requests (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Respond with 200 OK for the preflight
    exit; // Terminate the script after sending preflight response
}

include "Messages.php";
use Christan\Messages;

$messages = new Messages();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON payload
    $data = json_decode(file_get_contents('php://input'), true);

    // Retrieve sender and receiver IDs safely
    $senderId = $data['sender_id'] ?? null;
    $receiverId = $data['receiver_id'] ?? null;

    // Log the IDs for debugging
    error_log("Sender ID: " . ($senderId ?? "null"));
    error_log("Receiver ID: " . ($receiverId ?? "null"));

    // Check if both IDs are valid
    if ($senderId && $receiverId) {
        // Mark messages as read
        $messages->markAsRead($senderId, $receiverId);
        echo json_encode(["status" => "success", "message" => "Messages marked as read."]);
    } else {
        http_response_code(400); // Bad Request if IDs are missing
        echo json_encode(["error" => "Invalid sender_id or receiver_id."]);
    }
}


?>
