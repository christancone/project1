<?php

require_once '../DBConnector.php';

class Children {
    private $db;

    public function __construct() {
        $this->db = new DBConnector();
    }

    // Fetch all children from the database
    public function fetchChildren() {
        $con = $this->db->getConnection();

        $sql = "
        SELECT
            children.id,
            CONCAT(children.firstname, ' ', children.lastname) AS name,
            children.dob,
            children.medical_info,
            parent.id AS parent_id,
            CONCAT(parent.firstname, ' ', parent.lastname) AS parent_name,
            attendant.id AS attendant_id,
            CONCAT(attendant.firstname, ' ', attendant.lastname) AS attendant_name
        FROM children
        LEFT JOIN users AS parent ON children.parent_id = parent.id
        LEFT JOIN users AS attendant ON children.attendant_id = attendant.id
        ";

        $result = $con->query($sql);
        $children = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $children[] = $row;
            }
        }

        $this->db->closeConnection($con);

        return $children;
    }

    // Update child details
    public function updateChild($data) {
        $id = $data['id'];
        $name = $data['name'];
        $dob = $data['dob'];
        $parent_id = $data['parent_id'];
        $attendant_id = $data['attendant_id'];
        $medical_info = $data['medical_info'];

        list($firstname, $lastname) = explode(' ', $name, 2);
        if (!$lastname) {
            $lastname = ''; // Handle missing last name
        }

        $con = $this->db->getConnection();
        $sql = "UPDATE children SET firstname=?, lastname=?, dob=?, parent_id=?, attendant_id=?, medical_info=? WHERE id=?";
        $stmt = $con->prepare($sql);

        if ($stmt === false) {
            return [
                'status' => 'error',
                'message' => 'Failed to prepare statement: ' . $con->error
            ];
        }

        $stmt->bind_param("sssissi", $firstname, $lastname, $dob, $parent_id, $attendant_id, $medical_info, $id);

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

    // Delete a child from the database
    public function deleteChild($id) {
        $con = $this->db->getConnection();
        $sql = "DELETE FROM children WHERE id=?";
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
