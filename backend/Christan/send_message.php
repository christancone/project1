<?php
namespace Christan;

include "Messages.php";
use Christan\Messages;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['sender_id']) && isset($data['receiver_id']) && isset($data['message'])) {
        $sender_id = $data['sender_id'];
        $receiver_id = $data['receiver_id'];
        $message = $data['message'];

        $messages = new Messages();
        $success = $messages->sendMessage($sender_id, $receiver_id, $message);

        if ($success) {
            echo json_encode(["status" => "success", "message" => "Message sent successfully."]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to send message."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required fields: sender_id, receiver_id, or message."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
