<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Ensure it's your frontend's URL
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

require_once 'classes/Children.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

if ($id) {
    $childrenObj = new Children();
    $response = $childrenObj->deleteChild($id);
    echo json_encode($response);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
}

?>
