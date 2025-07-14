<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'connection.php';

// Parse the JSON body
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;
$username = $data['username'] ?? null;

// Validate inputs
if (!$id || !$username) {
  echo "Missing ID or username.";
  exit;
}

// Delete only if the username matches the owner of the artwork
$stmt = $conn->prepare("DELETE FROM artist_profiles WHERE id = ? AND username = ?");
$stmt->bind_param("is", $id, $username);

if ($stmt->execute()) {
  if ($stmt->affected_rows > 0) {
    echo "Deleted";
  } else {
    echo "You are not allowed to delete this post.";
  }
} else {
  echo "Error deleting.";
}

$stmt->close();
$conn->close();
?>
