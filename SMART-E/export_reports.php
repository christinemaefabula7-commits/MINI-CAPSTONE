
<?php
require_once "db.php";

date_default_timezone_set("Asia/Manila");

try {

    $device_code = trim($_GET["device_code"] ?? "");

    $sql = "
        SELECT
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

        LEFT JOIN rooms r
            ON d.room_id = r.room_id

        WHERE 1 = 1
    ";

    $params = [];

    if ($device_code !== "") {
        $sql .= " AND d.device_code = ?";
        $params[] = $device_code;
    }

    $sql .= " ORDER BY ml.recorded_at DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    // CSV download headers
    header("Content-Type: text/csv; charset=UTF-8");
    header(
        'Content-Disposition: attachment; filename="SMART-E_Monitoring_Report_' .
        date("Y-m-d_H-i-s") . '.csv"'
    );

    header("Pragma: no-cache");
    header("Expires: 0");

    $output = fopen("php://output", "w");

    // UTF-8 BOM for Excel compatibility
    fwrite($output, "\xEF\xBB\xBF");

    // CSV headings
    fputcsv($output, [
        "Date & Time",
        "SMART-E Unit",
        "Device Name",
        "Room",
        "Location",
        "Motion Detected",
        "Light Detected",
        "Status"
    ]);

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        fputcsv($output, [
            $row["recorded_at"],
            $row["device_code"],
            $row["device_name"],
            $row["room_name"],
            $row["location"],
            $row["motion_detected"],
            $row["light_detected"],
            $row["status"]
        ]);
    }

    fclose($output);
    exit;

} catch (PDOException $e) {

    error_log("SMART-E CSV Export Error: " . $e->getMessage());

    http_response_code(500);
    echo "Unable to export monitoring reports.";
}
?>
