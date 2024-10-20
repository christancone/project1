<?php
// Set CORS headers

use mishaf\DBConnector;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'DbConnector.php';

class AttendanceUpdater {
    private $db;

    public function __construct() {
        $dbConnector = new DBConnector();
        $this->db = $dbConnector->getConnection();
    }

    public function updateAttendance($id, $status) {
        $currentTime = date('H:i:s');
        $query = "UPDATE attendance SET status = ?, check_in_time = ? WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssi', $status, $currentTime, $id);
        $result = $stmt->execute();
        return $result;
    }

    public function closeConnection() {
        $this->db->close();
    }
}

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$status = $data['status'];

$attendanceUpdater = new AttendanceUpdater();
$success = $attendanceUpdater->updateAttendance($id, $status);
$attendanceUpdater->closeConnection();

echo json_encode(['success' => $success]);
?>
