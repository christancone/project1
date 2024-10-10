<?php

namespace Christan;

include "Messages.php";

use Christan\Messages;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['sender_id']) && isset($data['receiver_id'])) {
        $sender_id = $data['sender_id'];
        $receiver_id = $data['receiver_id'];

        $messages = new Messages();
        $messages->markMessagesAsRead($sender_id, $receiver_id);

        echo json_encode(["status" => "success", "message" => "Messages marked as read."]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Missing required parameters sender_id or receiver_id."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Invalid request method."]);
}
