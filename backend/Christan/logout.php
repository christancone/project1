<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow your frontend origin
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow the POST method and OPTIONS preflight
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
header("Access-Control-Allow-Credentials: true"); // Allow credentials (cookies, authorization headers)

session_start();

// Log the logout action (optional)
error_log("User logged out: " . session_id());

// Unset all session variables
$_SESSION = [];

// If it's desired to kill the session, also delete the session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"], $params["secure"], $params["httponly"]
    );
}

// Destroy the session
session_destroy();

// Return a JSON response indicating logout success
header('Content-Type: application/json');
echo json_encode(['message' => 'Logout successful']);
?>

