<?php
header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'DbConnector.php'; 

class ChildrenData
{
    private $db;

    public function __construct()
    {
        $dbConnector = new DBConnector();
        $this->db = $dbConnector->getConnection();
    }

    public function getChildren($admin_username)
    {
        $query = "
            SELECT 
                c.id AS child_id, 
                CONCAT(c.firstname, ' ', c.lastname) AS child_name, 
                CONCAT(u.firstname, ' ', u.lastname) AS parent_name, 
                u.address, 
                u.phone_no 
            FROM 
                children c 
            JOIN 
                users u ON c.parent_id = u.id 
            WHERE 
                u.role = 'Parent' AND u.admin_username = ?
        ";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param("s", $admin_username);
        $stmt->execute();

        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        return $data;
    }
}

// Start the session and get the username from the session
session_start();
if (isset($_SESSION['username'])) {
    $admin_username = $_SESSION['username']; // Use 'username' field from the session
    $childrenData = new ChildrenData();
    $data = $childrenData->getChildren($admin_username);
    echo json_encode($data);
} else {
    echo json_encode(['error' => 'Admin not logged in.']);
}
?>
