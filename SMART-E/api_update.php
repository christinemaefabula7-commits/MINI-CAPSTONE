
<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "db.php";

date_default_timezone_set("Asia/Manila");

// ALLOW POST ONLY
if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "status" => "error",
        "message" => "Method not allowed."
    ]);

    exit;
}

// RECEIVE ESP32 DATA
$device_code = strtoupper(trim($_POST["device_code"] ?? ""));

$motion_detected = filter_var(
    $_POST["motion_detected"] ?? null,
    FILTER_VALIDATE_INT
);

$light_detected = filter_var(
    $_POST["light_detected"] ?? null,
    FILTER_VALIDATE_INT
);

// VALIDATE DEVICE CODE
if ($device_code === "") {

    http_response_code(400);

    echo json_encode([
        "status" => "error",
        "message" => "Missing device code."
    ]);

    exit;
}

// VALIDATE SENSOR VALUES
if (
    !in_array($motion_detected, [0, 1], true) ||
    !in_array($light_detected, [0, 1], true)
) {

    http_response_code(400);

    echo json_encode([
        "status" => "error",
        "message" => "Invalid sensor values."
    ]);

    exit;
}

// DETERMINE ROOM STATUS
if ($motion_detected === 1) {

    $new_status = "OCCUPIED";

} elseif ($light_detected === 1) {

    $new_status = "ALERT";

} else {

    $new_status = "VACANT";
}

try {

    // START TRANSACTION
    $pdo->beginTransaction();

    // FIND REGISTERED DEVICE AND ASSIGNED ROOM
    $stmt = $pdo->prepare("
        SELECT
            d.device_id,
            d.device_code,
            d.status AS previous_status,
            d.last_seen,
            r.room_name,
            r.user_id
        FROM devices d
        INNER JOIN rooms r
            ON d.room_id = r.room_id
        WHERE UPPER(TRIM(d.device_code)) = ?
          AND d.is_active = 1
          AND r.is_active = 1
        LIMIT 1
        FOR UPDATE
    ");

    $stmt->execute([$device_code]);

    $device = $stmt->fetch(PDO::FETCH_ASSOC);

    // DEVICE OR ROOM NOT FOUND
    if (!$device) {

        $pdo->rollBack();

        http_response_code(404);

        echo json_encode([
            "status" => "error",
            "message" => "Device or assigned room not found."
        ]);

        exit;
    }

    $device_id = (int)$device["device_id"];

    $previous_status = $device["previous_status"];

    $room_name = $device["room_name"];

    $user_id = $device["user_id"];

    $previous_last_seen = $device["last_seen"];

    // CHECK DEVICE RECONNECTION
    $reconnected = false;

    if ($previous_last_seen !== null) {

        $last_seen_time = strtotime($previous_last_seen);

        if (
            $last_seen_time !== false &&
            (time() - $last_seen_time) > 15
        ) {
            $reconnected = true;
        }
    }

    // UPDATE DEVICE STATUS AND HEARTBEAT
    $update = $pdo->prepare("
        UPDATE devices
        SET
            status = ?,
            last_seen = NOW(),
            updated_at = NOW()
        WHERE device_id = ?
    ");

    $update->execute([
        $new_status,
        $device_id
    ]);

    // CHECK STATUS CHANGE
    $status_changed = ($previous_status !== $new_status);

    // RECORD STATUS CHANGE
    if ($status_changed) {

        $log = $pdo->prepare("
            INSERT INTO monitoring_logs
            (
                device_id,
                motion_detected,
                light_detected,
                status,
                recorded_at
            )
            VALUES (?, ?, ?, ?, NOW())
        ");

        $log->execute([
            $device_id,
            $motion_detected,
            $light_detected,
            $new_status
        ]);
    }

    // NOTIFICATION TRACKING
    $notification_created = false;

    // ALERT NOTIFICATION
    if (
        $new_status === "ALERT" &&
        $previous_status !== "ALERT" &&
        $user_id !== null
    ) {

        $notif = $pdo->prepare("
            INSERT INTO notifications
            (
                user_id,
                device_id,
                title,
                message,
                status,
                is_read,
                created_at
            )
            VALUES (?, ?, ?, ?, 'ALERT', 0, NOW())
        ");

        $notif->execute([
            $user_id,
            $device_id,
            "Unnecessary Energy Consumption Detected!",
            "Light is ON while " . $room_name .
            " is vacant. Please check the area and turn off " .
            "the light to save energy."
        ]);

        $notification_created = true;
    }

    // DEVICE RECONNECTION NOTIFICATION
    if (
        $reconnected &&
        $user_id !== null
    ) {

        $notif = $pdo->prepare("
            INSERT INTO notifications
            (
                user_id,
                device_id,
                title,
                message,
                status,
                is_read,
                created_at
            )
            VALUES (?, ?, ?, ?, 'INFO', 0, NOW())
        ");

        $notif->execute([
            $user_id,
            $device_id,
            "SMART-E Device Reconnected",
            "SMART-E device " . $device_code .
            " in " . $room_name .
            " has reconnected successfully. " .
            "Connection restored at " . date("h:i A") . "."
        ]);

        $notification_created = true;
    }

    // COMMIT TRANSACTION
    $pdo->commit();

    // SUCCESS RESPONSE
    echo json_encode([
        "status" => "success",
        "device_code" => $device_code,
        "recorded_status" => $new_status,
        "previous_status" => $previous_status,
        "status_changed" => $status_changed,
        "reconnected" => $reconnected,
        "event_recorded" => $status_changed,
        "notification_created" => $notification_created,
        "motion_detected" => $motion_detected,
        "light_detected" => $light_detected,
        "message" => "SMART-E device successfully updated."
    ]);

} catch (PDOException $e) {

    // ROLLBACK ON DATABASE ERROR
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    error_log("SMART-E API Error: " . $e->getMessage());

    http_response_code(500);

    echo json_encode([
        "status" => "error",
        "message" => "Database operation failed."
    ]);
}

?>
