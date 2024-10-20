<?php

use mishaf\DBConnector;

require_once 'DbConnector.php';

class AdminUpdater
{
    public function updateAdmin($admin_id, $admin_name, $admin_username, $admin_address, $child_ids, $attendant_ids)
    {
        $db = new DBConnector();
        $con = $db->getConnection();

        // Update Admin
        $stmt = $con->prepare("UPDATE admin SET admin_username=?, admin_address=?, name=? WHERE admin_id=?");
        $stmt->bind_param("sssi", $admin_username, $admin_address, $admin_name, $admin_id);
        $stmt->execute();
        $stmt->close();

        // Assuming child_ids and attendant_ids are comma-separated values
        $child_ids_array = explode(',', $child_ids);
        $attendant_ids_array = explode(',', $attendant_ids);

        // Update Children
        foreach ($child_ids_array as $child_id) {
            $stmt = $con->prepare("UPDATE children SET id=? WHERE id=?");
            $stmt->bind_param("i", $child_id, $child_id);
            $stmt->execute();
            $stmt->close();
        }

        // Update Attendants
        foreach ($attendant_ids_array as $attendant_id) {
            $stmt = $con->prepare("UPDATE attendants SET attendant_id=? WHERE attendant_id=?");
            $stmt->bind_param("i", $attendant_id, $attendant_id);
            $stmt->execute();
            $stmt->close();
        }

        $db->closeConnection($con);

        return ['status' => 'success', 'message' => 'Admin and related records updated successfully'];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $updater = new AdminUpdater();
    echo json_encode($updater->updateAdmin(
        $data['admin_id'],
        $data['admin_name'],
        $data['admin_username'],
        $data['admin_address'],
        $data['child_ids'],
        $data['attendant_ids']
    ));
}
?>