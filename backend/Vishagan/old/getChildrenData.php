<?php
header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
// Allow specific methods (e.g., GET)
header('Access-Control-Allow-Methods: GET');
// Allow specific headers
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

    public function getChildren()
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
                u.role = 'Parent'
        ";

        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        return $data;
    }
}

// Instantiate ChildrenData and get data
$childrenData = new ChildrenData();
$data = $childrenData->getChildren();
echo json_encode($data);
?>
