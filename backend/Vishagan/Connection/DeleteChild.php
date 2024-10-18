<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require '../classes/User.php';

$data = json_decode(file_get_contents("php://input"));
$childId = $data->child_id;

$user = new User();
$success = $user->deleteChild($childId);

if ($success) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Could not delete child record']);
}
?>
