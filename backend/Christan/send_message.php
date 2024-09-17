<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'DBConnector.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$connection = (new DBConnector())->getConnection();

$sender_id = $_POST['sender_id'] ?? null;
$receiver_id = $_POST['receiver_id'] ?? null;
$message = $_POST['message'] ?? null;

if (!$sender_id || !$receiver_id || !$message) {
    http_response_code(400);
    echo json_encode(["error" => "Missing sender_id, receiver_id, or message"]);
    exit();
}

$query = "INSERT INTO message (sender_id, receiver_id, message) VALUES (?, ?, ?)";
$stmt = $connection->prepare($query);

if ($stmt) {
    $stmt->bind_param("iis", $sender_id, $receiver_id, $message);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message_id" => $stmt->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save message"]);
    }

    $stmt->close();
} else {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $connection->error]);
}

$connection->close();
?>
