<?php
require_once 'DbConnector.php';

class FeedbackFetcher
{
    public function fetchFeedback()
    {
        $db = new DBConnector();
        $con = $db->getConnection();
        $sql = "SELECT f.id, CONCAT(p.first_name, ' ', p.last_name) AS parent_name, f.rating, f.comments, f.created_at 
                FROM feedback f
                LEFT JOIN parents p ON f.user_id = p.parent_id";
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

$fetcher = new FeedbackFetcher();
echo json_encode($fetcher->fetchFeedback());
?>