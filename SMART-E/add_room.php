
<?php

header("Content-Type: application/json; charset=UTF-8");

session_start();
require_once "db.php";

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);

    echo json_encode([
        "status" => "error",
        "message" => "POST request only."
    ]);

    exit;
}

// GET FORM DATA
$room_name = trim($_POST["room_name"] ?? "");
$location = trim($_POST["location"] ?? "");
$device_code = strtoupper(trim($_POST["device_code"] ?? ""));

$user_id = $_SESSION["user_id"] ?? null;

// VALIDATION
if (
    $room_name === "" ||
    $location === "" ||
    $device_code === ""
) {
    http_response_code(400);

    echo json_encode([
        "status" => "error",
        "message" => "All fields are required."
    ]);

    exit;
}

try {

    // START DATABASE TRANSACTION
    $pdo->beginTransaction();

    // FIND EXISTING DEVICE
    $stmt = $pdo->prepare("
        SELECT device_id, room_id, is_active
        FROM devices
        WHERE UPPER(TRIM(device_code)) = ?
        LIMIT 1
        FOR UPDATE
    ");

    $stmt->execute([$device_code]);

    $device = $stmt->fetch(PDO::FETCH_ASSOC);

    // DEVICE NOT FOUND
    if (!$device) {

        $pdo->rollBack();

        http_response_code(404);

        echo json_encode([
            "status" => "error",
            "message" => "SMART-E device is not registered in the database."
        ]);

        exit;
    }

    // CHECK EXISTING ROOM ASSIGNMENT
    if (
        $device["room_id"] !== null &&
        (int)$device["room_id"] !== 0
    ) {

        $roomCheck = $pdo->prepare("
            SELECT room_id
            FROM rooms
            WHERE room_id = ?
            AND is_active = 1
            LIMIT 1
        ");

        $roomCheck->execute([$device["room_id"]]);

        $existingRoom = $roomCheck->fetch(PDO::FETCH_ASSOC);

        if ($existingRoom) {

            $pdo->rollBack();

            http_response_code(409);

            echo json_encode([
                "status" => "error",
                "message" => "Device is already assigned to an active room."
            ]);

            exit;
        }
    }

    // INSERT NEW ROOM
    $insert = $pdo->prepare("
        INSERT INTO rooms (
            room_name,
            location,
            user_id,
            is_active
        )
        VALUES (?, ?, ?, 1)
    ");

    $insert->execute([
        $room_name,
        $location,
        $user_id
    ]);

    $room_id = $pdo->lastInsertId();

    // ASSIGN DEVICE TO NEW ROOM
    // Reactivate device if previously inactive.
    $update = $pdo->prepare("
        UPDATE devices
        SET
            room_id = ?,
            is_active = 1,
            status = 'OFFLINE'
        WHERE device_id = ?
    ");

    $update->execute([
        $room_id,
        $device["device_id"]
    ]);

    // COMMIT TRANSACTION
    $pdo->commit();

    http_response_code(200);

    echo json_encode([
        "status" => "success",
        "message" => "SMART-E Room registered successfully.",
        "room_id" => $room_id,
        "room_name" => $room_name,
        "location" => $location,
        "device_code" => $device_code
    ]);

} catch (PDOException $e) {

    // ROLLBACK IF DATABASE ERROR OCCURS
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    error_log("Add Room Error: " . $e->getMessage());

    http_response_code(500);

    echo json_encode([
        "status" => "error",
        "message" => "Failed to register room due to a database error."
    ]);
}

?>
