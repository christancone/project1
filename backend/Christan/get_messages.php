<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Allow all origins, change to specific domain if needed
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'DBConnector.php';

$data = json_decode(file_get_contents("php://input"), true);

$senderId = $data['sender_id'] ?? null;
$receiverId = $data['receiver_id'] ?? null;

if (!$senderId || !$receiverId) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid sender_id or receiver_id']);
    exit();
}

$db = new DBConnector();
$connection = $db->getConnection();

$query = "SELECT sender_id, receiver_id, message, timestamp FROM message WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)";
$stmt = $connection->prepare($query);

if ($stmt) {
    $stmt->bind_param("iiii", $senderId, $receiverId, $receiverId, $senderId);
    $stmt->execute();
    $result = $stmt->get_result();

    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }

    echo json_encode($messages);
    $stmt->close();
} else {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $connection->error]);
}

$db->closeConnection($connection);
?>
