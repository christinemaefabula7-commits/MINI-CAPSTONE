<?php
session_start();
require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"] ?? "");

    if (!empty($email)) {
        try {
            $stmt = $pdo->prepare("SELECT user_id, full_name FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if ($user) {
                // Gumawa ng 6-digit verification code
                $reset_code = rand(100000, 999999);
                
                // I-save sa session para ma-verify mamaya sa reset_password.php
                $_SESSION["reset_email"] = $email;
                $_SESSION["reset_code"] = $reset_code;

                // Para sa localhost testing, ilalagay natin ang code sa alert para makita mo agad, baby!
                echo "<script>
                    alert('Verification Code mo ay: " . $reset_code . "');
                    window.location.href='reset_password.php';
                </script>";
                exit;
            } else {
                echo "<script>alert('Walang rehistradong account sa email na yan.'); window.location.href='index.php';</script>";
                exit;
            }
        } catch (PDOException $e) {
            echo "<script>alert('Database error: " . $e->getMessage() . "'); window.location.href='index.php';</script>";
            exit;
        }
    }
}
?>