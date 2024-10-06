<?php

namespace Christan;

include "DBConnector.php";
use DBConnector;

class Parents
{
    public function fetchParentDetailsById($parentId)
    {
        $db = new DBConnector();
        $con = $db->getConnection();

        // Prepare the SQL statement
        $sql = "SELECT * FROM Users WHERE id = ?";
        $stmt = $con->prepare($sql);

        if (!$stmt) {
            return ['status' => 'error', 'message' => 'Database prepare failed: ' . $con->error];
        }

        // Bind parameters and execute
        $stmt->bind_param('i', $parentId);
        $stmt->execute();
        $result = $stmt->get_result();

        $parentDetails = [];

        // Fetch parent details
        if ($result->num_rows > 0) {
            $parentDetails = $result->fetch_assoc();
        }

        // Close statement and connection
        $stmt->close();
        $db->closeConnection($con);

        return $parentDetails;
    }
}
