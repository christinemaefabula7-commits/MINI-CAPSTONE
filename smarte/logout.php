<?php
session_start();
session_unset();
session_destroy();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Logging out...</title>
</head>
<body>
  <script>
    // Burahin ang client-side sessions sa browser para hindi na bumalik sa dashboard view
    localStorage.removeItem('smarte_guest_session');
    sessionStorage.removeItem('smarte_guest_session');
    
    // I-redirect pabalik sa main portal/login screen
    window.location.href = 'index.php';
  </script>
</body>
</html>