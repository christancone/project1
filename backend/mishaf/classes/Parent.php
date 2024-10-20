<?php

use mishaf\DBConnector;

require_once '../DBConnector.php';

class ParentClass {
    private $db;

    public function __construct() {
        $this->db = new DBConnector();
    }

    // Fetch all parents from the database
    public function fetchParents() {
        $con = $this->db->getConnection();

        $sql = "SELECT u.id as parent_id, u.username, u.firstname AS first_name, u.lastname AS last_name, 
                      CONCAT(u.firstname, ' ', u.lastname) AS name, u.email, u.address, u.phone_no, 
                      GROUP_CONCAT(c.id SEPARATOR ', ') as children_ids, 
                      GROUP_CONCAT(CONCAT(c.firstname, ' ', c.lastname) SEPARATOR ', ') as children_names
                FROM users u
                LEFT JOIN children c ON u.id = c.parent_id
                WHERE u.role = 'Parent'
                GROUP BY u.id";

        $result = $con->query($sql);
        $parents = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $parents[] = $row;
            }
        }

        $this->db->closeConnection($con);

        return $parents;
    }

    // Update parent details
    public function updateParent($data) {
        $parent_id = $data['parent_id'];
        $first_name = $data['first_name'];
        $last_name = $data['last_name'];
        $email = $data['email'];
        $address = $data['address'];

        // Database connection
        $con = $this->db->getConnection();

        // Prepare SQL query
        $sql = "UPDATE users SET firstname=?, lastname=?, email=?, address=? WHERE id=?";
        $stmt = $con->prepare($sql);

        if ($stmt === false) {
            return [
                'status' => 'error',
                'message' => 'Failed to prepare statement: ' . $con->error
            ];
        }

        // Bind parameters and execute statement
        $stmt->bind_param("ssssi", $first_name, $last_name, $email, $address, $parent_id);

        if ($stmt->execute()) {
            $response = ['status' => 'success'];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Error executing update: ' . $stmt->error
            ];
        }

        // Close statement and connection
        $stmt->close();
        $this->db->closeConnection($con);

        return $response;
    }

    // Delete parent
    public function deleteParent($id) {
        $con = $this->db->getConnection();
        $sql = "DELETE FROM users WHERE id=?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("i", $id);

        $response = [];
        if ($stmt->execute()) {
            $response['status'] = 'success';
        } else {
            $response['status'] = 'error';
            $response['message'] = $stmt->error;
        }

        $stmt->close();
        $this->db->closeConnection($con);

        return $response;
    }
}
