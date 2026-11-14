
<?php
require_once "db.php";

$stmt = $pdo->query("
    SELECT
        n.notification_id,
        n.title,
        n.message,
        n.status,
        n.is_read,
        n.created_at,
        d.device_code,
        r.room_name
    FROM notifications n
    LEFT JOIN devices d ON n.device_id = d.device_id
    LEFT JOIN rooms r ON d.room_id = r.room_id
    ORDER BY n.created_at DESC
    LIMIT 100
");

$notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<h2>Notifications</h2>

<p>View your SMART-E notifications.</p>

<?php if (empty($notifications)): ?>

    <p>No notifications yet.</p>

<?php else: ?>

    <?php foreach ($notifications as $notification): ?>

        <div class="notification <?= $notification["is_read"] ? "read" : "unread" ?>">

            <h3><?= htmlspecialchars($notification["title"] ?? "") ?></h3>

            <p><?= htmlspecialchars($notification["message"] ?? "") ?></p>

            <small>
                Device: <?= htmlspecialchars($notification["device_code"] ?? "") ?><br>
                Room: <?= htmlspecialchars($notification["room_name"] ?? "") ?><br>
                <?= htmlspecialchars($notification["created_at"] ?? "") ?>
            </small>

        </div>

    <?php endforeach; ?>

<?php endif; ?>
