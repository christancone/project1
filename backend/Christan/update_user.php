<?php
header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
// Allow specific methods (e.g., GET, POST)
header('Access-Control-Allow-Methods: POST');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');

// Include the DBConnector class
require_once 'DBConnector.php';

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;
$firstname = $data['firstname'] ?? null;
$lastname = $data['lastname'] ?? null;
$email = $data['email'] ?? null;
$phone_no = $data['phone_no'] ?? null;
$username = $data['username'] ?? null;

if (!$id || !$firstname || !$lastname || !$email || !$phone_no || !$username) {
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

// Create an instance of DBConnector
$db = new DBConnector();
$conn = $db->getConnection();

// Prepare and execute update query
$sql = "UPDATE users SET firstname = ?, lastname = ?, email = ?, phone_no = ?, username = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $firstname, $lastname, $email, $phone_no, $username, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

// Close the database connection
$db->closeConnection($conn);
?>
