<?php
header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
// Allow specific methods (e.g., GET, POST)
header('Access-Control-Allow-Methods: GET, POST');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');

class DBConnector
{
    // Database connection parameters
    private $host = 'localhost';
    private $dbuser = 'root';
    private $dbpw = '';
    private $dbname = 'tinytoes';

    // Method to establish and return a database connection
    public function getConnection()
    {
        // Create a new mysqli instance with the connection parameters
        $con = new mysqli($this->host, $this->dbuser, $this->dbpw, $this->dbname);

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
