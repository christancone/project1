<?php
// Set CORS headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'DbConnector.php';

class AttendantData {
    private $db;

    public function __construct() {
        $dbConnector = new DBConnector();
        $this->db = $dbConnector->getConnection();
    }

    public function getAttendants() {
        $query = "SELECT * FROM attendants";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        return $data;
    }

    public function closeConnection() {
        $this->db->close();
    }
}

$attendantData = new AttendantData();
$data = $attendantData->getAttendants();
$attendantData->closeConnection();

echo json_encode($data);
?>
