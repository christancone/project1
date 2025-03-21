<?php


namespace mishaf;

class DBConnector
{
    // Database connection parameters
    private $host = 'localhost';
    private $dbuser = 'root';
    private $dbpw = 'Satalan1925$';
    private $dbname = 'project';

    // Method to establish and return a database connection
    public function getConnection()
    {
        // Create a new mysqli instance with the connection parameters
        $con = new \mishaf\classes\mysqli($this->host, $this->dbuser, $this->dbpw, $this->dbname);

        // Check if the connection was successful
        if ($con->connect_error) {
            // If there's a connection error, terminate the script with an error message
            die('Connection failed: ' . $con->connect_error);
        }

        // Return the established connection
        return $con;
    }

    // Optional method to close the database connection
    public function closeConnection($con)
    {
        // Check if the connection is not null
        if ($con) {
            // Close the connection
            $con->close();
        }
    }
}

?>
