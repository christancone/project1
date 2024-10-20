<?php

use mishaf\DBConnector;

require_once 'DbConnector.php';

class Child {
    private $firstname;
    private $lastname;
    private $dob;
    private $parent_id;
    private $attendant_id;
    private $medical_info;

    public function __construct($data) {
        $this->firstname = $data['firstname'];
        $this->lastname = $data['lastname'];
        $this->dob = $data['dob'];
        $this->parent_id = $data['parent_id'];
        $this->attendant_id = $data['attendant_id'];
        $this->medical_info = $data['medical_info'];
    }

    public function save() {
        $db = new DBConnector();
        $con = $db->getConnection();
        $sql = "INSERT INTO children (firstname, lastname, dob, parent_id, attendant_id, medical_info) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("sssiss", $this->firstname, $this->lastname, $this->dob, $this->parent_id, $this->attendant_id, $this->medical_info);
        $response = [];
        if ($stmt->execute()) {
            $response['status'] = 'success';
            $response['id'] = $con->insert_id;
        } else {
            $response['status'] = 'error';
            $response['message'] = $stmt->error;
        }
        $stmt->close();
        $db->closeConnection($con);
        return $response;
    }
}

$data = json_decode(file_get_contents('php://input'), true);
$child = new Child($data);
$response = $child->save(); // Corrected method call
echo json_encode($response);
?>