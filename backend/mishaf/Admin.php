<?php

namespace mishaf;

include "DBConnector.php";

use DBConnector;

class Admin {

    private $db;

    public function __construct() {
        $this->db = new DBConnector();
    }

    public function fetchAllAdmins() {
        $connection = $this->db->getConnection();
        $query = "SELECT u.id AS admin_id, u.username AS admin_username, u.email, u.firstname AS admin_name, u.lastname, u.phone_no, u.address AS admin_address,
                  (SELECT COUNT(*) FROM users WHERE role = 'Attendant' AND admin_username = u.username) AS total_attendants,
                  (SELECT COUNT(*) FROM users WHERE role = 'Parent' AND admin_username = u.username) AS total_parents,
                  (SELECT COUNT(c.id) FROM children c JOIN users p ON c.parent_id = p.id WHERE p.admin_username = u.username) AS total_children
                  FROM users u WHERE u.role = 'Admin'";
        $admins = array();
        if ($result = $connection->query($query)) {
            while ($row = $result->fetch_assoc()) {
                $admins[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($admins);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $connection->error]);
        }
        $connection->close();
    }

    public function add_admin($adminData) {
    // Get the database connection
    $connection = $this->db->getConnection();

    // Prepare the SQL query
    $query = "INSERT INTO users (username, role, password, email, address, firstname, lastname)
              VALUES (?, 'Admin', ?, ?, ?, ?, ?)";

    // Prepare the statement
    $stmt = $connection->prepare($query);

    if (!$stmt) {
        echo json_encode([
            "error" => "Prepare failed: " . $connection->error
        ]);
        return;
    }

    // Hash the password and store it in a variable
    $hashedPassword = password_hash($adminData['password'], PASSWORD_BCRYPT);

    // Bind the parameters (password is hashed)
    $stmt->bind_param(
        "ssssss", 
        $adminData['admin_username'], 
        $hashedPassword,  // Using the hashed password variable
        $adminData['email'], 
        $adminData['admin_address'], 
        $adminData['admin_name'], 
        $adminData['lastname']
    );

    // Execute the statement and handle the result
    if ($stmt->execute()) {
        // Fetch the new admin's ID
        $adminData['admin_id'] = $stmt->insert_id;

        // Success: return a success message with the new admin data
        echo json_encode([
            "status" => "success",
            "admin" => $adminData
        ]);
    } else {
        // Failure: return an error message with HTTP 500 code
        http_response_code(500);
        echo json_encode([
            "error" => "Execute failed: " . $stmt->error
        ]);
    }

    // Close the statement and connection
    $stmt->close();
    $connection->close();
}


    public function update_admin($adminData) {
        $connection = $this->db->getConnection();
        $query = "UPDATE users SET username = ?, email = ?, address = ?, firstname = ?, lastname = ? WHERE id = ?";
        $stmt = $connection->prepare($query);
        $stmt->bind_param("sssssi", $adminData['admin_username'], $adminData['email'], $adminData['admin_address'], $adminData['admin_name'], $adminData['lastname'], $adminData['admin_id']);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $stmt->error]);
        }
        $stmt->close();
        $connection->close();
    }

    public function delete_admin($adminId) {
        $connection = $this->db->getConnection();
        $query = "DELETE FROM users WHERE id = ?";
        $stmt = $connection->prepare($query);
        $stmt->bind_param("i", $adminId);
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