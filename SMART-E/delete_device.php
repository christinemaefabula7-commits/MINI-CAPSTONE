<?php
header("Content-Type: application/json");
session_start();
require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "POST method required."
    ]);
    exit;
}

$device_code = trim($_POST["device_code"] ?? "");

if ($device_code === "") {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid device code."
    ]);
    exit;
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        UPDATE devices
        SET is_active = 0,
            room_id = NULL,
            status = 'OFFLINE'
        WHERE device_code = ?
    ");
    $stmt->execute([$device_code]);

    if ($stmt->rowCount() === 0) {
        $pdo->rollBack();
        echo json_encode([
            "status" => "error",
            "message" => "Device not found."
        ]);
        exit;
    }

    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Device successfully removed."
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    error_log("SMART-E delete error: " . $e->getMessage());

    echo json_encode([
        "status" => "error",
        "message" => "Unable to remove device."
    ]);
}
?>