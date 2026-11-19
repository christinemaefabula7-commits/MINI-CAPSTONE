<?php
// SMART-E: Power switch endpoint (GET = power states, POST = i-ON / i-OFF ang device)
// Laging JSON ang isasagot, kahit may PHP error.
ini_set("display_errors", "0");
ob_start();

function out($code, $data) {
    if (ob_get_length()) { ob_clean(); }
    http_response_code($code);
    header("Content-Type: application/json; charset=UTF-8");
    header("Cache-Control: no-store");
    echo json_encode($data);
    exit;
}

// Saluhin ang lahat ng error para JSON pa rin ang lalabas
set_exception_handler(function ($e) {
    error_log("SMART-E device_power Exception: " . $e->getMessage());
    out(500, ["status" => "error", "message" => "Server error: " . $e->getMessage()]);
});

register_shutdown_function(function () {
    $err = error_get_last();
    if ($err && in_array($err["type"], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        error_log("SMART-E device_power Fatal: " . $err["message"]);
        out(500, ["status" => "error", "message" => "Server error: " . $err["message"]]);
    }
});

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

require_once __DIR__ . "/db.php";
require_once __DIR__ . "/power_helper.php";

date_default_timezone_set("Asia/Manila");

ensurePowerColumn($pdo);

$user_id = $_SESSION["user_id"] ?? null;

// ---------- GET: ibalik ang power state ng lahat ng device ----------
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if ($user_id !== null) {
        $stmt = $pdo->prepare("
            SELECT d.device_code, d.power_enabled
            FROM devices d
            LEFT JOIN rooms r ON d.room_id = r.room_id
            WHERE d.is_active = 1 AND (r.user_id = ? OR r.user_id IS NULL)
        ");
        $stmt->execute([$user_id]);
    } else {
        $stmt = $pdo->query("SELECT device_code, power_enabled FROM devices WHERE is_active = 1");
    }

    $devices = [];
    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
        $devices[] = [
            "deviceId" => $row["device_code"],
            "power"    => (int)$row["power_enabled"]
        ];
    }
    out(200, ["status" => "success", "devices" => $devices]);
}

// ---------- POST: i-ON / i-OFF ang device ----------
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    out(405, ["status" => "error", "message" => "Method not allowed."]);
}

$device_code = strtoupper(trim($_POST["device_code"] ?? ""));
$power = filter_var($_POST["power"] ?? null, FILTER_VALIDATE_INT);

if ($device_code === "" || !in_array($power, [0, 1], true)) {
    out(400, ["status" => "error", "message" => "Invalid request."]);
}

// Hanapin muna ang device at ang may-ari ng room
$find = $pdo->prepare("
    SELECT d.device_id, r.user_id
    FROM devices d
    LEFT JOIN rooms r ON d.room_id = r.room_id
    WHERE UPPER(d.device_code) = ? AND d.is_active = 1
    LIMIT 1
");
$find->execute([$device_code]);
$device = $find->fetch(PDO::FETCH_ASSOC);

if (!$device) {
    out(404, ["status" => "error", "message" => "Device not found."]);
}

// Kapag naka-login at may ibang may-ari ang room, bawal
if ($user_id !== null && $device["user_id"] !== null && (string)$device["user_id"] !== (string)$user_id) {
    out(403, ["status" => "error", "message" => "You are not allowed to control this device."]);
}

$update = $pdo->prepare("UPDATE devices SET power_enabled = ? WHERE device_id = ?");
$update->execute([$power, (int)$device["device_id"]]);

out(200, [
    "status" => "success",
    "device_code" => $device_code,
    "power" => $power,
    "message" => $power === 1 ? "Device turned ON." : "Device set to standby (OFF)."
]);