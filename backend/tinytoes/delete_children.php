<?php
require_once 'DbConnector.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

$db = new DBConnector();
$con = $db->getConnection();
$sql = "DELETE FROM children WHERE id=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("i", $id);

$response = [];
if ($stmt->execute()) {
    $response['status'] = 'success';
} else {
    $response['status'] = 'error';
    $response['message'] = $stmt->error;
}

$stmt->close();
$db->closeConnection($con);

echo json_encode($response);
?>
