<?php

require_once 'DbConnector.php';

class AdminDeleter
{
    public function deleteAdmin($admin_id)
    {
        $db = new DBConnector();
        $con = $db->getConnection();

        $stmt = $con->prepare("DELETE FROM admins WHERE admin_id = ?");
        $stmt->bind_param("i", $admin_id);

        if ($stmt->execute()) {
            $response = ['status' => 'success', 'message' => 'Admin deleted successfully'];
        } else {
            $response = ['status' => 'error', 'message' => 'Failed to delete admin'];
        }

        $stmt->close();
        $db->closeConnection($con);

        return $response;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $deleter = new AdminDeleter();
    echo json_encode($deleter->deleteAdmin($data['admin_id']));
}
?>