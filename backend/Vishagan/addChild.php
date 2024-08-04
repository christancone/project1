<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
include 'DbConnector.php';

class AddAttendant {
    private $conn;

    public function __construct() {
        $db = new DbConnector();
        $this->conn = $db->getConnection();
    }

    public function addAttendant($data) {
        $username = $data['attendant_username'];
        $firstname = $data['firstname'];
        $lastname = $data['lastname'];
        $gender = $data['gender'];
        $phonenumber = $data['phonenumber'];
        $birthday = $data['birthday'];
        $email = $data['email'];

        return $this->insertAttendant($username, $firstname, $lastname, $gender, $phonenumber, $birthday, $email);
    }

    private function insertAttendant($username, $firstname, $lastname, $gender, $phonenumber, $birthday, $email) {
        $sql = "INSERT INTO attendants (attendant_username, firstname, lastname, gender, phonenumber, birthday, email) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssssss", $username, $firstname, $lastname, $gender, $phonenumber, $birthday, $email);

        if ($stmt->execute()) {
            $stmt->close();
            return ["status" => "success", "message" => "Attendant added successfully"];
        } else {
            $stmt->close();
            return ["status" => "error", "message" => "Error adding attendant: " . $this->conn->error];
        }
    }
}

$data = json_decode(file_get_contents("php://input"), true);
$addAttendant = new AddAttendant();
$response = $addAttendant->addAttendant($data);
echo json_encode($response);
?>
