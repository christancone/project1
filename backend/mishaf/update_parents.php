<?php
// Allow CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'Parent.php';  // Ensure the correct file is included

// Read the incoming JSON data
$inputData = json_decode(file_get_contents("php://input"), true);

if (!$inputData || !isset($inputData['parent_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid input data. Please provide valid parent information.'
    ]);
    exit();
}

// Create an instance of Parent class and update parent data
$parentObj = new ParentClass();  // Make sure the class is correctly named

$response = $parentObj->updateParent($inputData);

echo json_encode($response);
