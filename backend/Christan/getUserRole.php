<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Ensure it's your frontend's URL
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_set_cookie_params(0, "/");
session_start();
error_log("getUserRole.php session ID: ".session_id());

$response = []; // Initialize response variable

if (isset($_SESSION['role'])) {
    $response = [
        'message' => 'User role fetched successfully',
        'role' => $_SESSION['role']
    ];
    error_log("getUserRole.php session data: " . $_SESSION["role"]);
} else {
    $response = [
        'message' => 'No user role found',
        'role' => null
    ];
    error_log("Ran getUserRole.php without role.");
}

// Log the response for debugging
error_log("Response: " . json_encode($response));

// Set Content-Type for the response to be JSON
header('Content-Type: application/json');

// Only send the JSON response
echo json_encode($response);
