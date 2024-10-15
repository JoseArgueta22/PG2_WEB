<?php
// Datos para la conexión a la base de datos en InfinityFree
$servername = "sql103.infinityfree.com"; // Hostname
$username = "if0_37508319";              // MySQL Username
$password = "Tz2lmFVTfYiKF9v";            // MySQL Password
$dbname = "if0_37508319_plataforma_web"; // MySQL Database Name

// Crear la conexión
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Verificar la conexión
if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}

echo "Conexión exitosa"; // Mensaje de éxito
?>
