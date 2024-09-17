<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'DBConnector.php';

$connection = (new DBConnector())->getConnection();
$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(["error" => "Missing user_id"]);
    exit();
}

// Get the last 10 users the logged-in user has messaged
$query = "SELECT DISTINCT u.id, u.username
          FROM users u
          JOIN message m ON u.id = m.receiver_id OR u.id = m.sender_id
          WHERE m.sender_id = ? OR m.receiver_id = ?
          ORDER BY m.timestamp DESC
          LIMIT 10";

$stmt = $connection->prepare($query);
$stmt->bind_param("ii", $user_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);

$stmt->close();
$connection->close();
?>
