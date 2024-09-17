<?php

include 'DBConnector.php'; // Assuming you have a DBConnector class for database connection

// Allow access from your frontend origin
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$connection = (new DBConnector())->getConnection();

$query = "SELECT id, username FROM users";

if ($result = $connection->query($query)) {
    $users = array();
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($users);
} else {
    // Return the SQL error
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $connection->error]);
}

$connection->close();
?>
