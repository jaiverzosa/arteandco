<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'connection.php';

$sql = "SELECT id, title, artist_name, price, social_link, image_filename, username FROM artist_profiles ORDER BY id DESC";
$result = $conn->query($sql);

$artists = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $artists[] = $row;
    }
}

echo json_encode($artists);
$conn->close();
?>
