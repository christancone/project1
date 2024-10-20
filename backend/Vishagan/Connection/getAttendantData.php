<?php
header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
// Allow specific methods (e.g., GET)
header('Access-Control-Allow-Methods: GET');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');

require '../classes/User.php';
$user=new User();
$data=$user->getAttendants();


// $childrenData = new ChildrenData();
// $data = $childrenData->getChildren();
echo json_encode($data);

?>