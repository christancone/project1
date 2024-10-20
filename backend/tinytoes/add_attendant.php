<?php

use mishaf\DBConnector;

require_once 'DbConnector.php';

$data = json_decode(file_get_contents("php://input"), true);

$attendant_username = $data['attendant_username'];
$firstname = $data['firstname'];
$lastname = $data['lastname'];
$gender = $data['gender'];
$phonenumber = $data['phonenumber'];
$birthday = $data['birthday'];
$email = $data['email'];
$child_id = $data['child_id'];
$admin_id = $data['admin_id'];

$db = new DBConnector();
$con = $db->getConnection();

$sql = "INSERT INTO attendant (attendant_username, firstname, lastname, gender, phonenumber, birthday, email, child_id, admin_id)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $con->prepare($sql);

if ($stmt === false) {
    $response = ['status' => 'error', 'message' => 'Failed to prepare statement'];
    echo json_encode($response);
    $db->closeConnection($con);
    exit();
}

$stmt->bind_param("ssssssssi", $attendant_username, $firstname, $lastname, $gender, $phonenumber, $birthday, $email, $child_id, $admin_id);

if ($stmt->execute()) {
    $response = ['status' => 'success', 'message' => 'Attendant added successfully.'];
} else {
    $response = ['status' => 'error', 'message' => 'Failed to add attendant'];
}

echo json_encode($response);

$stmt->close();
$db->closeConnection($con);

?>