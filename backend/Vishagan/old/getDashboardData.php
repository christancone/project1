<?php

use mishaf\DBConnector;

header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
// Allow specific methods (e.g., GET, POST)
header('Access-Control-Allow-Methods: GET, POST');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');

// Include the DbConnector class
require_once 'DbConnector.php';

// Dashboard data class
class DashboardData {
    private $con;

    public function __construct() {
        $dbConnector = new DBConnector();
        $this->con = $dbConnector->getConnection();
    }

    public function getKidsCount() {
        $query = "SELECT COUNT(*) AS count FROM children";
        $result = $this->con->query($query);

        if ($result === false) {
            return 'Error: ' . $this->con->error;
        }

        $row = $result->fetch_assoc();
        return $row['count'];
    }

    public function getSickKidsCount() {
        $query = "SELECT COUNT(*) AS count 
                  FROM children 
                  WHERE medical_info IS NOT NULL 
                    AND medical_info != '' 
                    AND LOWER(medical_info) != 'none'";
        $result = $this->con->query($query);

        if ($result === false) {
            return 'Error: ' . $this->con->error;
        }

        $row = $result->fetch_assoc();
        return $row['count'];
    }

    public function getAttendantsCount() {
        $query = "SELECT COUNT(*) AS count FROM attendants";
        $result = $this->con->query($query);

        if ($result === false) {
            return 'Error: ' . $this->con->error;
        }

        $row = $result->fetch_assoc();
        return $row['count'];
    }
}

$data = new DashboardData();
$response = array(
    'totalKids' => $data->getKidsCount(),
    'sickKids' => $data->getSickKidsCount(),
    'totalAttendants' => $data->getAttendantsCount()
);

echo json_encode($response);
?>
