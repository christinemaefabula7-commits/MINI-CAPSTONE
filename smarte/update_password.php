<?php
session_start();
require_once "db.php";

if (!isset($_SESSION["user_id"])) {
    header("Location: index.php");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_SESSION["user_id"];
    $current_password = $_POST["current_password"] ?? "";
    $new_password = $_POST["new_password"] ?? "";
    $confirm_new_password = $_POST["confirm_new_password"] ?? "";

    if ($new_password !== $confirm_new_password) {
        echo "<script>alert('Hindi nagtutugma ang mga bagong password!'); window.location.href='index.php';</script>";
        exit;
    }

    try {
        // Kunin ang kasalukuyang password hash sa database
        $stmt = $pdo->prepare("SELECT password_hash FROM users WHERE user_id = ?");
        $stmt->execute([$user_id]);
        $user = $stmt->fetch();

        if ($user && password_verify($current_password, $user["password_hash"])) {
            $new_hash = password_hash($new_password, PASSWORD_DEFAULT);
            
            $update = $pdo->prepare("UPDATE users SET password_hash = ? WHERE user_id = ?");
            $update.execute([$new_hash, $user_id]);

            echo "<script>alert('Tagumpay na na-update ang iyong password!'); window.location.href='index.php';</script>";
            exit;
        } else {
            echo "<script>alert('Mali ang iyong kasalukuyang password.'); window.location.href='index.php';</script>";
            exit;
        }
    } catch (PDOException $e) {
        echo "<script>alert('Database error: " . $e->getMessage() . "'); window.location.href='index.php';</script>";
        exit;
    }
}
?>