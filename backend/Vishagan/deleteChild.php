<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'DbConnector.php';

class ChildDeleter {
    private $conn;

    public function __construct($dbConnection) {
        $this->conn = $dbConnection;
    }

    public function deleteChild($childId) {
        // SQL query to delete a child record
        $query = "DELETE FROM children WHERE id = ?";
        
        // Prepare the statement
        if ($stmt = $this->conn->prepare($query)) {
            // Bind the parameter
            $stmt->bind_param("i", $childId);
            
            // Execute the statement
            if ($stmt->execute()) {
                $response = array("status" => "success", "message" => "Record deleted successfully.");
            } else {
                $response = array("status" => "error", "message" => "Failed to delete record.");
            }

            // Close the statement
            $stmt->close();
        } else {
            $response = array("status" => "error", "message" => "Failed to prepare SQL statement.");
        }
        
        return $response;
    }
}

// Create a new DBConnector instance
$database = new DbConnector();
$conn = $database->getConnection();

// Create a ChildDeleter instance
$deleter = new ChildDeleter($conn);

// Get the child ID from POST data
$data = json_decode(file_get_contents("php://input"));
$childId = $data->child_id;

// Delete the child record and get the response
$response = $deleter->deleteChild($childId);

// Close the database connection
$database->closeConnection($conn);

// Output the response
echo json_encode($response);
?>
