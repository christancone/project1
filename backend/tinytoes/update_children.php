<?php

use mishaf\DBConnector;

require_once 'DbConnector.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$name = $data['name'];
$dob = $data['dob'];
$parent_id = $data['parent_id'];
$attendant_id = $data['attendant_id'];
$medical_info = $data['medical_info'];

list($firstname, $lastname) = explode(' ', $name, 2);

if (!$lastname) {
    $lastname = ''; 
}

$db = new DBConnector();
$con = $db->getConnection();

$sql = "UPDATE children SET firstname=?, lastname=?, dob=?, parent_id=?, attendant_id=?, medical_info=? WHERE id=?";
$stmt = $con->prepare($sql);

if ($stmt === false) {
    $response = [
        'status' => 'error',
        'message' => 'Failed to prepare statement: ' . $con->error
    ];
    echo json_encode($response);
    exit;
}

$stmt->bind_param("sssissi", $firstname, $lastname, $dob, $parent_id, $attendant_id, $medical_info, $id);

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