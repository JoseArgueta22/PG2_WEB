<?php
session_start();
require 'db_connection.php'; // Conexión a la base de datos

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];

    // Consultar el usuario en la base de datos
    $query = "SELECT * FROM usuarios WHERE nombre_usuario = '$username'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        // Verificar la contraseña
        if (password_verify($password, $row['contrasena'])) {
            $_SESSION['nombre_usuario'] = $row['nombre_usuario'];
            $_SESSION['nombre'] = $row['nombre'];
            echo "success";  //envio con exito
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "El nombre de usuario no existe.";
    }
}
?>
