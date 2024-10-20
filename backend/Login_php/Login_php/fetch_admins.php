<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'dbtest.php'; // Include your Database class

try {
    // Instantiate the Database class
    $database = new Database("tinytoes"); // Use your database name
    $conn = $database->getConnection();

    // SQL query to fetch admin usernames
    $sql = "SELECT username FROM users WHERE role='Admin'";
    $result = $conn->query($sql);

    $admins = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $admins[] = $row['username'];
        }
    }

    echo json_encode($admins);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
