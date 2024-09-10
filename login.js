// Función para alternar la visibilidad de la contraseña
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(inputId + '-eye');

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.textContent = "👁️"; 
    } else {
        passwordInput.type = "password";
        eyeIcon.textContent = "👁️"; 
    }
}

// Función para mostrar mensajes de alerta
function showAlert(message) {
    const alertBox = document.getElementById('alert-box');
    const alertMessage = document.getElementById('alert-message');
    alertMessage.textContent = message;
    alertBox.style.display = 'block';
}

// Función para cerrar el mensaje de alerta
function closeAlert() {
    const alertBox = document.getElementById('alert-box');
    alertBox.style.display = 'none';
}

// Función para abrir el modal de registro
function openModal() {
    document.getElementById('register-modal').style.display = 'flex'; 
}

// Función para cerrar el modal de registro
function closeModal() {
    document.getElementById('register-modal').style.display = 'none';
    document.getElementById('register-form').reset(); 
}

// Función para abrir el modal de recuperación de contraseña
function openRecoverModal() {
    document.getElementById('recover-modal').style.display = 'flex'; 
}

// Función para cerrar el modal de recuperación de contraseña
function closeRecoverModal() {
    document.getElementById('recover-modal').style.display = 'none';
    document.getElementById('recuperar-form').reset(); 
}

// Función para abrir el modal de recuperación de nombre de usuario
function openRecoverUsernameModal() {
    document.getElementById('recover-username-modal').style.display = 'flex'; 
}

function closeRecoverUsernameModal() {
    document.getElementById('recover-username-modal').style.display = 'none';
    document.getElementById('recover-username-form').reset(); 
}

// Unificar el evento de clic fuera de los modales
window.onclick = function(event) {
    const registerModal = document.getElementById('register-modal');
    const recoverModal = document.getElementById('recover-modal');
    const recoverUsernameModal = document.getElementById('recover-username-modal');

    // Cerrar el modal de registro si se hace clic fuera de él
    if (event.target == registerModal) {
        closeModal();
    }

    // Cerrar el modal de restablecimiento de contraseña si se hace clic fuera de él
    if (event.target == recoverModal) {
        closeRecoverModal();
    }

    // Cerrar el modal de recuperación de nombre de usuario si se hace clic fuera de él
    if (event.target == recoverUsernameModal) {
        closeRecoverUsernameModal();
    }
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
                        closeModal(); 
                        closeAlert(); 
                    }, 1000);
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
                        closeRecoverModal(); 
                        closeAlert(); 
                    }, 1000); 
                }
            }
        });
    });

    // Manejar el formulario de recuperación de nombre de usuario con AJAX
    $('#recover-username-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "recuperar_usuario.php", 
            data: $(this).serialize(),
            success: function(response) {
                showAlert(response); // Mostrar el mensaje de alerta con la respuesta
                // No se cierra automáticamente el modal ni el mensaje
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
