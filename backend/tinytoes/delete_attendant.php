<?php

use mishaf\DBConnector;

require_once 'DbConnector.php';

$data = json_decode(file_get_contents("php://input"), true);
$attendant_id = $data['attendant_id'];

$db = new DBConnector();
$con = $db->getConnection();

$sql = "DELETE FROM attendant WHERE attendant_id=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("i", $attendant_id);
$stmt->execute();

$response = ['status' => 'success', 'message' => 'Attendant deleted successfully.'];
echo json_encode($response);

$db->closeConnection($con);
?>