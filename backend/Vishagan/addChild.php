<?php
header('Content-Type: application/json');
include 'DbConnector.php';

class AddChild {
    private $conn;

    public function __construct() {
        $db = new DbConnector();
        $this->conn = $db->getConnection();
    }

    public function addChild($data) {
        $parentUsername = $data['parent_username'];
        $attendantName = $data['attendant_name'];
        $childFirstname = $data['child_firstname'];
        $childLastname = $data['child_lastname'];
        $dob = $data['dob'];
        $medicalInfo = $data['medical_info'];

        $parentId = $this->validateParent($parentUsername);
        if (!$parentId) {
            return ["status" => "error", "message" => "Parent username not found or is not a Parent"];
        }

        $attendantId = $this->validateAttendant($attendantName);
        if (!$attendantId) {
            return ["status" => "error", "message" => "Attendant username not found"];
        }

        return $this->insertChild($childFirstname, $childLastname, $dob, $parentId, $attendantId, $medicalInfo);
    }

    private function validateParent($username) {
        $sql = "SELECT id FROM users WHERE username = ? AND role = 'Parent'";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $parent = $result->fetch_assoc();
        $stmt->close();

        return $parent ? $parent['id'] : false;
    }

    private function validateAttendant($username) {
        $sql = "SELECT attendant_id FROM attendants WHERE attendant_username = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $attendant = $result->fetch_assoc();
        $stmt->close();

        return $attendant ? $attendant['attendant_id'] : false;
    }

    private function insertChild($firstname, $lastname, $dob, $parentId, $attendantId, $medicalInfo) {
        $sql = "INSERT INTO children (firstname, lastname, dob, parent_id, attendant_id, medical_info) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssdds", $firstname, $lastname, $dob, $parentId, $attendantId, $medicalInfo);

        if ($stmt->execute()) {
            $stmt->close();
            return ["status" => "success", "message" => "Child details added successfully"];
        } else {
            $stmt->close();
            return ["status" => "error", "message" => "Error inserting child details: " . $this->conn->error];
        }
    }
}

$data = json_decode(file_get_contents("php://input"), true);
$addChild = new AddChild();
$response = $addChild->addChild($data);
echo json_encode($response);
?>