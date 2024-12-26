<?php
// Include the database connection file
include('db_connect.php');

// Get the submitted username and password
$username = $_POST['username'];
$password = $_POST['password'];

// Prepare a SQL statement to prevent SQL injection
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

// Check if a user exists
if ($result->num_rows > 0) {
    session_start();
    $_SESSION['username'] = $username; // Save the username in a session
    echo "Login successful!";
    // Redirect to the desired page
    header("Location: index.html");
} else {
    echo "Invalid username or password.";
}

// Close the connection
$stmt->close();
$conn->close();
?>
