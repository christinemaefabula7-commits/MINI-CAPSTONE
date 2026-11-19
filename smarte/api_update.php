<?php
header("Content-Type: application/json; charset=UTF-8");

require_once "db.php";
require_once "power_helper.php";

date_default_timezone_set("Asia/Manila");

// ========================================
// RESPONSE HELPER
// ========================================
function sendResponse($httpCode, $data) {
    http_response_code($httpCode);
    echo json_encode($data);
    exit;
}

ensurePowerColumn($pdo);

// ========================================
// ALLOW POST ONLY
// ========================================
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    sendResponse(405, [
        "status" => "error",
        "message" => "Method not allowed. Use POST."
    ]);
}

// ========================================
// RECEIVE ESP32 DATA
// ========================================
$device_code = strtoupper(trim($_POST["device_code"] ?? ""));

$motion_detected = filter_var($_POST["motion_detected"] ?? null, FILTER_VALIDATE_INT);
$light_detected  = filter_var($_POST["light_detected"] ?? null, FILTER_VALIDATE_INT);

// DEBUG: makikita sa C:\xampp\apache\logs\error.log kung ano talaga ang pinapadala ng ESP32
error_log("SMART-E RX => device={$device_code} motion=" . var_export($_POST["motion_detected"] ?? null, true)
    . " light=" . var_export($_POST["light_detected"] ?? null, true));

// ========================================
// VALIDATION
// ========================================
if ($device_code === "") {
    sendResponse(400, [
        "status" => "error",
        "message" => "Missing device code."
    ]);
}

// ========================================
// STEP 1: UPDATE DEVICE STATUS (ito ang priority)
// ========================================
try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        SELECT
            d.device_id,
            d.device_code,
            d.room_id,
            d.status AS previous_status,
            d.last_seen,
            d.power_enabled,
            r.room_name,
            r.user_id
        FROM devices d
        LEFT JOIN rooms r
            ON d.room_id = r.room_id
        WHERE UPPER(d.device_code) = ?
          AND d.is_active = 1
        LIMIT 1
        FOR UPDATE
    ");

    $stmt->execute([$device_code]);
    $device = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$device) {
        $pdo->rollBack();
        sendResponse(404, [
            "status" => "error",
            "message" => "Device not found or inactive.",
            "device_code" => $device_code
        ]);
    }

    if (empty($device["room_id"]) || empty($device["room_name"])) {
        $pdo->rollBack();
        sendResponse(409, [
            "status" => "error",
            "message" => "Device is registered but not assigned to a room.",
            "device_code" => $device_code
        ]);
    }

    $device_id       = (int)$device["device_id"];
    $power_enabled   = (int)$device["power_enabled"];

    // ========================================
    // POWER SWITCH: kapag naka-OFF (standby) sa dashboard
    // - hindi gagalawin ang status, walang log, walang alert
    // - last_seen lang ang ina-update para hindi lumabas na offline
    // - ibabalik ang "power": 0 para malaman ng ESP32 na dapat siyang matulog
    // ========================================
    if ($power_enabled === 0) {
        $hb = $pdo->prepare("UPDATE devices SET last_seen = NOW() WHERE device_id = ?");
        $hb->execute([$device_id]);
        $pdo->commit();

        sendResponse(200, [
            "status" => "success",
            "device_code" => $device_code,
            "power" => 0,
            "standby" => true,
            "message" => "Device is switched OFF (standby) from the dashboard."
        ]);
    }

if (
    !in_array($motion_detected, [0, 1], true) ||
    !in_array($light_detected, [0, 1], true)
) {
    $pdo->rollBack();
    sendResponse(400, [
        "status" => "error",
        "message" => "Invalid sensor values. Use 0 or 1."
    ]);
}

// ========================================
// DETERMINE ROOM STATUS
// ========================================
// Motion = 1                -> OCCUPIED
// Motion = 0 AND Light = 1  -> ALERT (Unnecessary energy usage)
// Motion = 0 AND Light = 0  -> VACANT
if ($motion_detected === 1) {
    $new_status = "OCCUPIED";
} elseif ($light_detected === 1) {
    $new_status = "ALERT";
} else {
    $new_status = "VACANT";
}


    $previous_status = $device["previous_status"];
    $room_name       = $device["room_name"];
    $user_id         = $device["user_id"];

    $status_changed = ($previous_status !== $new_status);

    $update = $pdo->prepare("
        UPDATE devices
        SET
            status = ?,
            last_seen = NOW(),
            updated_at = NOW()
        WHERE device_id = ?
    ");
    $update->execute([$new_status, $device_id]);

    // I-commit agad para kahit pumalya ang log/notification, ma-save pa rin ang status
    $pdo->commit();

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log("SMART-E API [devices update] Error: " . $e->getMessage());
    sendResponse(500, [
        "status" => "error",
        "message" => "Database operation failed."
    ]);
}

// ========================================
// STEP 2: MONITORING LOG (para sa Reports)
// Hiwalay na try/catch para hindi mawala ang status update kapag may problema sa table
// ========================================
$log_saved = false;
if ($status_changed) {
    try {
        $log = $pdo->prepare("
            INSERT INTO monitoring_logs
            (device_id, motion_detected, light_detected, status, recorded_at)
            VALUES (?, ?, ?, ?, NOW())
        ");
        $log->execute([$device_id, $motion_detected, $light_detected, $new_status]);
        $log_saved = true;
    } catch (PDOException $e) {
        // Kapag ito ang lumabas sa error.log, kulang ang ENUM/column ng monitoring_logs.status
        error_log("SMART-E API [monitoring_logs insert] Error: " . $e->getMessage());
    }
}

// ========================================
// STEP 3: ALERT NOTIFICATION
// Isang beses lang kapag PUMASOK sa ALERT (hindi bawat transmit)
// ========================================
$notif_saved = false;
if ($new_status === "ALERT" && $status_changed && $user_id !== null) {
    try {
        $notif = $pdo->prepare("
            INSERT INTO notifications
            (user_id, device_id, title, message, status, is_read, created_at)
            VALUES (?, ?, ?, ?, 'ALERT', 0, NOW())
        ");
        $notif->execute([
            $user_id,
            $device_id,
            "Unnecessary Energy Consumption Detected!",
            "Light is ON while " . $room_name . " is vacant. Please check the area and turn off the light to save energy."
        ]);
        $notif_saved = true;
    } catch (PDOException $e) {
        error_log("SMART-E API [notifications insert] Error: " . $e->getMessage());
    }
}

sendResponse(200, [
    "status" => "success",
    "device_code" => $device_code,
    "power" => 1,
    "received" => ["motion" => $motion_detected, "light" => $light_detected],
    "recorded_status" => $new_status,
    "previous_status" => $previous_status,
    "status_changed" => $status_changed,
    "log_saved" => $log_saved,
    "notification_saved" => $notif_saved,
    "message" => "SMART-E device successfully updated."
]);
?>