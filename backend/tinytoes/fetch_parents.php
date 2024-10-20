<?php

use mishaf\DBConnector;

require_once 'DbConnector.php';

class ParentFetcher {
    public function fetchParents() {
        $db = new DBConnector();
        $con = $db->getConnection();

        $sql = "SELECT u.id as parent_id, CONCAT(u.firstname, ' ', u.lastname) AS name, u.email, u.address, u.phone_no, GROUP_CONCAT(c.id) as children_ids
                FROM users u
                LEFT JOIN children c ON u.id = c.parent_id
                WHERE u.role = 'Parent'
                GROUP BY u.id";

        $result = $con->query($sql);
        $parents = [];

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $parents[] = $row;
            }
        }

        $db->closeConnection($con);
        return $parents;
    }
}

$fetcher = new ParentFetcher();
echo json_encode($fetcher->fetchParents());
?>