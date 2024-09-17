<?php

header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
// Allow specific methods (e.g., POST)
header('Access-Control-Allow-Methods: POST');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');

include 'DBConnector.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$currentPassword = $data['currentPassword'];
$newPassword = $data['newPassword'];

// Validate input
if (empty($id) || empty($currentPassword) || empty($newPassword)) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit();
}

// Create DB connection
$database = new DBConnector();
$con = $database->getConnection();

// Check if the current password is correct
$query = "SELECT password FROM Users WHERE id = ?";
$stmt = $con->prepare($query);
$stmt->bind_param('i', $id);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($hashedPassword);
$stmt->fetch();

if (!password_verify($currentPassword, $hashedPassword)) {
    echo json_encode(['success' => false, 'message' => 'Current password is incorrect']);
    $database->closeConnection($con);
    exit();
}

// Update password
$newHashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
$updateQuery = "UPDATE Users SET password = ? WHERE id = ?";
$updateStmt = $con->prepare($updateQuery);
$updateStmt->bind_param('si', $newHashedPassword, $id);
$success = $updateStmt->execute();

$database->closeConnection($con);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Password changed successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to change password']);
}

