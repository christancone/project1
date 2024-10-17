<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Ensure it's your frontend's URL
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

require_once 'Children.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $childrenObj = new Children();
    $response = $childrenObj->updateChild($data);
    echo json_encode($response);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
}

?>
