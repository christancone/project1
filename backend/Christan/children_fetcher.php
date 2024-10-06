<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');



require_once 'DBConnector.php';
include "Children.php";
use Christan\Children;

$child = new Children();
echo json_encode($child->fetchChildren());
?>