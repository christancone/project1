<?php

include 'Users.php'; // Include the Users class
use Christan\Users;

// Allow access from your frontend origin
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Create an instance of the Users class and fetch the list of admins
$users = new Users();
$users->fetchAllAdmins();

?>