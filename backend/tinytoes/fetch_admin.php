<?php

use mishaf\DBConnector;

require_once 'DbConnector.php';

class AdminFetcher
{
    public function fetchAdmins()
    {
        $db = new DBConnector();
        $con = $db->getConnection();

        $sql = "
        SELECT
            a.admin_id,
            a.name AS admin_name,
            a.admin_username,
            a.admin_address,
            a.email AS admin_email,
            u.id AS user_id,
            u.username AS user_username,
            u.role AS user_role,
            u.email AS user_email,
            u.address AS user_address,
            u.phone_no AS user_phone_no,
            u.firstname AS user_firstname,
            u.lastname AS user_lastname,
            u.childcare AS user_childcare,
            GROUP_CONCAT(DISTINCT c.id) AS child_ids,
            GROUP_CONCAT(DISTINCT c.firstname) AS child_firstnames,
            GROUP_CONCAT(DISTINCT c.lastname) AS child_lastnames,
            GROUP_CONCAT(DISTINCT att.attendant_id) AS attendant_ids,
            GROUP_CONCAT(DISTINCT att.firstname) AS attendant_firstnames,
            GROUP_CONCAT(DISTINCT att.lastname) AS attendant_lastnames
        FROM
            admin a
        LEFT JOIN
            users u ON a.admin_username = u.username
        LEFT JOIN
            children c ON a.admin_id = c.admin_id
        LEFT JOIN
            attendants att ON a.admin_id = att.admin_id
        GROUP BY
            a.admin_id
        ";

        $result = $con->query($sql);
        $admins = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $admins[] = $row;
            }
        }

        $db->closeConnection($con);
        return $admins;
    }
}

$fetcher = new AdminFetcher();
echo json_encode($fetcher->fetchAdmins());
?>