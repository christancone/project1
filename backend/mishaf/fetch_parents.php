<?php
// Headers to allow CORS and specify JSON response
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json"); // Make sure response is JSON
header("Access-Control-Allow-Credentials: true");

require_once 'Parent.php';  // Include your Parent class

$parentObj = new ParentClass();  // Create an instance of ParentClass
$parents = $parentObj->fetchParents();  // Fetch parents

// Return the parents data as JSON
echo json_encode($parents);
