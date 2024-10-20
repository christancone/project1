<?php
header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Include User.php
require '../classes/User.php';

$user = new User();

// Fetch dashboard data
$response = array(
    'totalKids' => $user->getKidsCount(),
    'sickKids' => $user->getSickKidsCount(),
    'totalAttendants' => $user->getAttendantsCount()
);

echo json_encode($response);
?>
