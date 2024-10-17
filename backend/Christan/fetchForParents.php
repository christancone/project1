<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header("Access-Control-Allow-Credentials: true"); // Allow credentials

session_start();

// Include your class file containing the fetchForAttendant function
require_once 'Users.php';
use Christan\Users;

// Check if the user is logged in and is an attendant
if (!isset($_SESSION['id']) || !isset($_SESSION['role'])) {
    http_response_code(403); // Forbidden
    echo json_encode(["error" => "Unauthorized access."]);
    exit;
}

// Create an instance of the class that contains the fetchForAttendant function
$yourClassInstance = new Users();

// Call the function to fetch the parents and attendants under the same admin
$yourClassInstance->fetchForParent();
