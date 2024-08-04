<?php
require_once 'DbConnector.php';

class Child {
    private $conn;
    private $table_name = 'children';

    public function __construct() {
        $database = new DbConnector();
        $this->conn = $database->getConnection();
    }

    public function delete($child_id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);

        if ($stmt) {
            $stmt->bind_param('i', $child_id);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                return ['status' => 'success', 'message' => 'Record deleted successfully'];
            } else {
                return ['status' => 'error', 'message' => 'Record not found or already deleted'];
            }
        } else {
            return ['status' => 'error', 'message' => 'Failed to prepare statement'];
        }
    }
}
?>
