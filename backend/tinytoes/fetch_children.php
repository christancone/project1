<?php

use mishaf\DBConnector;

require_once 'DbConnector.php';

class ChildrenFetcher {
    private $db;

    public function __construct() {
        $this->db = new DBConnector();
    }

    public function fetchChildren() {
        $con = $this->db->getConnection();

        $sql = "
        SELECT
            children.id,
            CONCAT(children.firstname, ' ', children.lastname) AS name,
            children.dob,
            children.medical_info,
            parent.id AS parent_id,
            CONCAT(parent.firstname, ' ', parent.lastname) AS parent_name,
            attendant.id AS attendant_id,
            CONCAT(attendant.firstname, ' ', attendant.lastname) AS attendant_name
        FROM children
        LEFT JOIN users AS parent ON children.parent_id = parent.id
        LEFT JOIN users AS attendant ON children.attendant_id = attendant.id
        ";

        $result = $con->query($sql);
        $children = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $children[] = $row;
            }
        }

        $this->db->closeConnection($con);

        return json_encode($children);
    }
}

$fetcher = new ChildrenFetcher();
echo $fetcher->fetchChildren();

?>