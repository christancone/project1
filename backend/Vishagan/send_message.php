<?php

use mishaf\DBConnector;

require 'DbConnector.php'; // Ensure this file exists and includes the database connection setup

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sender_id = $_POST['sender_id'];
    $receiver_id = $_POST['receiver_id'];
    $message = $_POST['message'];

    if (!empty($sender_id) && !empty($receiver_id) && !empty($message)) {
        $db = new DbConnector(); // Assuming this creates a database connection
        $conn = $db->getConnection();

        $stmt = $conn->prepare("INSERT INTO message (sender_id, receiver_id, message, timestamp) VALUES (?, ?, ?, NOW())");
        $stmt->bind_param("iis", $sender_id, $receiver_id, $message);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to send message.']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
