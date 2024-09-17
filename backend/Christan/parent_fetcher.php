<?php

require_once 'DBConnector.php';

class ParentFetcher
{
    private $db;

    public function __construct()
    {
        $this->db = new DBConnector();
    }

    public function fetchParentDetails($parentId)
    {
        $con = $this->db->getConnection();

        $sql = "SELECT * FROM Users WHERE id = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param('i', $parentId);
        $stmt->execute();
        $result = $stmt->get_result();

        $parentDetails = [];

        if ($result->num_rows > 0) {
            $parentDetails = $result->fetch_assoc();
        }

        $stmt->close();
        $this->db->closeConnection($con);

        return $parentDetails;
    }
}

// Usage
$parentId = isset($_GET['id']) ? intval($_GET['id']) : 0;
$fetcher = new ParentFetcher();
echo json_encode($fetcher->fetchParentDetails($parentId));


