<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'DBConnector.php';

// Check if the ID parameter is provided
$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'No ID provided']);
    exit();
}

// Establish database connection
$connection = (new DBConnector())->getConnection();

// Prepare and execute the SQL query
$query = "SELECT firstname, lastname, email, phone_no, username FROM users WHERE id = ?";
$stmt = $connection->prepare($query);

if ($stmt) {
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Fetch the user data
        $user = $result->fetch_assoc();
        echo json_encode($user);
    } else {
        // User not found
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
    }

    $stmt->close();
} else {
    // Query preparation failed
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $connection->error]);
}

$connection->close();
?>
