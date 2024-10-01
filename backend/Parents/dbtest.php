<?php

class Database {

    private $host = "localhost";
    private $username = "root";
    private $password = "Satalan1925$";
    private $dbname = "project";
    private $conn;

    public function __construct($dbname) {
        $this->dbname = $dbname; 
        $this->connect();
    }

    private function connect() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->dbname);

        if ($this->conn->connect_error) {
            throw new Exception("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function getConnection() {
       
      
            return $this->conn;
      
    }
}


// SELECT * FROM temporary_otp;

// DESCRIBE temporary_otp;
// SELECT * FROM main_user_table;

// TRUNCATE TABLE temporary_otp;
// TRUNCATE TABLE main_user_table;


// -- Table for storing user information

// CREATE TABLE temporary_otp (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     first_name VARCHAR(100),
//     last_name VARCHAR(100),
//     phone_no VARCHAR(20),
//     address TEXT,
//     email VARCHAR(255) UNIQUE,
//     password VARCHAR(255),
//     otp INT
// );

// CREATE TABLE main_user_table (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     first_name VARCHAR(100),
//     last_name VARCHAR(100),
//     phone_no VARCHAR(20),
//     address TEXT,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
?>


