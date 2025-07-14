<?php
// Allow requests from frontend (React)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if ($password !== $confirm_password) {
        echo "Passwords do not match.";
        exit;
    }

    // Check if username already exists
    $check_stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $check_stmt->bind_param("s", $username);
    $check_stmt->execute();
    $check_stmt->store_result();

    if ($check_stmt->num_rows > 0) {
        echo "Username already taken.";
        $check_stmt->close();
        $conn->close();
        exit;
    }

    // Insert user
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $insert_stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $insert_stmt->bind_param("ss", $username, $hashed_password);

    if ($insert_stmt->execute()) {
        echo "User created successfully.";
    } else {
        echo "Error: " . $insert_stmt->error;
    }

    $check_stmt->close();
    $insert_stmt->close();
    $conn->close();
}
?>
