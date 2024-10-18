<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true");

// Include the database connection file
include 'DBConnector.php';

// Start session to access session variables
session_start();
$adminUsername = $_SESSION["username"] ?? null; // Get the admin's username from session

if (!$adminUsername) {
    http_response_code(403);
    echo json_encode(["error" => "Admin not logged in."]);
    exit;
}

$connection = (new DBConnector())->getConnection();

// Use prepared statements to prevent SQL injection
$query = "SELECT id, username FROM users WHERE (role = 'Parent' OR role = 'Attendant') AND admin_username = ?";
$stmt = $connection->prepare($query);
$stmt->bind_param('s', $adminUsername); // Bind the admin's username
$stmt->execute();
$result = $stmt->get_result();

$users = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode($users);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $connection->error]);
}

$stmt->close(); // Close the statement
$connection->close(); // Close the database connection

