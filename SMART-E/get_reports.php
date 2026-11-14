
<?php
header("Content-Type: application/json; charset=UTF-8");
session_start();
require_once "db.php";

try {

    // Get the currently logged-in user's ID
    $user_id = $_SESSION["user_id"] ?? null;

    // Guest users cannot access private monitoring reports
    if (!$user_id) {
        echo json_encode([
            "status" => "success",
            "count" => 0,
            "reports" => []
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Optional filters
    $device_code = trim($_GET["device_code"] ?? "");
    $limit = intval($_GET["limit"] ?? 100);

    // Limit allowed results
    if ($limit < 1) {
        $limit = 100;
    }

    if ($limit > 500) {
        $limit = 500;
    }

    $sql = "
        SELECT
            ml.log_id,
            ml.recorded_at,
            d.device_code,
            d.device_name,
            r.room_name,
            r.location,
            ml.motion_detected,
            ml.light_detected,
            ml.status

        FROM monitoring_logs ml

        INNER JOIN devices d
            ON ml.device_id = d.device_id

        INNER JOIN rooms r
            ON d.room_id = r.room_id

        WHERE r.user_id = ?
    ";

    $params = [$user_id];

    // Optional device code filter
    if ($device_code !== "") {
        $sql .= " AND d.device_code = ?";
        $params[] = $device_code;
    }

    $sql .= "
        ORDER BY ml.recorded_at DESC
        LIMIT " . $limit;

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    $reports = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "count" => count($reports),
        "reports" => $reports
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    error_log("SMART-E Reports Error: " . $e->getMessage());

    echo json_encode([
        "status" => "error",
        "message" => "Unable to retrieve monitoring reports."
    ], JSON_UNESCAPED_UNICODE);
}
?>
