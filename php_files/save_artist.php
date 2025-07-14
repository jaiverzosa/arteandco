<?php
// 🔥 Allow CORS requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Only proceed if POST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'connection.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $artistName = $_POST['artistName'];
    $price = $_POST['price'];
    $social = $_POST['social'];
    $username = $_POST['username'];

    // Handle image upload
    if (isset($_FILES['image'])) {
        $imageName = time() . '_' . basename($_FILES['image']['name']);
        $uploadDir = '../uploads/';
        $uploadPath = $uploadDir . $imageName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
            // Save to DB
            $stmt = $conn->prepare("INSERT INTO artist_profiles (title, artist_name, price, social_link, image_filename, username) 
            VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssss", $title, $artistName, $price, $social, $imageName, $username);

            if ($stmt->execute()) {
                echo "Success";
            } else {
                echo "Database error: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Image upload failed.";
        }
    } else {
        echo "No image uploaded.";
    }
} else {
    echo "Invalid request.";
}

$conn->close();
?>
