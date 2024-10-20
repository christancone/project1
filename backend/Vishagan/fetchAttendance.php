<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Access-Control-Allow-Credentials: true");

include 'DBConnector.php';

class AttendanceFetcher {
    private $db;

    public function __construct() {
        $this->db = (new DBConnector())->getConnection();
    }

    public function fetchAttendance() {
        $query = "
            SELECT 
                a.child_id,
                c.firstname AS child_name,
                CONCAT(p.firstname, ' ', p.lastname) AS parent_name,
                a.check_in_time,
                a.check_out_time
            FROM attendance a
            JOIN children c ON a.child_id = c.id
            JOIN users p ON c.parent_id = p.id
        ";

        $result = $this->db->query($query);
        $attendanceData = [];

        while ($row = $result->fetch_assoc()) {
            $attendanceData[] = $row;
        }

        return $attendanceData;
    }
}

$fetcher = new AttendanceFetcher();
echo json_encode($fetcher->fetchAttendance());
