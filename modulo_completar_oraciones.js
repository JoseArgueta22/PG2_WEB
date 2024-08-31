// Variables globales
let oraciones = [
    { oracion: "El _____ es muy rápido.", opciones: ["gato", "perro", "carro"], correcta: "carro" },
    { oracion: "El _____ es el rey de la selva.", opciones: ["león", "tigre", "oso"], correcta: "león" },
    // Añadir más oraciones
];
let indiceActual = 0;
let respuestasCorrectas = 0;

// Función para cargar la próxima oración
function cargarOracion() {
    if (indiceActual < oraciones.length) {
        document.getElementById("oracion-incompleta").innerHTML = oraciones[indiceActual].oracion.replace("_____", "<span id='espacio-palabra'>_____</span>");
        let opcionesHTML = "";
        oraciones[indiceActual].opciones.forEach(opcion => {
            opcionesHTML += `<button class="opcion" onclick="seleccionarOpcion('${opcion}')">${opcion}</button>`;
        });
        document.getElementById("opciones-container").innerHTML = opcionesHTML;
    } else {
        mostrarResultados();
    }
}

// Función para manejar la selección de una opción
function seleccionarOpcion(opcionSeleccionada) {
    let correcta = oraciones[indiceActual].correcta;
    let mensaje = document.getElementById("mensaje");
    if (opcionSeleccionada === correcta) {
        respuestasCorrectas++;
        mensaje.textContent = "¡Correcto!";
        mensaje.style.color = "green";
    } else {
        mensaje.textContent = `Incorrecto. La respuesta correcta era: ${correcta}`;
        mensaje.style.color = "red";
    }

    indiceActual++;
    actualizarProgreso();
    setTimeout(cargarOracion, 1000);
}

// Función para actualizar la barra de progreso
function actualizarProgreso() {
    let progreso = document.getElementById("progreso");
    progreso.value = indiceActual;
}

// Función para mostrar los resultados al final
function mostrarResultados() {
    document.getElementById("oracion-container").style.display = "none";
    document.getElementById("opciones-container").style.display = "none";
    document.getElementById("mensaje").textContent = `Has completado el módulo. Respuestas correctas: ${respuestasCorrectas} de ${oraciones.length}.`;
    document.getElementById("resultados-container").style.display = "block";  // Mostrar el contenedor de resultados
}

// Función para regresar al inicio
function regresarAlInicio() {
    window.location.href = 'index.html';
}

// Función para reiniciar el módulo
function reiniciarModulo() {
    window.location.reload();
}

// Función para ir al Módulo 3
function irAlModulo3() {
    window.location.href = 'bienvenida.html?modulo=3';
}

// Cargar la primera oración cuando la página se carga
window.onload = cargarOracion;
