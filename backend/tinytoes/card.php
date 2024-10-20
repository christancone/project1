<?php

use mishaf\DBConnector;

require_once 'DbConnector.php';

class UserRoleCounter
{
    public function fetchCounts()
    {
        $db = new DBConnector();
        $con = $db->getConnection();

        $sql = "
        SELECT 
            role, 
            COUNT(*) as count 
        FROM 
            users 
        WHERE 
            role IN ('Admin', 'Parent', 'Attendant') 
        GROUP BY 
            role
        ";

        $result = $con->query($sql);
        $counts = [
            'Admin' => 0,
            'Parent' => 0,
            'Attendant' => 0
        ];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $counts[$row['role']] = $row['count'];
            }
        }

        $db->closeConnection($con);
        return $counts;
    }
}

$counter = new UserRoleCounter();
echo json_encode($counter->fetchCounts());

?>