<?php
namespace Christan;

include "DBConnector.php";
use DBConnector;

class Messages
{
    private $db;

    public function __construct()
    {
        $this->db = new DBConnector();
    }

    public function fetchMessages($senderId, $receiverId)
    {
        // Validate inputs
        if (!$senderId || !$receiverId) {
            http_response_code(400);
            return json_encode(['error' => 'Invalid sender_id or receiver_id']);
        }

        // Establish a database connection
        $connection = $this->db->getConnection();

        $query = "SELECT sender_id, receiver_id, message, timestamp FROM message
                  WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)";
        $stmt = $connection->prepare($query);

        if ($stmt) {
            // Bind parameters
            $stmt->bind_param("iiii", $senderId, $receiverId, $receiverId, $senderId);
            $stmt->execute();
            $result = $stmt->get_result();

            $messages = [];
            while ($row = $result->fetch_assoc()) {
                $messages[] = $row;
            }

            $stmt->close();
            return json_encode($messages);
        } else {
            http_response_code(500);
            return json_encode(["error" => "Database error: " . $connection->error]);
        }

        // Close the database connection
        $this->db->closeConnection($connection);
    }

    public function sendMessage($sender_id, $receiver_id, $message)
    {
        if (!$sender_id || !$receiver_id || !$message) {
            http_response_code(400);
            echo json_encode(["error" => "Missing sender_id, receiver_id, or message"]);
            return;
        }

        // Establish a database connection
        $connection = $this->db->getConnection();

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

        // Close the database connection
        $this->db->closeConnection($connection);
    }
}
