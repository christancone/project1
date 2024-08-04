<?php

require_once 'DBConnector.php';

class ParentFetcher
{
    public function fetchParentDetails($parentId)
    {
        $db = new DBConnector();
        $con = $db->getConnection();

        $sql = "SELECT * FROM Users WHERE id = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param('i', $parentId);
        $stmt->execute();
        $result = $stmt->get_result();

        $parentDetails = [];

        if ($result->num_rows > 0) {
            $parentDetails = $result->fetch_assoc();
        }

        $db->closeConnection($con);

        return $parentDetails;
    }
}

$parentId = isset($_GET['id']) ? intval($_GET['id']) : 0;

$fetcher = new ParentFetcher();
echo json_encode($fetcher->fetchParentDetails($parentId));

