<?php

// Set the required headers
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
include 'Users.php';
use Christan\Users;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Retrieve POST data
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;
$firstname = $data['firstname'] ?? null;
$lastname = $data['lastname'] ?? null;
$email = $data['email'] ?? null;
$phone_no = $data['phone_no'] ?? null;
$username = $data['username'] ?? null;

if (!$id || !$firstname || !$lastname || !$email || !$phone_no || !$username) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

$users = new Users();
$users->updateUser($id, $firstname, $lastname, $email, $phone_no, $username);
