<?php
header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
// Allow specific methods (e.g., GET, POST)
header('Access-Control-Allow-Methods: POST');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');

include 'DBConnector.php';  // Include your DBConnector class

// Create an instance of DBConnector
$dbConnector = new DBConnector();
$conn = $dbConnector->getConnection();

// Get POST parameters
$sender_id = intval($_POST['sender_id']);
$receiver_id = intval($_POST['receiver_id']);
$message = $_POST['message'];

// Prepare and execute SQL statement
$sql = "INSERT INTO Message (sender_id, receiver_id, message) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('iis', $sender_id, $receiver_id, $message);

$response = [];
if ($stmt->execute()) {
    $response['status'] = 'success';
} else {
    $response['status'] = 'error';
}

// Return response as JSON
echo json_encode($response);

// Close the connection
$dbConnector->closeConnection($conn);
?>

