let respuestasCorrectas = 0;
let moduloFinalizado = false;
let modulo1Completo = false;
let modulo2Completo = false;
let modulo3Completo = false;

// Función para inicializar los módulos
function mostrarModulo1() {
    document.getElementById('modulo-1-container').style.display = "block";
    document.getElementById('modulo-2-container').style.display = "none";
    document.getElementById('modulo-3-container').style.display = "none";
    document.getElementById('resultado-final').style.display = "none";
    document.getElementById('modal-final').style.display = "none";

    obtenerImagenAlAzar().then(imagen => {
        document.getElementById('imagen-actividad').src = imagen.src;
        document.getElementById('enviar-imagen-btn').onclick = function() {
            let respuesta = document.getElementById('respuesta-imagen').value.trim().toLowerCase();
            if (respuesta === imagen.palabra.toLowerCase()) {
                respuestasCorrectas++;
                document.getElementById('resultado-imagen').textContent = "¡Correcto!";
            } else {
                document.getElementById('resultado-imagen').textContent = "Incorrecto. La respuesta correcta es: " + imagen.palabra;
            }
            modulo1Completo = true; // Marcar módulo 1 como completo
            marcarModuloCompleto(1); // Enviar al servidor que el módulo 1 está completo
            mostrarModulo2();
        };
    });
}

function mostrarModulo2() {
    document.getElementById('modulo-1-container').style.display = "none";
    document.getElementById('modulo-2-container').style.display = "block";
    document.getElementById('modulo-3-container').style.display = "none";
    document.getElementById('resultado-final').style.display = "none";
    document.getElementById('modal-final').style.display = "none";

    obtenerPalabraAlAzar().then(palabra => {
        document.getElementById('palabra-actividad').textContent = palabra;
        document.getElementById('escuchar-palabra-btn').onclick = function() {
            let utterance = new SpeechSynthesisUtterance(palabra);
            speechSynthesis.speak(utterance);
        };
        document.getElementById('enviar-palabra-btn').onclick = function() {
            let respuesta = document.getElementById('respuesta-palabra').value.trim().toLowerCase();
            if (respuesta === palabra.toLowerCase()) {
                respuestasCorrectas++;
                document.getElementById('resultado-palabra').textContent = "¡Correcto!";
            } else {
                document.getElementById('resultado-palabra').textContent = "Incorrecto. La respuesta correcta es: " + palabra;
            }
            modulo2Completo = true; // Marcar módulo 2 como completo
            marcarModuloCompleto(2); // Enviar al servidor que el módulo 2 está completo
            mostrarModulo3();
        };
    });
}

function mostrarModulo3() {
    document.getElementById('modulo-1-container').style.display = "none";
    document.getElementById('modulo-2-container').style.display = "none";
    document.getElementById('modulo-3-container').style.display = "block";
    document.getElementById('resultado-final').style.display = "none";
    document.getElementById('modal-final').style.display = "none";

    obtenerOracionAlAzar().then(oracion => {
        document.getElementById('oracion-actividad').textContent = oracion.oracion;
        document.getElementById('enviar-oracion-btn').onclick = function() {
            let respuesta = document.getElementById('respuesta-oracion').value.trim().toLowerCase();
            if (respuesta === oracion.respuesta.toLowerCase()) {
                respuestasCorrectas++;
                document.getElementById('resultado-oracion').textContent = "¡Correcto!";
            } else {
                document.getElementById('resultado-oracion').textContent = "Incorrecto. La respuesta correcta es: " + oracion.respuesta;
            }
            modulo3Completo = true; // Marcar módulo 3 como completo
            marcarModuloCompleto(3); // Enviar al servidor que el módulo 3 está completo
            mostrarModalFinal();
        };
    });
}

function mostrarModalFinal() {
    let modal = document.getElementById("modal-final");
    let siBtn = document.getElementById("si-btn");
    let noBtn = document.getElementById("no-btn");

    // Mostrar el modal final
    modal.style.display = "block";

    // Si el usuario hace clic en "Sí", redirige al examen final
    siBtn.onclick = function() {
        modal.style.display = "none";
        mostrarResultadosFinales();

        // Enviar los puntos al finalizar el módulo
        enviarPuntos(25); 

        // Mostrar el examen final si todos los módulos están completos
        if (verificarProgreso()) {
            mostrarExamenFinal(); 
        }
    };

    // Si el usuario hace clic en "No", solo cierra el modal
    noBtn.onclick = function() {
        modal.style.display = "none";
        mostrarResultadosFinales();

        // Enviar los puntos al finalizar el módulo
        enviarPuntos(25); 
    };
}

// Función para mostrar los resultados finales
function mostrarResultadosFinales() {
    document.getElementById('modulo-1-container').style.display = "none";
    document.getElementById('modulo-2-container').style.display = "none";
    document.getElementById('modulo-3-container').style.display = "none";
    document.getElementById('resultado-final').style.display = "block";
    
    let resultadoText = `Has respondido correctamente a ${respuestasCorrectas} de 3 preguntas.`;
    document.getElementById('resultado-final-text').textContent = resultadoText;

    // Mostrar el botón de bonificación solo si el examen se completó
    if (respuestasCorrectas >= 3) {
        moduloFinalizado = true;
        document.getElementById('bonificacion-btn').style.display = "block";
    }
}

// Función para enviar puntos al servidor
function enviarPuntos(puntos) {
    fetch('guardar_puntos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            puntos: puntos,
            modulo: 3
        }),
    })
    .then(response => response.text()) 
    .then(text => {
        console.log('Respuesta del servidor:', text); 
        try {
            let data = JSON.parse(text); 
            console.log('Respuesta JSON del servidor:', data);
        } catch (error) {
            console.error('Error al parsear JSON:', error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Función para verificar si todos los módulos han sido completados
function verificarProgreso() {
    let progresoCompleto = modulo1Completo && modulo2Completo && modulo3Completo;
    console.log("Verificación de progreso:", progresoCompleto);
    return progresoCompleto;
}

function mostrarExamenFinal() {
    if (verificarProgreso()) {
        // Mostrar el contenedor del examen final
        document.getElementById('examen-container').style.display = 'block';
    } else {
        // Mostrar mensaje de error o redirigir
        alert('Debes completar todos los módulos antes de acceder al examen final.');
        window.location.href = 'index.php'; 
    }
}

function marcarModuloCompleto(modulo) {
    fetch('marcar_modulo_completo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            modulo: modulo
        }),
    })
    .then(response => response.text()) 
    .then(text => {
        console.log('Respuesta del servidor:', text); 
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

window.onload = function() {
    if (verificarProgreso()) {
        mostrarExamenFinal();
    }
};

// Inicializar el examen
iniciarExamen();
