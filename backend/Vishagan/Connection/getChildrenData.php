<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173'); // Allow requests from your frontend
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Allow GET, POST, and OPTIONS methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow the necessary headers
header('Access-Control-Allow-Credentials: true'); // Allow credentials like cookies, sessions

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

require '../classes/User.php';

$user = new User();
$data = $user->getChildren($_SESSION['username']);

if ($data) {
    echo json_encode($data);
} else {
    echo json_encode(['error' => 'No data found']);
}
?>
