<?php

class Database {

    private $host = "localhost";
    private $username = "root";
    private $password = "Satalan1925$";
    private $dbname = "tint_toy";
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

// CREATE TABLE temporary_otp (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     email VARCHAR(255) NOT NULL,
//     otp INT NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE temporary_otp (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     first_name VARCHAR(255) NOT NULL,
//     last_name VARCHAR(255) NOT NULL,
//     phone_no VARCHAR(20),
//     address TEXT,
//     otp INT NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );


// SELECT * FROM temporary_otp;

// DESCRIBE temporary_otp;
// SELECT * FROM main_user_table;

// TRUNCATE TABLE temporary_otp;
// TRUNCATE TABLE main_user_table;
?>


