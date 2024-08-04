<?php
require_once 'DbConnector.php';

class ParentUpdater {
    public function updateParent($data) {
        $db = new DBConnector();
        $con = $db->getConnection();

        $sql = "UPDATE users SET firstname=?, lastname=?, email=?, address=?, occupation=? WHERE id=?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("sssssi", $data['first_name'], $data['last_name'], $data['email'], $data['address'], $data['occupation'], $data['parent_id']);

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
$updater = new ParentUpdater();
$updater->updateParent($data);
?>