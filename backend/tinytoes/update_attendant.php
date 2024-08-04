<?php

require_once 'DbConnector.php';

$data = json_decode(file_get_contents("php://input"), true);

$attendant_id = $data['attendant_id'];
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

$sql = "UPDATE attendant SET attendant_username=?, firstname=?, lastname=?, gender=?, phonenumber=?, birthday=?, email=?, child_id=?, admin_id=? WHERE attendant_id=?";
$stmt = $con->prepare($sql);

// Specify the types of the parameters
$stmt->bind_param("sssssssssi", $attendant_username, $firstname, $lastname, $gender, $phonenumber, $birthday, $email, $child_id, $admin_id, $attendant_id);

$stmt->execute();

$response = ['status' => 'success', 'message' => 'Attendant updated successfully.'];
echo json_encode($response);

$db->closeConnection($con);

?>