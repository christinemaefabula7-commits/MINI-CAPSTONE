
<?php
session_start();
require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = trim($_POST["email"] ?? "");
    $password = $_POST["password"] ?? "";

    if (!empty($email) && !empty($password)) {

        try {

            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verify user credentials
            if ($user && password_verify($password, $user["password_hash"])) {

                // Regenerate session ID for security
                session_regenerate_id(true);

                // Store logged-in user information
                $_SESSION["user_id"] = $user["user_id"];
                $_SESSION["full_name"] = $user["full_name"];
                $_SESSION["email"] = $user["email"];

                // Redirect to dashboard
                header("Location: index.php");
                exit;

            } else {

                echo "<script>
                    alert('Mali ang email o password. Pakisubukan muli.');
                    window.location.href='index.php';
                </script>";
                exit;
            }

        } catch (PDOException $e) {

            error_log($e->getMessage());

            echo "<script>
                alert('May naganap na database error.');
                window.location.href='index.php';
            </script>";
            exit;
        }

    } else {

        echo "<script>
            alert('Mangyaring punan ang lahat ng field.');
            window.location.href='index.php';
        </script>";
        exit;
    }

} else {

    header("Location: index.php");
    exit;
}
?>
