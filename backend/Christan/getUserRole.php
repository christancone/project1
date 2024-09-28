<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");



session_start();

// Check if the user role is set in the session
if (isset($_SESSION['user_role'])) {
    echo json_encode([
        'message' => 'User role fetched successfully',
        'role' => $_SESSION['user_role']
    ]);
} else {
    echo json_encode([
        'message' => 'No user role found',
        'role' => null
    ]);
}
?>
