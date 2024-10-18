<?php
session_start();

// Destroy the session and clear session variables
$_SESSION = array();
session_destroy();

// Optionally redirect to the login page
header("Location: ../../Login_php/Login_php/login.php");
exit();
?>
