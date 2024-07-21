<?php

class User
{
    // Attributes
    public $id;
    public $name;
    public $email;
    public $password;
    public $role;
    public $created_at;
    public $updated_at;
    private $conn; // Database connection

    // Constructor
    public function __construct($dbConn, $attributes = []) {
        $this->conn = $dbConn;

        // Initialize object properties directly from $attributes array
        $this->id = isset($attributes['id']) ? $attributes['id'] : null;
        $this->name = isset($attributes['name']) ? $attributes['name'] : null;
        $this->email = isset($attributes['email']) ? $attributes['email'] : null;
        $this->password = isset($attributes['password']) ? $attributes['password'] : null;
        $this->role = isset($attributes['role']) ? $attributes['role'] : null;
        $this->created_at = isset($attributes['created_at']) ? $attributes['created_at'] : null;
        $this->updated_at = isset($attributes['updated_at']) ? $attributes['updated_at'] : null;
    }

    // Add a new user
    public function addUser() {
        $sql = "INSERT INTO Users (name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())";

        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssss", $this->name, $this->email, $this->password, $this->role);

        if ($stmt->execute()) {
            return true; // Insert successful
        } else {
            return false; // Insert failed
        }
    }


    public function updateUser() {
        if (!$this->id) {
            return false; // Cannot update without ID
        }

        $sql = "UPDATE Users SET name = ?, email = ?, password = ?, role = ?, updated_at = NOW() WHERE id = ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssssi", $this->name, $this->email, $this->password, $this->role, $this->id);

        if ($stmt->execute()) {
            return true; // Update successful
        } else {
            return false; // Update failed
        }
    }

    public function deleteUser() {
        if (!$this->id) {
            return false; // Cannot delete without ID
        }

        $sql = "DELETE FROM Users WHERE id = ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $this->id); // 'i' for integer

        if ($stmt->execute()) {
            return true; // Delete successful
        } else {
            return false; // Delete failed
        }
    }


    // Get all users
    public function getAllUsers() {
        $sql = "SELECT * FROM Users";
        $result = $this->conn->query($sql);

        $users = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
        }

        return $users;
    }
}


