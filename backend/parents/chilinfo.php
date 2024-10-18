<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set CORS headers to allow access from your frontend
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Include the file that connects to your database
include './dbtest.php';  // Ensure this path is correct and points to the actual dbtest.php file

// Set session cookie parameters and start the session
session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'secure' => false, 'httponly' => true]);
session_start(); // Start the session to access session variables

// Log the session ID for debugging
error_log("chilinfo.php session ID: " . session_id());

// Create an instance of the Database class
$dbConnector = new Database('tinytoes');
$conn = $dbConnector->getConnection();

// Check if the database connection is successful
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed.']);
    exit;
}

// Define a class to handle fetching child information from the database
class ChildInfo {
    private $db;

    // Constructor to initialize the database connection
    public function __construct($db) {
        $this->db = $db;
    }

    // Method to fetch child data using the logged-in user's email
    public function fetchChildData($email) {
        // SQL query to fetch the required child fields from the 'users' table
        $query = "SELECT child_name, dob, allergies, medication, medical_info, emergency_contact 
                  FROM users WHERE email = ?";

        // Use a prepared statement to prevent SQL injection
        if ($stmt = $this->db->prepare($query)) {
            $stmt->bind_param('s', $email); // Bind the email to the query
            $stmt->execute(); // Execute the query

            // Fetch the result and return it as an associative array
            $result = $stmt->get_result();
            $data = $result->fetch_assoc();

            $stmt->close(); // Close the statement
            return $data; // Return the data
        } else {
            // Log any errors in preparing the statement
            error_log('Database error: ' . $this->db->error);
            return null;
        }
    }
}

// Check if the user is logged in by verifying the 'email' session variable
if (isset($_SESSION['email'])) {
    $email = $_SESSION['email']; // Get the email from the session

    // Create an instance of the ChildInfo class with the database connection
    $childInfo = new ChildInfo($conn); // Use the $conn connection instead of $db

    // Fetch the child data based on the user's email
    $childData = $childInfo->fetchChildData($email);

    // Output the child data as JSON
    if ($childData) {
        echo json_encode($childData); // Send the child data as JSON response
    } else {
        echo json_encode(['error' => 'No data found']); // Handle case where no data is found
    }
} else {
    // If the user is not logged in, return an error message
    echo json_encode(['error' => 'Not logged in']);
}
?>
