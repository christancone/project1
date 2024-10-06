<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');



include 'Children.php';
use Christan\Children;

// Create an instance of the Children class
$childrenClass = new Children();

// Call the fetchChildrenList method
$childrenList = $childrenClass->fetchChildrenList();

// Check if the list is not empty
if (!empty($childrenList)) {
    // Output the list of children
    echo json_encode(['status' => 'success', 'children' => $childrenList]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No children found']);
}
?>
