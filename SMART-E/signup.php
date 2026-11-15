<?php
session_start();
require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = trim($_POST["full_name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $password = $_POST["password"] ?? "";
    $confirm_password = $_POST["confirm_password"] ?? "";

    if (empty($full_name) || empty($email) || empty($password)) {
        echo "<script>alert('Lahat ng field ay kinakailangan.'); window.location.href='index.php';</script>";
        exit;
    }

    if ($password !== $confirm_password) {
        echo "<script>alert('Hindi nagtutugma ang mga password!'); window.location.href='index.php';</script>";
        exit;
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    try {
        $check = $pdo->prepare("SELECT user_id FROM users WHERE email = ?");
        $check->execute([$email]);
        if ($check->rowCount() > 0) {
            echo "<script>alert('Nakarehistro na ang email na ito.'); window.location.href='index.php';</script>";
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)");
        $stmt->execute([$full_name, $email, $password_hash]);

        echo "<script>alert('Matagumpay na nakagawa ng account! Mangyaring mag-log in.'); window.location.href='index.php';</script>";
        exit;
    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo "<script>alert('May naganap na error sa database.'); window.location.href='index.php';</script>";
        exit;
    }
} else {
    // Kapag direktang pinuntahan ang signup.php, ibalik agad sa index.php
    header("Location: index.php");
    exit;
}
?>