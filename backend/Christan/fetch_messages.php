<?php
header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
// Allow specific methods (e.g., GET, POST)
header('Access-Control-Allow-Methods: GET');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');

include 'DBConnector.php';  // Include your DBConnector class

// Create an instance of DBConnector
$dbConnector = new DBConnector();
$conn = $dbConnector->getConnection();

// Get sender and receiver IDs from query parameters
$sender_id = intval($_GET['sender_id']);
$receiver_id = intval($_GET['receiver_id']);

// Prepare and execute SQL statement
$sql = "SELECT * FROM Message WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp";
$stmt = $conn->prepare($sql);
$stmt->bind_param('iiii', $sender_id, $receiver_id, $receiver_id, $sender_id);
$stmt->execute();
$result = $stmt->get_result();

// Fetch all messages
$messages = [];
while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

// Return messages as JSON
echo json_encode($messages);

// Close the connection
$dbConnector->closeConnection($conn);
?>
