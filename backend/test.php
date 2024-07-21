<?php
// Include necessary files
include 'DBConnector.php';
include 'User.php';

// Create a new DBConnector object and get the connection
$dbConnector = new DBConnector();
$conn = $dbConnector->getConnection();

// Example to create a User object using named parameters
$user = new User($conn, [
    'name' => 'christan',
    'email' => 'christan@gmail.com',
    'password' => password_hash('securepassword', PASSWORD_DEFAULT),
    'role' => 'user'
]);

// Example to add a new user
if ($user->addUser()) {
    echo "User added successfully.";
} else {
    echo "Failed to add user.";
}

$users[] = $user ->getAllUsers();
print_r($users);


