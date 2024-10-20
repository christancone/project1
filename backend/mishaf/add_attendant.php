<?php
include 'classes/Attendant.php';
use mishaf\Attendant;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$attendant = new Attendant();
$attendant->add_attendant($data);
?>
