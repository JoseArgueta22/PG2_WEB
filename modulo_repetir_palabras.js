// Variables globales
let palabras = [
    "manzana", "banana", "carro", "sol", "luna", "flor", "gato", "perro", "casa", "gota",
    // Añadir más palabras si es necesario
];
let indiceActual = 0;

// Función para mostrar la siguiente palabra
function mostrarSiguientePalabra() {
    if (indiceActual < palabras.length) {
        document.getElementById("palabra").textContent = palabras[indiceActual];
        indiceActual++;
        actualizarProgreso();
    } else {
        mostrarResultados();
    }
}

// Función para actualizar la barra de progreso
function actualizarProgreso() {
    let progreso = document.getElementById("progreso");
    progreso.value = indiceActual;
}

// Función para mostrar los resultados al final
function mostrarResultados() {
    document.getElementById("palabra-container").style.display = "none";
    document.getElementById("seguir-button").style.display = "none";
    document.getElementById("barra-progreso").style.display = "none";
    document.getElementById("resultados").style.display = "block";
}

// Función para regresar al inicio
function regresar() {
    window.location.href = 'index.html';
}

// Función para reiniciar el módulo
function reiniciarModulo() {
    indiceActual = 0;
    document.getElementById("palabra-container").style.display = "block";
    document.getElementById("seguir-button").style.display = "inline-block";
    document.getElementById("barra-progreso").style.display = "block";
    document.getElementById("resultados").style.display = "none";
    mostrarSiguientePalabra();
    actualizarProgreso();
}

// Mostrar la primera palabra cuando la página se carga
window.onload = mostrarSiguientePalabra;
