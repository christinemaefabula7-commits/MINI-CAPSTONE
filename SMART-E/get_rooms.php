<?php
header("Content-Type: application/json");
session_start();
require_once "db.php";

$user_id = $_SESSION["user_id"] ?? null;

try {
    $sql = "
        SELECT
            d.device_code AS deviceId,
            r.room_name AS name,
            r.location AS location,
            d.status AS status,
            d.last_seen AS updatedAt
        FROM devices d
        INNER JOIN rooms r ON d.room_id = r.room_id
        WHERE d.is_active = 1 AND r.is_active = 1
    ";

    $params = [];

    // Kung naka-log in ang user, i-filter lamang sa mga rooms na ginawa niya.
    // Kung guest naman (walang user_id), pwede mong palabasing walang makikitang rooms o demo rooms lang.
    if ($user_id !== null) {
        $sql .= " AND r.user_id = ?";
        $params[] = $user_id;
    } else {
        // Opsyonal: Kung gusto mong walang makitang devices ang mga guest para secure:
        $sql .= " AND 1 = 0"; 
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rooms = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "rooms" => $rooms
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Unable to retrieve rooms."]);
}
?>