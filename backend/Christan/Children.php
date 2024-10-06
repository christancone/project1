<?php

namespace Christan;



use DBConnector;
require_once 'DBConnector.php';

class Children
{
    // Function to fetch the list of children
    public function fetchChildrenList()
    {
        $db = new DBConnector();
        $con = $db->getConnection();

        $sql = "SELECT c.id as childID, c.firstname as childFirstName FROM Children c";

        $result = $con->query($sql);

        $children = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $children[] = $row;
            }
        }

        $db->closeConnection($con);

        return $children;
    }

    // Function to process dining records
    public function process_dining($fromTime, $toTime, $notes, $children)
    {
        // Create an instance of DBConnector
        $dbConnector = new DBConnector();
        $con = $dbConnector->getConnection();

        // Validate input data
        if (empty($fromTime) || empty($toTime) || empty($notes) || empty($children)) {
            return ['status' => 'error', 'message' => 'Invalid input data'];
        }

        // Convert ISO 8601 time to MySQL TIME format (HH:MM:SS)
        $fromTime = date('H:i:s', strtotime($fromTime));
        $toTime = date('H:i:s', strtotime($toTime));

        // Prepare SQL statement to insert data into the dining table
        $sql = "INSERT INTO dining (childID, food, totime, fromtime) VALUES (?, ?, ?, ?)";
        $stmt = $con->prepare($sql);

        // Loop through each child ID and insert a record
        foreach ($children as $childID) {
            // Bind parameters
            $stmt->bind_param('isss', $childID, $notes, $toTime, $fromTime);

            // Execute statement
            if (!$stmt->execute()) {
                $stmt->close();
                $dbConnector->closeConnection($con);
                return ['status' => 'error', 'message' => 'Error inserting data: ' . $stmt->error];
            }
        }

        // Close the statement and connection
        $stmt->close();
        $dbConnector->closeConnection($con);

        return ['status' => 'success', 'message' => 'Data successfully inserted into dining table'];
    }

    public function insertNapRecord($fromTime, $toTime, $notes, $children)
    {
        $dbConnector = new DBConnector();
        $con = $dbConnector->getConnection();

        try {
            // Validate that fromTime and toTime are in the correct format
            if (!preg_match('/^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/', $fromTime) ||
                !preg_match('/^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/', $toTime)) {
                return ['status' => 'error', 'message' => 'Invalid time format. Use HH:mm:ss format.'];
            }

            // Prepare SQL statement to insert data into the nap table
            $sql = "INSERT INTO nap (childid, from_time, to_time, notes) VALUES (?, ?, ?, ?)";
            $stmt = $con->prepare($sql);

            if (!$stmt) {
                $dbConnector->closeConnection($con);
                return ['status' => 'error', 'message' => 'Prepare failed: ' . $con->error];
            }

            foreach ($children as $childID) {
                $stmt->bind_param('isss', $childID, $fromTime, $toTime, $notes);
                if (!$stmt->execute()) {
                    $stmt->close();
                    $dbConnector->closeConnection($con);
                    return ['status' => 'error', 'message' => 'Error inserting data: ' . $stmt->error];
                }
            }

            $stmt->close();
            $dbConnector->closeConnection($con);
            return ['status' => 'success', 'message' => 'Nap records added successfully'];
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => 'Exception: ' . $e->getMessage()];
        }
    }

    public function fetchChildren()
    {
        $db = new DBConnector();
        $con = $db->getConnection();

        $sql = "SELECT c.id as childID, CONCAT(c.firstname, ' ', c.lastname) as childName, u.id as parentID, u.phone_no as parentPhone
                FROM Children c
                JOIN Users u ON c.parent_id = u.id";

        $result = $con->query($sql);

        $children = [];

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $children[] = $row;
            }
        }

        $db->closeConnection($con);

        return $children;
    }
    


}
