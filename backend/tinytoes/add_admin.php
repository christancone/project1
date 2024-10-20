<?php

use mishaf\DBConnector;

require_once 'DbConnector.php';

class AdminAdder
{
    public function addAdmin($admin_name, $admin_username, $email, $admin_address, $child_ids, $attendant_ids)
    {
        $db = new DBConnector();
        $con = $db->getConnection();
        
        $stmt = $con->prepare("INSERT INTO admin (name, admin_username, email, admin_address, child_ids, attendant_ids) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $admin_name, $admin_username, $email, $admin_address, $child_ids, $attendant_ids);
        
        if ($stmt->execute()) {
            $admin_id = $stmt->insert_id;
            $response = [
                'status' => 'success',
                'message' => 'Admin added successfully',
                'admin' => [
                    'admin_id' => $admin_id,
                    'admin_name' => $admin_name,
                    'admin_username' => $admin_username,
                    'email' => $email,
                    'admin_address' => $admin_address,
                    'child_ids' => $child_ids,
                    'attendant_ids' => $attendant_ids
                ]
            ];
        } else {
            $response = ['status' => 'error', 'message' => 'Failed to add admin'];
        }
        
        $stmt->close();
        $db->closeConnection($con);
        
        return $response;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $adder = new AdminAdder();
    echo json_encode($adder->addAdmin($data['admin_name'], $data['admin_username'], $data['email'], $data['admin_address'], $data['child_ids'], $data['attendant_ids']));
}
?>