<?php

namespace mishaf;

include "../DBConnector.php";

class Admin
{

    private $db;

    public function __construct()
    {
        $this->db = new DBConnector();
    }

    public function fetchAllAdmins()
{
    $connection = $this->db->getConnection();
    $query = "SELECT u.id AS admin_id, u.reg_no, u.username AS admin_username, u.email, u.firstname AS admin_name, u.lastname, u.phone_no, u.address AS admin_address,
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

public function add_admin($adminData)
{
    $connection = $this->db->getConnection();
    $query = "INSERT INTO users (username, role, password, email, address, firstname, lastname, phone_no, reg_no)
              VALUES (?, 'Admin', ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $connection->prepare($query);
    if (!$stmt) {
        echo json_encode([
            "error" => "Prepare failed: " . $connection->error
        ]);
        return;
    }
    $hashedPassword = password_hash($adminData['password'], PASSWORD_BCRYPT);
    $stmt->bind_param(
        "ssssssss",
        $adminData['admin_username'],
        $hashedPassword,
        $adminData['email'],
        $adminData['admin_address'],
        $adminData['admin_name'],
        $adminData['lastname'],
        $adminData['phone_no'],
        $adminData['reg_no']
    );
    if ($stmt->execute()) {
        $adminData['admin_id'] = $stmt->insert_id;
        echo json_encode([
            "status" => "success",
            "admin" => $adminData
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "error" => "Execute failed: " . $stmt->error
        ]);
    }
    $stmt->close();
    $connection->close();
}



public function update_admin($adminData)
{
    $connection = $this->db->getConnection();
    $query = "UPDATE users SET username = ?, email = ?, address = ?, firstname = ?, lastname = ?, phone_no = ?, reg_no = ? WHERE id = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param(
        "sssssssi",
        $adminData['admin_username'],
        $adminData['email'],
        $adminData['admin_address'],
        $adminData['admin_name'],
        $adminData['lastname'],
        $adminData['phone_no'],
        $adminData['reg_no'],
        $adminData['admin_id']
    );
    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $stmt->error]);
    }
    $stmt->close();
    $connection->close();
}

    public function delete_admin($adminId)
    {
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
