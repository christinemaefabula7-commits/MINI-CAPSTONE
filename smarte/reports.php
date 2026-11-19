
<?php
require_once "db.php";

$stmt = $pdo->query("
    SELECT
        ml.recorded_at,
        d.device_code,
        r.room_name,
        r.location,
        ml.motion_detected,
        ml.light_detected,
        ml.status
    FROM monitoring_logs ml
    LEFT JOIN devices d ON ml.device_id = d.device_id
    LEFT JOIN rooms r ON d.room_id = r.room_id
    ORDER BY ml.recorded_at DESC
    LIMIT 500
");

$reports = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<h2>Monitoring Reports</h2>

<p>Review recorded SMART-E monitoring events.</p>

<a href="export_reports.php" class="btn">Export CSV</a>

<table>
    <thead>
        <tr>
            <th>Date & Time</th>
            <th>Device</th>
            <th>Room</th>
            <th>Location</th>
            <th>Motion</th>
            <th>Light</th>
            <th>Status</th>
        </tr>
    </thead>

    <tbody>
        <?php if (empty($reports)): ?>
            <tr>
                <td colspan="7">No monitoring events recorded yet.</td>
            </tr>
        <?php else: ?>

            <?php foreach ($reports as $report): ?>
                <tr>
                    <td><?= htmlspecialchars($report["recorded_at"] ?? "") ?></td>
                    <td><?= htmlspecialchars($report["device_code"] ?? "") ?></td>
                    <td><?= htmlspecialchars($report["room_name"] ?? "") ?></td>
                    <td><?= htmlspecialchars($report["location"] ?? "") ?></td>
                    <td><?= $report["motion_detected"] ? "Detected" : "None" ?></td>
                    <td><?= $report["light_detected"] ? "ON" : "OFF" ?></td>
                    <td><?= htmlspecialchars($report["status"] ?? "") ?></td>
                </tr>
            <?php endforeach; ?>

        <?php endif; ?>
    </tbody>
</table>
