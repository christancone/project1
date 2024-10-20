<?php

use mishaf\DBConnector;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'DbConnector.php';

class ChildUpdater {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function updateChild($data) {
        $this->conn->begin_transaction();

        try {
            $queryChild = "
                UPDATE children
                SET firstname = ?, lastname = ?
                WHERE id = ?
            ";

            $stmtChild = $this->conn->prepare($queryChild);
            $stmtChild->bind_param('ssi', $data['firstname'], $data['lastname'], $data['child_id']);
            $stmtChild->execute();

            $queryParent = "
                UPDATE users
                SET address = ?, phone_no = ?
                WHERE id = ?
            ";

            $stmtParent = $this->conn->prepare($queryParent);
            $stmtParent->bind_param('ssi', $data['address'], $data['phone_no'], $data['parent_id']);
            $stmtParent->execute();

            $this->conn->commit();
            return ['status' => 'success', 'message' => 'Record updated successfully.'];
        } catch (Exception $e) {
            $this->conn->rollback();
            return ['status' => 'error', 'message' => 'Failed to update record.'];
        }
    }
}

$data = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data.']);
    exit;
}

$database = new DbConnector();
$conn = $database->getConnection();

$updater = new ChildUpdater($conn);
$response = $updater->updateChild($data);

$database->closeConnection($conn);

echo json_encode($response);
?>
