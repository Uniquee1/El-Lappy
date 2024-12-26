<?php
// Database credentials
$host = "sql207.byetcluster.com";  // Your database host
$dbname = "if0_37983038_Ellappy_db";  // Your database name
$username = "if0_37983038";  // Replace with your actual username
$password = "Infinitypass18";  // Replace with your actual password

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
