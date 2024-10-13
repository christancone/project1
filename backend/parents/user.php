<?php 
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include './dbtest.php';  

$dbConnector = new Database('tinytoes');
$conn = $dbConnector->getConnection();

if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed.']);
    exit;
}

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
        $this->directory = 'uploads/';
        $this->conn = $dbConnection;
    }

    public function handleRequest() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->processFormData();
        } else {
            $this->response['message'] = 'Invalid request method. Please submit the form using POST.';
        }
        
        echo json_encode($this->response);
    }

    <?php 
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    include './dbtest.php';  
    
    $dbConnector = new Database('tinytoes');
    $conn = $dbConnector->getConnection();
    
    if (!$conn) {
        echo json_encode(['status' => 'error', 'message' => 'Database connection failed.']);
        exit;
    }
    
    // Assuming a valid user ID is passed as a GET parameter
    $userId = $_GET['id'] ?? null;
    
    if ($userId) {
        $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
    
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            echo json_encode(['status' => 'success', 'data' => $user]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User not found.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request.']);
    }
    ?>
    




    private function processFormData() {
        $formData = $this->sanitizeFormData();

        if (!$this->areRequiredFieldsFilled($formData)) {
            $this->response['message'] = 'Please fill in all required fields.';
            return;
        }

        $this->directory .= $formData['child_name'] . '/';
        
        if (!is_dir($this->directory)) {
            if (!mkdir($this->directory, 0777, true)) {
                $this->response['message'] = 'Failed to create upload directory.';
                return;
            }
        }

        $uploadedFiles = $this->uploadFiles($_FILES, $formData['child_name']);
        $this->response['data']['form'] = $formData;
        $this->response['data']['files'] = $uploadedFiles;

        if ($this->uploadData($formData, $uploadedFiles)) {
            $this->response['status'] = 'success';
            $this->response['message'] = 'Data received successfully!';
        }
    }

    private function sanitizeFormData() {
        return [
            'email' => htmlspecialchars(trim($_POST['email'] ?? '')),
            'parent_name' => htmlspecialchars(trim($_POST['parent_name'] ?? '')),
            'phone' => htmlspecialchars(trim($_POST['phone'] ?? '')),
            'child_name' => htmlspecialchars(trim($_POST['child_name'] ?? '')),
            'dob' => htmlspecialchars(trim($_POST['dob'] ?? '')),
            'gender' => htmlspecialchars(trim($_POST['gender'] ?? '')),
            'emergency' => htmlspecialchars(trim($_POST['emergency'] ?? '')),
            'emergency_ph' => htmlspecialchars(trim($_POST['emergency_ph'] ?? '')),
            'allergies' => htmlspecialchars(trim($_POST['allergies'] ?? '')),
            'medical' => htmlspecialchars(trim($_POST['medical'] ?? '')),
            'medication' => htmlspecialchars(trim($_POST['medication'] ?? '')),
        ];
    }

    private function areRequiredFieldsFilled($formData) {
        return !empty($formData['parent_name']) && !empty($formData['phone']) && 
               !empty($formData['child_name']) && !empty($formData['dob']) && 
               !empty($formData['gender']);
    }

    private function uploadFiles($files, $childName) {
        $uploadedFiles = [];
        $fileKeys = [
            'parentNIC' => 'PNIC',
            'birth_certificate' => 'BCertificate',
            'child_image' => 'Image',
            'medical_report' => 'MedicalReport'
        ];
    
        foreach ($fileKeys as $fileKey => $fileSuffix) {
            if (isset($files[$fileKey]) && $files[$fileKey]['error'] === UPLOAD_ERR_OK) {
                // Ensure file size is less than 2MB (2 * 1024 * 1024 bytes = 2MB)
                if ($files[$fileKey]['size'] <= 2 * 1024 * 1024) {
                    // Use the childName and the suffix to create the custom file name
                    $uploadedFiles[$fileKey] = $this->uploadFile($files[$fileKey], $this->directory, $childName . '.' . $fileSuffix);
                } else {
                    $uploadedFiles[$fileKey] = "{$fileKey} exceeds the maximum file size of 2MB.";
                    $this->response['status'] = 'error';
                }
            } else {
                $uploadedFiles[$fileKey] = "{$fileKey} upload error.";
                $this->response['status'] = 'error';
            }
        }
    
        return $uploadedFiles;
    }
    
    private function uploadFile($file, $directory, $customFileName) {
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf']; // Allowed file types
        $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
        
        // Check if the file type is allowed
        if (!in_array(strtolower($fileExtension), $allowedExtensions)) {
            return "Invalid file type. Only JPG, JPEG, PNG, and PDF files are allowed.";
        }
    
        $newFileName = $customFileName . '.' . $fileExtension;
        $targetFilePath = $directory . $newFileName;
    
        if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
            return $targetFilePath;
        } else {
            return "Error uploading {$file['name']}.";
        }
    }
    
    

    private function uploadData($formData, $uploadedFiles) {
        $email = $formData['email'];
        $stmt = $this->conn->prepare("UPDATE users SET 
            parent_name = ?, 
            phone_no = ?, 
            child_name = ?, 
            dob = ?, 
            gender = ?, 
            emergency_contact = ?, 
            emergency_phone = ?, 
            allergies = ?, 
            medical_info = ?, 
            medication = ?, 
            files = ? 
            WHERE email = ?");

        if ($stmt) {
            $stmt->bind_param("ssssssssssss", 
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
                json_encode($uploadedFiles),
                $email
            );

            if ($stmt->execute()) {
                $this->response['message'] = 'Data updated successfully.';
                $stmt->close();
                return true;
            }
            $stmt->close();
        }

        $this->response['message'] = 'Database update failed.';
        return false;
    }
}

$formHandler = new ChildDataHandler($conn);
$formHandler->handleRequest();
?>
