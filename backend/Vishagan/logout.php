<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Specify your frontend origin
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow the POST method and OPTIONS preflight
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
header("Access-Control-Allow-Credentials: true"); // Allow credentials (cookies, authorization headers)

include 'Users.php'; // Include your Users class file

// Check if the request method is OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Respond to preflight request with 200 OK
    http_response_code(200);
    exit; // End the script for preflight requests
}

// Create an instance of the Users class
$user = new Users(); // No namespace needed

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Call the logout method and echo the result
    header('Content-Type: application/json');
    echo $user->logout();
} else {
    // If the request is not POST, return an error response
    http_response_code(405); // Method Not Allowed
    echo json_encode(['message' => 'Method Not Allowed']);
}
?>
