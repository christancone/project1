<?php
header('Content-Type: application/json');

// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
// Allow specific methods (e.g., GET, POST)
header('Access-Control-Allow-Methods: GET, POST');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');

// Database connection parameters
$host = 'localhost';
$dbuser = 'root';
$dbpw = '';
$dbname = 'tinytoes';

// Create a new mysqli instance with the connection parameters
$con = new mysqli($host, $dbuser, $dbpw, $dbname);

// Check if the connection was successful
if ($con->connect_error) {
    die('Connection failed: ' . $con->connect_error);
}

// SQL query to fetch the counts of each medical condition
$query = "
    SELECT 
        medical_info, 
        COUNT(*) as count
    FROM 
        children
    GROUP BY 
        medical_info
";

// Execute the query
$result = $con->query($query);

// Check if the query was successful
if (!$result) {
    die('Query failed: ' . $con->error);
}

// Initialize an array to hold the data
$data = [];

// Fetch data and populate the array
while ($row = $result->fetch_assoc()) {
    $data[$row['medical_info']] = (int)$row['count'];
}

// Handle 'Others' category
$allConditions = ['Fever', 'Asthma', 'Diabetes', 'None'];
foreach ($data as $condition => $count) {
    if (!in_array($condition, $allConditions)) {
        $data['Others'] = ($data['Others'] ?? 0) + $count;
        unset($data[$condition]);
    }
}

// Ensure all conditions are present
foreach ($allConditions as $condition) {
    if (!isset($data[$condition])) {
        $data[$condition] = 0;
    }
}

// Close the database connection
$con->close();

// Output the data as JSON
echo json_encode($data);
?>
