<?php

// Set the required headers
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); // Allow credentials

include 'Users.php'; // Include the Users class
 

// Check if the request method is OPTIONS (preflight request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Retrieve the user ID from the query parameter
$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$id) {
    // If no ID is provided, respond with a 400 Bad Request
    http_response_code(400);
    echo json_encode(['error' => 'No ID provided']);
    exit();
}

// Create an instance of the Users class
$users = new Users();

// Call the getUserById function to retrieve the user details
$users->getUserById(3);
