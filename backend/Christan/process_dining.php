<?php
header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
// Allow specific methods (e.g., GET, POST)
header('Access-Control-Allow-Methods: GET, POST');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');

require_once 'DBConnector.php'; // Include your DBConnector class file

// Create an instance of DBConnector
$dbConnector = new DBConnector();
$con = $dbConnector->getConnection();

// Check if POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);

    $fromTime = isset($data['fromTime']) ? $data['fromTime'] : '';
    $toTime = isset($data['toTime']) ? $data['toTime'] : '';
    $notes = isset($data['notes']) ? $data['notes'] : '';
    $children = isset($data['children']) ? $data['children'] : [];

    // Validate input data
    if (empty($fromTime) || empty($toTime) || empty($notes) || empty($children)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input data']);
        $dbConnector->closeConnection($con);
        exit();
    }

    // Convert ISO 8601 time to MySQL TIME format (HH:MM:SS)
    $fromTime = date('H:i:s', strtotime($fromTime));
    $toTime = date('H:i:s', strtotime($toTime));

    // Prepare SQL statement to insert data into dining table
    $sql = "INSERT INTO dining (childID, food, totime, fromtime) VALUES (?, ?, ?, ?)";
    $stmt = $con->prepare($sql);

    // Loop through each child ID and insert a record
    foreach ($children as $childID) {
        // Bind parameters
        $stmt->bind_param('isss', $childID, $notes, $toTime, $fromTime);

        // Execute statement
        if (!$stmt->execute()) {
            echo json_encode(['status' => 'error', 'message' => 'Error inserting data: ' . $stmt->error]);
            $stmt->close();
            $dbConnector->closeConnection($con);
            exit();
        }
    }

    // Close the statement
    $stmt->close();

    echo json_encode(['status' => 'success', 'message' => 'Data successfully inserted into dining table']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
}

// Close the database connection
$dbConnector->closeConnection($con);
?>
