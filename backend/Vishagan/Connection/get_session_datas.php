<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_start();

if (!isset($_SESSION['id'])) {
    $response = array(
        'status' => 'error',
        'message' => 'Session expired or not set.',
    );
} else {
    $response = array(
        'status' => 'success',
        'data' => array(
            'id' => $_SESSION['id'],
            'username' => $_SESSION['username'],
            'role' => $_SESSION['role'],
            'email' => $_SESSION['email'],
        ),
    );
}

header('Content-Type: application/json');
echo json_encode($response);
?>
