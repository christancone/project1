<?php
// Allow CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: DELETE, POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'Parent.php';  // Include Parent class

// Read incoming JSON data
$inputData = json_decode(file_get_contents("php://input"), true);

if (!$inputData || !isset($inputData['parent_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid input data. Parent ID is required.'
    ]);
    exit();
}

$parent_id = $inputData['parent_id'];

// Create an instance of Parent class and call the delete method
$parentObj = new ParentClass();
$response = $parentObj->deleteParent($parent_id);

echo json_encode($response);
