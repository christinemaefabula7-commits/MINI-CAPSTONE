
<?php
header("Content-Type: application/json; charset=UTF-8");
session_start();
require_once "db.php";

try {

    // Get the currently logged-in user's ID
    $user_id = $_SESSION["user_id"] ?? null;

    // Guest users should not access private reports
    if (!$user_id) {
        echo json_encode([
            "status" => "success",
            "reports" => []
        ]);
        exit;
    }

    // Retrieve reports belonging only to the logged-in user
    $stmt = $pdo->prepare("
        SELECT
            ml.recorded_at AS createdAt,
            d.device_code AS deviceId,
            r.room_name AS room,
            CONCAT(
                'Motion: ',
                IF(ml.motion_detected, 'Detected', 'None'),
                ' | Light: ',
                IF(ml.light_detected, 'ON', 'OFF')
            ) AS event,
            ml.status AS status
        FROM monitoring_logs ml
        INNER JOIN devices d
            ON ml.device_id = d.device_id
        INNER JOIN rooms r
            ON d.room_id = r.room_id
        WHERE r.user_id = ?
        ORDER BY ml.recorded_at DESC
        LIMIT 100
    ");

    $stmt->execute([$user_id]);

    $reports = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "reports" => $reports
    ]);

} catch (PDOException $e) {

    error_log("Get Reports Error: " . $e->getMessage());

    http_response_code(500);

    echo json_encode([
        "status" => "error",
        "message" => "Failed to retrieve reports."
    ]);
}
?>
