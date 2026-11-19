<?php
header("Content-Type: application/json; charset=UTF-8");
session_start();
require_once "db.php";

try {
    // Kunin ang user_id ng kasalukuyang naka-log in
    $user_id = $_SESSION["user_id"] ?? null;

    // Kung guest user, maaari ring magpakita ng rooms o mag-empty depende sa session
    // Pero para sa registered user, kukunin natin ang rooms na nakakonekta sa kanila at sa devices table.
    $sql = "
        SELECT 
            d.device_code AS deviceId,
            r.room_name AS name,
            r.location AS location,
            d.status AS status,
            d.last_seen AS updatedAt,
            d.is_active AS isActive
        FROM rooms r
        INNER JOIN devices d ON r.room_id = d.room_id
        WHERE r.is_active = 1
    ";

    $params = [];
    if ($user_id) {
        $sql .= " AND r.user_id = ?";
        $params[] = $user_id;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rooms = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "rooms" => $rooms
    ]);

} catch (PDOException $e) {
    error_log("Get Rooms Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch rooms."
    ]);
}
?>