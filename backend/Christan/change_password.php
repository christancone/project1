<?php

header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header("Access-Control-Allow-Origin: http://localhost:5173");
// Allow specific methods (e.g., POST)
header('Access-Control-Allow-Methods: POST');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true"); // Allow credentials

include 'Users.php'; // Import the Users class
use Christan\Users;

// Get the input data from the request body (JSON)
$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'] ?? null;
$currentPassword = $data['currentPassword'] ?? null;
$newPassword = $data['newPassword'] ?? null;

// Create an instance of the Users class
$users = new Users();

// Call the changePassword function and echo the result
echo $users->changePassword($id, $currentPassword, $newPassword);
