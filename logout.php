<?php
session_start();
session_destroy(); // Destruir la sesión actual
header("Location: login_register.html"); // Redirigir al inicio de sesión
exit();
?>
