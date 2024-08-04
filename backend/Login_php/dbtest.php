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

//only my testing purpose

/*try{
    $db = new Database('tint_toy');
    $connection = $db->getConnection();
    if($connection){
        echo "databasse sucessful connected";
    }else 
    {
        echo "not database connected";
    }
}catch(Exception $e){
    echo $e->getMessage();
}*/







/*CREATE TABLE otp_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
?>


