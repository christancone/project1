<?php

use mishaf\DBConnector;

require_once 'DbConnector.php';

class AttendantFetcher {
    public function fetchAttendants() {
        $db = new DBConnector();
        $con = $db->getConnection();
        $sql = "SELECT * FROM attendant";
        $result = $con->query($sql);
        $attendants = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $attendants[] = $row;
            }
        }
        $db->closeConnection($con);
        return $attendants;
    }
}

$fetcher = new AttendantFetcher();
echo json_encode($fetcher->fetchAttendants());
?>