<?php
require_once 'DBConnector.php';

class DiningRecord
{
    private $db;

    public function __construct(DBConnector $db)
    {
        $this->db = $db;
    }

    public function insertRecords($fromTime, $toTime, $notes, $children)
    {
        $con = $this->db->getConnection();

        $fromTime = date('H:i:s', strtotime($fromTime));
        $toTime = date('H:i:s', strtotime($toTime));

        $sql = "INSERT INTO dining (childID, food, totime, fromtime) VALUES (?, ?, ?, ?)";
        $stmt = $con->prepare($sql);

        foreach ($children as $childID) {
            $stmt->bind_param('isss', $childID, $notes, $toTime, $fromTime);
            if (!$stmt->execute()) {
                return ['status' => 'error', 'message' => 'Error inserting data: ' . $stmt->error];
            }
        }

        $stmt->close();
        return ['status' => 'success', 'message' => 'Data successfully inserted into dining table'];
    }
}
?>
