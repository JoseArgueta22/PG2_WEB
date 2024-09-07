<?php
require 'db_connection.php'; // Conexión a la base de datos

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $nombre = mysqli_real_escape_string($conn, $_POST['nombre']);
    $apellido = mysqli_real_escape_string($conn, $_POST['apellido']);
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hashear la contraseña
    $edad = mysqli_real_escape_string($conn, $_POST['edad']);

    // Verificar si el nombre de usuario ya existe
    $check_query = "SELECT * FROM usuarios WHERE nombre_usuario = '$username'";
    $result = mysqli_query($conn, $check_query);

    if (mysqli_num_rows($result) > 0) {
        echo "El nombre de usuario ya está en uso.";
    } else {
        // Insertar el nuevo usuario en la base de datos
        $query = "INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasena, edad) VALUES ('$nombre', '$apellido', '$username', '$password', '$edad')";
        if (mysqli_query($conn, $query)) {
            echo "Registro exitoso. Ahora puedes iniciar sesión.";
            header("Location: login_register.html");
            exit();
        } else {
            echo "Error: " . mysqli_error($conn);
        }
    }
}
?>
