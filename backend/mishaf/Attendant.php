<?php

namespace mishaf;

include "DBConnector.php";

use DBConnector;

class Attendant {

    private $db;

    public function __construct() {
        $this->db = new DBConnector();
    }

    public function fetchAllAttendants() {
        $connection = $this->db->getConnection();
        $query = "SELECT u.id AS attendant_id, u.username AS attendant_username, u.email, 
                  u.firstname, u.lastname, u.phone_no, u.address, 
                  (SELECT COUNT(c.id) FROM children c WHERE c.attendant_id = u.id) AS total_children
                  FROM users u WHERE u.role = 'Attendant'";
        
        $attendants = array();
        if ($result = $connection->query($query)) {
            while ($row = $result->fetch_assoc()) {
                $attendants[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($attendants);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $connection->error]);
        }
        $connection->close();
    }

    public function updateAttendant($attendantData) {
        $connection = $this->db->getConnection();
        $query = "UPDATE users SET username = ?, email = ?, phone_no = ?, firstname = ?, lastname = ? WHERE id = ?";
        $stmt = $connection->prepare($query);
        $stmt->bind_param("sssssi", $attendantData['attendant_username'], $attendantData['email'], 
            $attendantData['phone_no'], $attendantData['firstname'], $attendantData['lastname'], $attendantData['attendant_id']);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $stmt->error]);
        }
        $stmt->close();
        $connection->close();
    }

    public function deleteAttendant($attendantId) {
        $connection = $this->db->getConnection();
        $query = "DELETE FROM users WHERE id = ?";
        $stmt = $connection->prepare($query);
        $stmt->bind_param("i", $attendantId);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $stmt->error]);
        }
        $stmt->close();
        $connection->close();
    }
}
?>
