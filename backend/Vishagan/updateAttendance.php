<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include 'DBConnector.php';

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate inputs
$child_id = $data['id'] ?? null; // Update to match the key used in React
$check_in_time = $data['check_in_time'] ?? null;
$check_out_time = $data['check_out_time'] ?? null;

if (!$child_id || !$check_in_time) {
    echo json_encode(['status' => 'error', 'message' => 'Child ID and check-in time are required.']);
    exit;
}

try {
    $db = (new DBConnector())->getConnection();

    // Check if the child attendance already exists for today
    $query = "SELECT id FROM attendance WHERE child_id = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param('i', $child_id);
    $stmt->execute();
    $result = $stmt->get_result();


        // Update existing record
        $query = "UPDATE attendance SET check_in_time = ?, check_out_time = ? WHERE child_id = ?";
        $stmt = $db->prepare($query);
        $stmt->bind_param('ssi', $check_in_time, $check_out_time, $child_id);


    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Attendance saved successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error executing the query.']);
    }

    $stmt->close(); // Close the statement
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error saving attendance: ' . $e->getMessage()]);
}
?>
