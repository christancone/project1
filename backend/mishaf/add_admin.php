<?php
include 'Admin.php'; // Assuming the Admin class file is called Admin.php
use mishaf\Admin;

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle CORS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data)) {
    $admin = new Admin();

    // Call the add_admin method to handle the request
    $admin->add_admin($data);
} else {
    // Return error for missing input data
    http_response_code(400);
    echo json_encode([
        "error" => "Invalid input. Please provide all required fields."
    ]);
}
?>
