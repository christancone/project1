<?php

namespace Christan;
header("Access-Control-Allow-Origin: http://localhost:5173"); // Change this to your frontend URL
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include "Messages.php";

use Christan\Messages;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['loggedUserId'])) {
        $loggedUserId = $data['loggedUserId'];

        $messages = new Messages();
        $contacts = $messages->getRecentContacts($loggedUserId);

        echo $contacts;
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Missing required parameter: loggedUserId."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Invalid request method."]);
}
