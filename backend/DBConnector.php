<?php

class DBConnector
{
    private $host = 'localhost';
    private $dbuser = 'root';
    private $dbpw = '';
    private $dbname = 'test';

    public function getConnection()
    {
        $con = new mysqli($this->host, $this->dbuser, $this->dbpw, $this->dbname);

        if ($con->connect_error) {
            die('Connection failed: ' . $con->connect_error);
        }

        return $con;
    }
}

?>
