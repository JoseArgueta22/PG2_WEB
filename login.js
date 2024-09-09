// Función para alternar la visibilidad de la contraseña
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(inputId + '-eye');

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.textContent = "👁️"; // Ojo abierto
    } else {
        passwordInput.type = "password";
        eyeIcon.textContent = "👁️"; // Ojo cerrado
    }
}

function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box'; // Asegúrate de que esta clase esté en tu CSS
    alertBox.innerHTML = `
        <p>${message}</p>
        <button onclick="this.parentElement.remove()">OK</button>
    `;
    document.body.appendChild(alertBox);

    // Opcional: elimina el mensaje después de algunos segundos
    setTimeout(() => {
        alertBox.remove();
    }, 5000); // 5000 ms = 5 segundos
}

// Función para abrir el modal de registro
function openModal() {
    document.getElementById('register-modal').style.display = 'flex'; // Usar 'flex' para centrar el modal
}

// Función para cerrar el modal de registro
function closeModal() {
    document.getElementById('register-modal').style.display = 'none';
    document.getElementById('register-form').reset(); // Limpiar los campos del formulario
}

// Función para abrir el modal de recuperación de contraseña
function openRecoverModal() {
    document.getElementById('recover-modal').style.display = 'flex'; // Usar 'flex' para centrar el modal
}

// Función para cerrar el modal de recuperación de contraseña
function closeRecoverModal() {
    document.getElementById('recover-modal').style.display = 'none';
    document.getElementById('recuperar-form').reset(); // Limpiar los campos del formulario
}

// Función para cerrar el mensaje de alerta
function closeAlert() {
    document.getElementById('alert-box').style.display = 'none';
}

// Manejar el formulario de registro con AJAX
$(document).ready(function() {
    $('#register-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "register.php",
            data: $(this).serialize(),
            success: function(response) {
                showAlert(response);
                if (response.trim() === "Registro exitoso") {
                    setTimeout(function() {
                        closeModal(); // Cerrar el modal y limpiar el formulario
                        closeAlert(); // Cerrar el mensaje de alerta
                    }, 1000); // Añadir un pequeño retraso para que el usuario pueda ver el mensaje
                }
            }
        });
    });

    // Manejar el formulario de restablecimiento de contraseña con AJAX
    $('#recuperar-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "recuperar.php",
            data: $(this).serialize(),
            success: function(response) {
                showAlert(response);
                if (response.trim() === "Contraseña restablecida exitosamente") {
                    setTimeout(function() {
                        closeRecoverModal(); // Cerrar el modal y limpiar el formulario
                        closeAlert(); // Cerrar el mensaje de alerta
                    }, 1000); // Añadir un pequeño retraso para que el usuario pueda ver el mensaje
                }
            }
        });
    });

    // Manejar el formulario de login con AJAX
    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "login.php",
            data: $(this).serialize(),
            success: function(response) {
                if (response.trim() === "success") {
                    window.location.href = "index.php";
                } else {
                    showAlert(response);
                }
            }
        });
    });
});
