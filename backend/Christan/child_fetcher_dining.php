<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once 'DBConnector.php';

class ChildrenFetcher_
{
    public function childFetcherDining()
    {
        $db = new DBConnector();
        $con = $db->getConnection();

        $sql = "SELECT c.id as childID, c.firstname as childFirstName FROM Children c";

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

$fetcher = new ChildrenFetcher_();
echo json_encode($fetcher->childFetcherDining());
?>
