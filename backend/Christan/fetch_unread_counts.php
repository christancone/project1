<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Change this to your frontend URL
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); // Allow credentials


include 'Messages.php'; // Include the Messages class

use Christan\Messages;
// Create an instance of the Messages class
$messages = new Messages();

// Call the method to get unread message counts
$messages->getUnreadMessageCounts();
?>
