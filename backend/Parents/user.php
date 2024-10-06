<?php 
// Set the response header to allow JSON response
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include your Database class
include './dbtest.php';  

// Create an instance of the Database class
$dbConnector = new Database('project');
$conn = $dbConnector->getConnection();

// Define a class for handling form submissions and file uploads
class ChildDataHandler {
    private $response;
    private $directory;
    private $conn;

    public function __construct($dbConnection) {
        $this->response = [
            'status' => 'error',
            'message' => '',
            'data' => []
        ];
        $this->directory = 'uploads/'; // Base directory for uploads
        $this->conn = $dbConnection; // Store the database connection
    }

    public function handleRequest() {
        // Check if the request method is POST
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->processFormData();
        } else {
            $this->response['message'] = 'Invalid request method. Please submit the form using POST method.';
        }
        
        // Output the JSON response
        echo json_encode($this->response);
    }

    private function processFormData() {
        // Retrieve and sanitize form data
        $formData = $this->sanitizeFormData();

        // Check for required fields
        if (!$this->areRequiredFieldsFilled($formData)) {
            $this->response['message'] = 'Please fill in all required fields.';
            echo json_encode($this->response);
            return;
        }

        // Directory for child's files
        $this->directory .= $formData['child_name'] . '/';
        if (!is_dir($this->directory)) {
            mkdir($this->directory, 0777, true);
        }

        // Upload files
        $uploadedFiles = $this->uploadFiles($_FILES, $formData['child_name']);

        // Prepare the response data
        $this->response['data']['form'] = $formData;
        $this->response['data']['files'] = $uploadedFiles;

        // Insert data into the database
        if ($this->uploadData($formData, $uploadedFiles)) {
            // If everything is successful
            $this->response['status'] = 'success';
            $this->response['message'] = 'Data received successfully!';
        }
    }

    private function sanitizeFormData() {
        return [
            'parent_name' => htmlspecialchars(trim($_POST['parent_name'] ?? '')),
            'phone' => htmlspecialchars(trim($_POST['phone'] ?? '')),
            'child_name' => htmlspecialchars(trim($_POST['child_name'] ?? '')),
            'dob' => htmlspecialchars(trim($_POST['dob'] ?? '')),
            'gender' => htmlspecialchars(trim($_POST['gender'] ?? '')),
            'emergency' => htmlspecialchars(trim($_POST['emergency'] ?? '')),
            'emergency_ph' => htmlspecialchars(trim($_POST['emergency_ph'] ?? '')),
            'allergies' => htmlspecialchars(trim($_POST['allergies'] ?? '')),
            'medical' => htmlspecialchars(trim($_POST['medical'] ?? '')),
            'medication' => htmlspecialchars(trim($_POST['medication'] ?? ''))
        ];
    }

    private function uploadFiles($files, $childName) {
        $uploadedFiles = [];
        $fileKeys = ['parentNIC', 'birth_certificate', 'child_image', 'medical_report'];

        foreach ($fileKeys as $fileKey) {
            if (isset($files[$fileKey]) && $files[$fileKey]['error'] === UPLOAD_ERR_OK) {
                $uploadedFiles[$fileKey] = $this->uploadFile($files[$fileKey], $this->directory);
            } else {
                $uploadedFiles[$fileKey] = "{$fileKey} upload error.";
            }
        }

        return $uploadedFiles;
    }

    private function uploadFile($file, $directory) {
        $targetFilePath = $directory . basename($file['name']);
        if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
            return $targetFilePath; // Return the path of the uploaded file
        } else {
            return "Error uploading {$file['name']}.";
        }
    }

    private function areRequiredFieldsFilled($formData) {
        return !empty($formData['parent_name']) && !empty($formData['phone']) && 
               !empty($formData['child_name']) && !empty($formData['dob']) && 
               !empty($formData['gender']);
    }

    private function uploadData($formData, $uploadedFiles) {
        // Prepare a JSON string of uploaded files
        $filesJson = json_encode($uploadedFiles);

        // Insert into database
        $stmt = $this->conn->prepare("INSERT INTO children_data (parent_name, phone, child_name, dob, gender, emergency, emergency_ph, allergies, medical, medication, files) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssssss", 
            $formData['parent_name'], 
            $formData['phone'], 
            $formData['child_name'], 
            $formData['dob'], 
            $formData['gender'], 
            $formData['emergency'], 
            $formData['emergency_ph'], 
            $formData['allergies'], 
            $formData['medical'], 
            $formData['medication'], 
            $filesJson
        );

        // Execute the prepared statement
        if ($stmt->execute()) {
            // Data saved successfully
            return true;
        } else {
            $this->response['message'] = 'Error saving data: ' . $stmt->error;
            error_log('Database insert error: ' . $stmt->error); // Log the error for debugging
            return false;
        }

        // Close the statement
        $stmt->close();
    }
}

// Create an instance of the handler and process the request
$dataHandler = new ChildDataHandler($conn);
$dataHandler->handleRequest();
