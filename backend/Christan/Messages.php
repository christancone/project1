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
        if (!$senderId || !$receiverId) {
            http_response_code(400);
            return json_encode(['error' => 'Invalid sender_id or receiver_id']);
        }

        $connection = $this->db->getConnection();

        // Prepare the SQL query
        $query = "SELECT sender_id, receiver_id, message, timestamp 
                  FROM message
                  WHERE (sender_id = ? AND receiver_id = ?) 
                  OR (sender_id = ? AND receiver_id = ?)
                  ORDER BY timestamp ASC";

        $stmt = $connection->prepare($query);

        if ($stmt) {
            // Bind parameters
            $stmt->bind_param("iiii", $senderId, $receiverId, $receiverId, $senderId);
            $stmt->execute();
            $result = $stmt->get_result();

            // Fetch messages
            $messages = [];
            while ($row = $result->fetch_assoc()) {
                $messages[] = $row;
            }

            $stmt->close();

            // Set the content type and return messages
            header('Content-Type: application/json'); // Set content type for JSON
            return json_encode($messages);
        } else {
            http_response_code(500);
            return json_encode(["error" => "Database error: " . $connection->error]);
        }

        // Close the connection (this will never be reached because of the earlier returns)
        $this->db->closeConnection($connection);
    }

    public function sendMessage($sender_id, $receiver_id, $message)
    {
        if (!$sender_id || !$receiver_id || !$message) {
            http_response_code(400);
            echo json_encode(["error" => "Missing sender_id, receiver_id, or message"]);
            return;
        }

        $connection = $this->db->getConnection();

        $query = "INSERT INTO message (sender_id, receiver_id, message) VALUES (?, ?, ?)";
        $stmt = $connection->prepare($query);

        if ($stmt) {
            $stmt->bind_param("iis", $sender_id, $receiver_id, $message);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                // Update or insert a record for unread messages in a separate table or add an 'unread' flag
                $this->markUnread($receiver_id, $sender_id);

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

        $this->db->closeConnection($connection);
    }

    public function markUnread($receiver_id, $sender_id)
    {
        // Create or update the 'unread_messages' table to track unread messages
        $connection = $this->db->getConnection();

        $query = "INSERT INTO unread_messages (receiver_id, sender_id, unread_count)
                  VALUES (?, ?, 1) 
                  ON DUPLICATE KEY UPDATE unread_count = unread_count + 1";
        $stmt = $connection->prepare($query);
        $stmt->bind_param("ii", $receiver_id, $sender_id);
        $stmt->execute();
        $stmt->close();

        $this->db->closeConnection($connection); // Close connection after operation
    }

    public function markAsRead($receiver_id, $sender_id)
    {
        // Remove or reset unread messages when messages are read
        $connection = $this->db->getConnection();

        $query = "DELETE FROM unread_messages WHERE receiver_id = ? AND sender_id = ?";
        if ($stmt = $connection->prepare($query)) {
            $stmt->bind_param("ii", $receiver_id, $sender_id);
            $stmt->execute();
            $stmt->close();
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $connection->error]);
        }

        $this->db->closeConnection($connection); // Close connection after operation
    }

    public function getUnreadMessageCounts()
    {
        // Start a session (if not already started)
        session_start();

        // Check if the user is logged in
        if (!isset($_SESSION['id'])) {
            echo json_encode(['error' => 'User not logged in']);
            return;
        }

        $loggedUserId = $_SESSION['id'];

        // Prepare the SQL statement
        $query = "
        SELECT u.id, u.username, COALESCE(um.unread_count, 0) AS unread_count, 
               um.last_activity
        FROM users u
        LEFT JOIN unread_messages um ON u.id = um.sender_id AND um.receiver_id = ?
        WHERE u.id != ?"; // Assuming you want to exclude the logged-in user

        $connection = $this->db->getConnection(); // Establish the connection
        if ($stmt = $connection->prepare($query)) {
            $stmt->bind_param("ii", $loggedUserId, $loggedUserId);
            $stmt->execute();
            $result = $stmt->get_result();

            $usersWithUnreadCounts = [];
            while ($row = $result->fetch_assoc()) {
                // Add 'last_activity' to the result if it exists
                $usersWithUnreadCounts[] = [
                    'id' => $row['id'],
                    'username' => $row['username'],
                    'unread_count' => $row['unread_count'],
                    'last_activity' => $row['last_activity'] ?? null // Use null if not available
                ];
            }

            // Return the result as JSON
            header('Content-Type: application/json'); // Set content type for JSON
            echo json_encode($usersWithUnreadCounts);
            $stmt->close();
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'SQL preparation failed']);
        }

        $this->db->closeConnection($connection); // Close connection after operation
    }

}
