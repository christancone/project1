<?php

use mishaf\DBConnector;

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Access-Control-Allow-Credentials: true");
include '../';

class BillingDetailsFetcher {
    private $db;

    public function __construct() {
        $this->db = (new DBConnector())->getConnection();
    }

    public function getBillingDetails($adminUsername) {
        $query = "
            SELECT
                b.amount AS totalAmount,
                b.outstanding_amt AS outstandingAmount,
                b.last_paid_date AS lastReceived,
                c.parent_id,
                CONCAT(c.firstname, ' ', c.lastname) AS childrenName
            FROM billing b
            JOIN children c ON b.child_id = c.id
            JOIN users u ON c.parent_id = u.id
            WHERE u.admin_username = ?
        ";

        // Prepare and execute the SQL statement
        $stmt = $this->db->prepare($query);
        if ($stmt) {
            $stmt->bind_param('s', $adminUsername);
            $stmt->execute();
            $result = $stmt->get_result();

            $billingDetails = [];
            while ($row = $result->fetch_assoc()) {
                $billingDetails[] = $row;
            }

            $stmt->close();
            return $billingDetails;
        } else {
            return []; // Return an empty array if statement preparation fails
        }
    }
}

// Start session and check if the session is active
session_start();
if (!isset($_SESSION['id'])) {
    http_response_code(403); // Forbidden
    echo json_encode(['status' => 'error', 'message' => 'Session expired or not set.']);
    exit;
}

// Create an instance of the BillingDetailsFetcher class
$fetcher = new BillingDetailsFetcher();
header('Content-Type: application/json');

// Get the admin username from the session
$adminUsername = $_SESSION['admin_username'] ?? null;
if ($adminUsername) {
    $billingDetails = $fetcher->getBillingDetails($adminUsername);
    echo json_encode($billingDetails);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Admin username not found.']);
}
