<?php
namespace Christan;

include "DBConnector.php";
use DBConnector;

class Users {
    private $db;

    public function __construct() {
        // Create a new instance of DBConnector and store it in $db
        $this->db = new DBConnector();
    }

    // Fetch all users from the database
    public function fetchAllUsers() {
        $connection = $this->db->getConnection(); // Get the DB connection
        $query = "SELECT id, username FROM users";
        $users = array();

        if ($result = $connection->query($query)) {
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($users);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $connection->error]);
        }

        $connection->close();
    }

    // Fetch all admins
    public function fetchAllAdmins() {
    // Establish a database connection
    $connection = $this->db->getConnection();

    // SQL query to select all admins
    $query = "SELECT id, username, email, firstname, lastname FROM users WHERE role = 'Admin'";
    $admins = array();

    // Execute the query and fetch results
    if ($result = $connection->query($query)) {
        while ($row = $result->fetch_assoc()) {
            $admins[] = $row;
        }
        // Set the content type to JSON and output the result
        header('Content-Type: application/json');
        echo json_encode($admins);
    } else {
        // Handle query error
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $connection->error]);
    }

    // Close the database connection
    $connection->close();
}

    // Fetch a single user by ID
    public function getUserById($id) {
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'No ID provided']);
            return;
        }

        // Establish a database connection
        $connection = $this->db->getConnection();

        // Prepare the SQL query
        $query = "SELECT firstname, lastname, email, phone_no, username FROM users WHERE id = ?";
        $stmt = $connection->prepare($query);

        if ($stmt) {
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                echo json_encode($user);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'User not found']);
            }

            $stmt->close();
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $connection->error]);
        }

        // Close the database connection
        $connection->close();
    }

    // Update user details by ID
    public function updateUser($id, $firstname, $lastname, $email, $phone_no, $username) {
        if (!$id || !$firstname || !$lastname || !$email || !$phone_no || !$username) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            return;
        }

        // Establish a database connection
        $connection = $this->db->getConnection();

        // Prepare the SQL query for updating the user
        $query = "UPDATE users SET firstname = ?, lastname = ?, email = ?, phone_no = ?, username = ? WHERE id = ?";
        $stmt = $connection->prepare($query);

        if ($stmt) {
            $stmt->bind_param("sssssi", $firstname, $lastname, $email, $phone_no, $username, $id);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                echo json_encode(['status' => 'success', 'message' => 'User updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update user or no changes made']);
            }

            $stmt->close();
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $connection->error]);
        }

        // Close the database connection
        $connection->close();
    }

    public function changePassword($id, $currentPassword, $newPassword) {
        // Validate input
        if (empty($id) || empty($currentPassword) || empty($newPassword)) {
            return json_encode(['success' => false, 'message' => 'Invalid input']);
        }

        // Establish database connection
        $connection = $this->db->getConnection();

        // Check if the current password is correct
        $query = "SELECT password FROM Users WHERE id = ?";
        $stmt = $connection->prepare($query);
        if ($stmt) {
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $stmt->store_result();
            $stmt->bind_result($hashedPassword);
            $stmt->fetch();

            // Verify current password
            if (!password_verify($currentPassword, $hashedPassword)) {
                $this->db->closeConnection($connection);
                return json_encode(['success' => false, 'message' => 'Current password is incorrect']);
            }

            // Update password
            $newHashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
            $updateQuery = "UPDATE Users SET password = ? WHERE id = ?";
            $updateStmt = $connection->prepare($updateQuery);
            $updateStmt->bind_param('si', $newHashedPassword, $id);
            $success = $updateStmt->execute();

            $this->db->closeConnection($connection);

            if ($success) {
                return json_encode(['success' => true, 'message' => 'Password changed successfully']);
            } else {
                return json_encode(['success' => false, 'message' => 'Failed to change password']);
            }
        } else {
            $this->db->closeConnection($connection);
            return json_encode(['success' => false, 'message' => 'Database error: ' . $connection->error]);
        }
    }
    public function logout() {
        session_start();

        // Log the logout action (optional)
        error_log("User logged out: " . session_id());

        // Unset all session variables
        $_SESSION = [];

        // If it's desired to kill the session, also delete the session cookie
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"], $params["secure"], $params["httponly"]
            );
        }

        // Destroy the session
        session_destroy();

        return json_encode(['message' => 'Logout successful']);
    }

    public function fetchForAttendant() {
        $connection = $this->db->getConnection(); // Get the DB connection
        $attendant_id = $_SESSION['id']; // Get the logged-in attendant's ID from session

        // Query to get the admin_username for the logged-in attendant
        $query = "SELECT admin_username FROM users WHERE id = ?";

        $stmt = $connection->prepare($query);
        $stmt->bind_param("i", $attendant_id); // 'i' for integer binding (attendant_id is an integer)
        $stmt->execute();
        $stmt->bind_result($admin_username);
        $stmt->fetch();
        $stmt->close();

        if ($admin_username) {
            // Query to get parents and attendants registered under the same admin_username
            $query = "
            SELECT id, username, role
            FROM users 
            WHERE (role = 'Parent' OR role = 'Attendant') 
            AND admin_username = ?;
        ";

            $stmt = $connection->prepare($query);
            $stmt->bind_param("s", $admin_username); // 's' for string binding (admin_username is a string)
            $stmt->execute();

            $result = $stmt->get_result();
            $users = array();

            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }

            // Return the results as a JSON response
            header('Content-Type: application/json');
            echo json_encode($users);

            $stmt->close();
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Admin not found for this attendant."]);
        }

        $connection->close();
    }

    public function fetchForParent() {
        $connection = $this->db->getConnection(); // Get the DB connection
        $parent_id = $_SESSION['id']; // Get the logged-in attendant's ID from session

        // Query to get the admin_username for the logged-in attendant
        $query = "SELECT admin_username FROM users WHERE id = ?";

        $stmt = $connection->prepare($query);
        $stmt->bind_param("i", $parent_id); // 'i' for integer binding (attendant_id is an integer)
        $stmt->execute();
        $stmt->bind_result($admin_username);
        $stmt->fetch();
        $stmt->close();

        if ($admin_username) {
            // Query to get parents and attendants registered under the same admin_username
            $query = "
            SELECT id, username, role
            FROM users 
            WHERE (role = 'Attendant') 
            AND admin_username = ?;
        ";

            $stmt = $connection->prepare($query);
            $stmt->bind_param("s", $admin_username); // 's' for string binding (admin_username is a string)
            $stmt->execute();

            $result = $stmt->get_result();
            $users = array();

            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }

            // Return the results as a JSON response
            header('Content-Type: application/json');
            echo json_encode($users);

            $stmt->close();
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Attendant not found for this parent."]);
        }

        $connection->close();
    }



}
