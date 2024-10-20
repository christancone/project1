<?php

use mishaf\DBConnector;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'DBConnector.php';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$selectedChildren = $data['selectedChildren'];

if (empty($selectedChildren)) {
    echo json_encode(['status' => 'error', 'message' => 'No children selected']);
    exit();
}

$db = new DBConnector();
$con = $db->getConnection();

foreach ($selectedChildren as $childId) {
    $sql = "UPDATE Nap SET notes = 'Updated via API' WHERE childid = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $childId);
    $stmt->execute();
}

$db->closeConnection($con);

echo json_encode(['status' => 'success', 'message' => 'Children updated successfully']);
?>
