<?php
require_once 'DbConnector.php';

class ParentDeleter {
    public function deleteParent($id) {
        $db = new DBConnector();
        $con = $db->getConnection();

        $sql = "DELETE FROM users WHERE id=?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => $stmt->error]);
        }

        $stmt->close();
        $db->closeConnection($con);
    }
}

$data = json_decode(file_get_contents("php://input"), true);
$deleter = new ParentDeleter();
$deleter->deleteParent($data['parent_id']);
?>