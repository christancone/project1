<?php
require_once 'DBConnector.php';

header('Content-Type: application/json');
// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
// Allow specific methods (e.g., GET, POST)
header('Access-Control-Allow-Methods: GET, POST');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Debug: Check received data
    error_log('Received data: ' . print_r($data, true));

    // Extract the data from the request
    $fromTime = $data['fromTime'];
    $toTime = $data['toTime'];
    $notes = $data['notes'];
    $children = $data['children'];

    // Initialize DB connection
    $db = new DBConnector();
    $conn = $db->getConnection();

    // Prepare the SQL statement for inserting nap records
    $stmt = $conn->prepare("INSERT INTO nap (childid, from_time, to_time, notes) VALUES (?, ?, ?, ?)");

    if ($stmt === false) {
        error_log('Failed to prepare statement: ' . $conn->error);
        echo json_encode(['status' => 'error', 'message' => 'Failed to prepare statement']);
        exit;
    }

    // Convert the time to the desired format
    $fromTimeConverted = (new DateTime($fromTime))->format('Y-m-d H:i:s');
    $toTimeConverted = (new DateTime($toTime))->format('Y-m-d H:i:s');

    // Debug: Check converted times
    error_log('Converted fromTime: ' . $fromTimeConverted);
    error_log('Converted toTime: ' . $toTimeConverted);

    // Bind parameters and execute the statement for each selected child
    $stmt->bind_param('isss', $childID, $fromTimeConverted, $toTimeConverted, $notes);

    foreach ($children as $childID) {
        if (!$stmt->execute()) {
            error_log('Failed to execute statement: ' . $stmt->error);
        } else {
            error_log('Record inserted for childID: ' . $childID);
        }
    }

    $stmt->close();
    $conn->close();

    echo json_encode(['status' => 'success', 'message' => 'Nap records added successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
