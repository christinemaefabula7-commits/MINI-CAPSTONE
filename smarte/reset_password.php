<?php
session_start();
require_once "db.php";

if (!isset($_SESSION["reset_email"])) {
    header("Location: index.php");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input_code = trim($_POST["code"] ?? "");
    $new_password = $_POST["password"] ?? "";
    $confirm_password = $_POST["confirm_password"] ?? "";

    if ($input_code != $_SESSION["reset_code"]) {
        echo "<script>alert('Mali ang verification code!');</script>";
    } elseif ($new_password !== $confirm_password) {
        echo "<script>alert('Hindi nagtutugma ang mga bagong password!');</script>";
    } else {
        $password_hash = password_hash($new_password, PASSWORD_DEFAULT);
        $email = $_SESSION["reset_email"];

        try {
            $stmt = $pdo->prepare("UPDATE users SET password_hash = ? WHERE email = ?");
            $stmt->execute([$password_hash, $email]);

            // Linisin ang session
            unset($_SESSION["reset_email"]);
            unset($_SESSION["reset_code"]);

            echo "<script>alert('Matagumpay na na-update ang password mo! Maaari ka na mag-log in.'); window.location.href='index.php';</script>";
            exit;
        } catch (PDOException $e) {
            echo "<script>alert('Error sa pag-update ng password.');</script>";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reset Password | SMART-E</title>
  <link rel="stylesheet" href="style.css">
</head>
<body style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #edf2e8;">
  <div class="modal-card" style="max-width: 420px; width: 100%; display: block; background: #fffef8; padding: 30px; border-radius: 16px;">
    <h2>Create New Password</h2>
    <p>Ilagay ang code na ibinigay at ang iyong bagong password.</p>
    <form method="POST">
      <label style="display:block; font-weight:800; margin-top:12px;">Verification Code
        <input type="text" name="code" placeholder="6-digit code" required style="width:100%; padding:11px; margin-top:4px; border:1.5px solid #ccc; border-radius:8px;">
      </label>
      <label style="display:block; font-weight:800; margin-top:12px;">New Password
        <input type="password" name="password" placeholder="Bagong password" required style="width:100%; padding:11px; margin-top:4px; border:1.5px solid #ccc; border-radius:8px;">
      </label>
      <label style="display:block; font-weight:800; margin-top:12px;">Confirm New Password
        <input type="password" name="confirm_password" placeholder="Ulitin ang bagong password" required style="width:100%; padding:11px; margin-top:4px; border:1.5px solid #ccc; border-radius:8px;">
      </label>
      <button type="submit" class="btn btn-primary full" style="margin-top:20px; width:100%;">Update Password</button>
    </form>
  </div>
</body>
</html>