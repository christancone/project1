<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Ensure it's your frontend's URL
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_start();

// Check if the session is active
if (!isset($_SESSION['id'])) {
    $response = array(
        'status' => 'error',
        'message' => 'Session expired or not set.',
    );
} else {
    // Assuming the session data includes user role and other details
    $response = array(
        'status' => 'success',
        'data' => array(
            'id' => $_SESSION['id'],
            'role' => $_SESSION['role'] ?? null,
            'email' => $_SESSION['email'] ?? null,
        ),
    );
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
