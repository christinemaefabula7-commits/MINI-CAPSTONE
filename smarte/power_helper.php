<?php
// Gumagawa ng devices.power_enabled column kung wala pa (1 = ON, 0 = STANDBY/OFF)
function ensurePowerColumn(PDO $pdo) {
    try {
        $check = $pdo->query("SHOW COLUMNS FROM devices LIKE 'power_enabled'");
        if ($check && $check->rowCount() === 0) {
            $pdo->exec("ALTER TABLE devices ADD COLUMN power_enabled TINYINT(1) NOT NULL DEFAULT 1");
        }
    } catch (PDOException $e) {
        error_log("SMART-E ensurePowerColumn Error: " . $e->getMessage());
    }
}
?>