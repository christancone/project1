<?php

use mishaf\DBConnector;

header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
// Allow specific methods (e.g., GET, POST)
header('Access-Control-Allow-Methods: GET, POST');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');

require_once 'DbConnector.php';

class MonthDataFetcher
{
    private $dbConnector;

    public function __construct()
    {
        $this->dbConnector = new DBConnector();
    }

    public function getMonthlyData()
    {
        // Get the database connection
        $con = $this->dbConnector->getConnection();

        // Prepare the SQL query to fetch counts grouped by month
        $sql = "
            SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS count
            FROM children
            GROUP BY month
            ORDER BY month
        ";

        // Execute the query
        $result = $con->query($sql);

        // Initialize an array to hold the results
        $data = [];

        // Fetch the results
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                // Format the month to full month names
                $monthNumber = intval(date('m', strtotime($row['month'] . '-01')));
                $monthName = date('F', mktime(0, 0, 0, $monthNumber, 10));

                $data[] = [
                    'month' => $monthName,
                    'value' => $row['count']
                ];
            }
        }

        // Close the database connection
        $this->dbConnector->closeConnection($con);

        // Return the JSON-encoded results
        echo json_encode($data);
    }
}

// Instantiate the class and fetch the data
$fetcher = new MonthDataFetcher();
$fetcher->getMonthlyData();
?>
