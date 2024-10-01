<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');


include "Parents.php";
use Christan\Parents;

// Usage
$parentId = isset($_GET['id']) ? intval($_GET['id']) : 0;
$parent = new Parents();
echo json_encode($parent->fetchParentDetailsById($parentId));


