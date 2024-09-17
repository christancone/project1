<?php
require_once 'DBConnector.php';

class NapRecord
{
    private $db;

    public function __construct(DBConnector $db)
    {
        $this->db = $db;
    }

    public function insertRecords($fromTime, $toTime, $notes, $children)
    {
        $con = $this->db->getConnection();

        $fromTimeConverted = (new DateTime($fromTime))->format('Y-m-d H:i:s');
        $toTimeConverted = (new DateTime($toTime))->format('Y-m-d H:i:s');

        $sql = "INSERT INTO nap (childid, from_time, to_time, notes) VALUES (?, ?, ?, ?)";
        $stmt = $con->prepare($sql);

        foreach ($children as $childID) {
            $stmt->bind_param('isss', $childID, $fromTimeConverted, $toTimeConverted, $notes);
            if (!$stmt->execute()) {
                return ['status' => 'error', 'message' => 'Error inserting data: ' . $stmt->error];
            }
        }

        $stmt->close();
        return ['status' => 'success', 'message' => 'Nap records added successfully'];
    }
}
?>
