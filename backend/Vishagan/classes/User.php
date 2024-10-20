<?php

use mishaf\DBConnector;

include 'DBConnector.php';

class User {
    private $db;

    public function __construct() {
        $dbConnector = new DBConnector();
        $this->db = $dbConnector->getConnection();
    }

    // Fetch children data for the logged-in admin
    public function getChildren($admin_username) {
        $query = "
            SELECT c.id as child_id, CONCAT(c.firstname, ' ', c.lastname) as child_name, 
                   CONCAT(u.firstname, ' ', u.lastname) as parent_name, 
                   u.address, u.phone_no, u.id as parent_id
            FROM children c
            INNER JOIN users u ON c.parent_id = u.id
            WHERE u.admin_username = ?
        ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $admin_username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result) {
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            return null;
        }
    }

    // Delete child data
    public function deleteChild($childId) {
        $query = "DELETE FROM children WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $childId);
        return $stmt->execute();
    }

    // Update child and parent data
    public function updateChild($data) {
        $this->db->begin_transaction();
        try {
            // Update child data
            $queryChild = "
                UPDATE children
                SET firstname = ?, lastname = ?
                WHERE id = ?
            ";
            $stmtChild = $this->db->prepare($queryChild);
            $stmtChild->bind_param('ssi', $data['firstname'], $data['lastname'], $data['child_id']);
            $stmtChild->execute();

            // Update parent data
            $queryParent = "
                UPDATE users
                SET address = ?, phone_no = ?
                WHERE id = (
                    SELECT parent_id FROM children WHERE id = ?
                )
            ";
            $stmtParent = $this->db->prepare($queryParent);
            $stmtParent->bind_param('ssi', $data['address'], $data['phone_no'], $data['child_id']);
            $stmtParent->execute();

            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollback();
            return false;
        }
    }
}
?>
