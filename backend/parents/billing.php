<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Include the file that connects to your database
include './dbtest.php';  // Ensure this path is correct

// Set session cookie parameters and start the session
session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'secure' => false, 'httponly' => true]);
session_start(); // Start the session

// Log the session ID for debugging
error_log("billing.php session ID: " . session_id());

// Check if the user ID is set in the session
if (!isset($_SESSION['id'])) {
    error_log("User ID not found in session.");
    echo json_encode(['error' => 'User ID not found in session.']);
    exit;
}

// Get the user ID from the session
$userId = $_SESSION['id'];

// Create an instance of the Database class
$dbConnector = new Database('tinytoes');
$conn = $dbConnector->getConnection();

// Check if the database connection is successful
if (!$conn) {
    echo json_encode(['error' => 'Database connection failed.']);
    exit;
}

// Modify the SQL query to check the JOIN condition
$sql = "SELECT 
            u.id AS user_id,
            b.amount, 
            b.last_paid_date, 
            b.last_paid_amount, 
            b.outstanding_amt, 
            b.due_date 
        FROM users u 
        JOIN billing b ON u.id = b.child_id 
        WHERE u.id = ?";

// Prepare statement
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    echo json_encode(['error' => 'SQL prepare statement error: ' . $conn->error]);
    exit;
}

$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

// Check if any results are returned
if ($result->num_rows > 0) {
    $billingRecords = [];
    // Fetch and store the data in an array
    while ($row = $result->fetch_assoc()) {
        $billingRecords[] = $row;
    }
    // Return the billing records as JSON
    echo json_encode($billingRecords);
} else {
    // No records found
    echo json_encode(['error' => 'No billing records found for User ID: ' . $userId]);
}

// Close the database connection
$conn->close();
?>
