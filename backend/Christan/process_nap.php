<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'DBConnector.php'; // Include your DBConnector class file
require_once 'Children.php'; // Include your Children class file
use Christan\Children;

$childrenModel = new Children();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);

    $fromTime = isset($data['fromTime']) ? $data['fromTime'] : '';
    $toTime = isset($data['toTime']) ? $data['toTime'] : '';
    $notes = isset($data['notes']) ? $data['notes'] : '';
    $children = isset($data['children']) ? $data['children'] : [];

    // Validate input data
    if (empty($fromTime) || empty($toTime) || empty($notes) || empty($children)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input data. Ensure all fields are filled.']);
        exit();
    }

    // Try to insert nap record
    try {
        $response = $childrenModel->insertNapRecord($fromTime, $toTime, $notes, $children);
        echo json_encode($response);
    } catch (Exception $e) {
        // Log the error details for debugging
        error_log('Error in process_nap.php: ' . $e->getMessage());

        echo json_encode(['status' => 'error', 'message' => 'Exception occurred: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
