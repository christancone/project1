<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require '../classes/User.php';
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$status = $data['status'];
$user=new User();
//$attendanceUpdater = new AttendanceUpdater();
$success = $user->updateAttendance($id, $status);

//$response=$user->updateChild($data);
echo json_encode(['success' => $success]);






?>