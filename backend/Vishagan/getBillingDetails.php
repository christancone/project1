<?php
require_once 'DbConnector.php';

class BillingDetailsFetcher {
    private $db;

    public function __construct() {
        $this->db = (new DbConnector())->getConnection();
    }

    public function getBillingDetails() {
        $query = "
            SELECT
                b.amount AS totalAmount,
                b.outstanding_amt AS outstandingAmount,
                b.last_paid_date AS lastReceived,
                c.parent_id,
                CONCAT(c.firstname, ' ', c.lastname) AS childrenName
            FROM billing b
            JOIN children c ON b.child_id = c.id
        ";

        $result = $this->db->query($query);
        $billingDetails = [];

        while ($row = $result->fetch_assoc()) {
            $billingDetails[] = $row;
        }

        return $billingDetails;
    }
}

$fetcher = new BillingDetailsFetcher();
header('Content-Type: application/json');
echo json_encode($fetcher->getBillingDetails());
?>
