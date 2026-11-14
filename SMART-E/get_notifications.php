
<?php
header("Content-Type: application/json; charset=UTF-8");
session_start();
require_once "db.php";

try {

    // Guest users should not access private notifications
    $user_id = $_SESSION["user_id"] ?? null;

    if (!$user_id) {
        echo json_encode([
            "status" => "success",
            "notifications" => []
        ]);
        exit;
    }

    $stmt = $pdo->prepare("
        SELECT
            n.notification_id AS id,
            n.title,
            n.message,
            n.status AS type,
            n.is_read,
            n.created_at AS createdAt,
            d.device_code AS deviceId,
            r.room_name AS room
        FROM notifications n
        LEFT JOIN devices d ON n.device_id = d.device_id
        LEFT JOIN rooms r ON d.room_id = r.room_id
        WHERE n.user_id = ?
        ORDER BY n.created_at DESC
        LIMIT 50
    ");

    $stmt->execute([$user_id]);

    $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "notifications" => $notifications
    ]);

} catch (PDOException $e) {

    error_log("Get Notifications Error: " . $e->getMessage());

    http_response_code(500);

    echo json_encode([
        "status" => "error",
        "message" => "Failed to retrieve notifications."
    ]);
}
?>
