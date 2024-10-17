<?php
require_once 'DbConnector.php';

class Feedback
{
    public function fetch_feedback()
    {
        $db = new DBConnector();
        $con = $db->getConnection();
        // Update the query to join the 'users' table
        $sql = "SELECT f.id, CONCAT(u.firstname, ' ', u.lastname) AS parent_name, f.rating, f.comments, f.created_at 
                FROM feedback f
                LEFT JOIN users u ON f.user_id = u.id";  // Join with the 'users' table
        $result = $con->query($sql);
        $feedbacks = [];
        
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $feedbacks[] = $row;
            }
        }
        
        $db->closeConnection($con);
        return $feedbacks;
    }
}

$fetcher = new Feedback();
echo json_encode($fetcher->fetch_feedback());
?>
