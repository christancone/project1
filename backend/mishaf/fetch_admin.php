<?php

// Set the required headers
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); // Allow credentials

include 'Admin.php'; // Include the Admin class
use mishaf\Admin;

// Check if the request method is OPTIONS (preflight request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Create an instance of the Admin class
$admin = new Admin();

// Call the fetchAllAdmins function to retrieve all admins
$admin->fetchAllAdmins();

?>
