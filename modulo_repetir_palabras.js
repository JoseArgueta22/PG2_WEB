// Variables globales
let palabras = [
    "araña", "avión", "árbol", "auto", "amigo",
    "banana", "burro", "bola", "bebé", "barco",
    "carro", "casa", "conejo", "cielo", "caballo",
    "dado", "delfín", "día", "dinero", "dragón",
    "elefante", "espejo", "estrella", "escalera", "espada",
    "flor", "fuego", "fresa", "foca", "farol",
    "gato", "gota", "gorila", "globo", "gallina",
    "hoja", "huevo", "helado", "hombre", "hermano",
    "isla", "iglesia", "iglú", "iguanita", "imán",
    "juguete", "jirafa", "jabón", "jugo", "jardín",
    "luna", "lobo", "lápiz", "lago", "libro",
    "manzana", "mesa", "mar", "mango", "mono",
    "nube", "nido", "naranja", "niño", "nuez",
    "perro", "pato", "pelota", "pez", "piedra",
    "rana", "rosa", "ratón", "reloj", "río",
    "sol", "silla", "serpiente", "sombrero", "sopa",
    "tren", "tigre", "taza", "tomate", "tortuga",
    "vaca", "ventana", "viento", "vela", "vampiro",
    "zapato", "zorro", "zanahoria", "zebra", "zumo"
];

let cantidadPalabras = 5; // Cambia este valor para establecer la cantidad de palabras por sesión
let palabrasSeleccionadas = [];
let indiceActual = 0;

// Función para seleccionar palabras al azar
function seleccionarPalabrasAlAzar() {
    let palabrasAleatorias = [...palabras]; // Copia el array original para no modificarlo
    palabrasSeleccionadas = [];

    for (let i = 0; i < cantidadPalabras; i++) {
        // Elige un índice al azar dentro del array de palabras restantes
        let indiceAleatorio = Math.floor(Math.random() * palabrasAleatorias.length);
        // Añade la palabra seleccionada al array de palabras seleccionadas
        palabrasSeleccionadas.push(palabrasAleatorias[indiceAleatorio]);
        // Elimina la palabra seleccionada del array temporal para evitar duplicados
        palabrasAleatorias.splice(indiceAleatorio, 1);
    }
}

// Función para mostrar la siguiente palabra
function mostrarSiguientePalabra() {
    if (indiceActual < cantidadPalabras) {
        document.getElementById("palabra").textContent = palabrasSeleccionadas[indiceActual];
        indiceActual++;
        actualizarProgreso();
    } 
    if (indiceActual === cantidadPalabras) {
        mostrarModalFinal(); // Mostrar modal al completar las palabras
    }
}

// Función para actualizar la barra de progreso
function actualizarProgreso() {
    let progreso = document.getElementById("progreso");
    progreso.value = indiceActual;
    progreso.max = cantidadPalabras; // Asegura que el máximo de la barra de progreso coincida con la cantidad de palabras
}

// Función para reproducir el audio de la palabra actual usando la API Web Speech
function reproducirAudio() {
    let palabraActual = document.getElementById("palabra").textContent; // Obtiene la palabra actual
    let utterance = new SpeechSynthesisUtterance(palabraActual);
    speechSynthesis.speak(utterance);
}

// Función para mostrar los resultados al final
function mostrarResultados() {
    document.getElementById("palabra-container").style.display = "none";
    document.getElementById("seguir-button").style.display = "none";
    document.getElementById("escuchar-button").style.display = "none";
    document.getElementById("barra-progreso").style.display = "none";
    document.getElementById("resultados").style.display = "block";
}

// Función para mostrar el modal final
function mostrarModalFinal() {
    let modal = document.getElementById("modal-final");
    let listoBtn = document.getElementById("listo-btn");

    modal.style.display = "block";

    // Cierra el modal cuando se hace clic en el botón "Listo"
    listoBtn.onclick = function() {
        modal.style.display = "none";
        mostrarResultados(); // Muestra los botones "Volver a Jugar" y "Regresar" después de cerrar el modal
    };
}

// Función para regresar al inicio
function regresar() {
    window.location.href = 'index.html';
}

// Función para reiniciar el módulo
function reiniciarModulo() {
    indiceActual = 0;
    seleccionarPalabrasAlAzar(); // Selecciona un nuevo conjunto de palabras al azar
    document.getElementById("palabra-container").style.display = "block";
    document.getElementById("seguir-button").style.display = "inline-block";
    document.getElementById("escuchar-button").style.display = "inline-block";
    document.getElementById("barra-progreso").style.display = "block";
    document.getElementById("resultados").style.display = "none";
    actualizarProgreso(); // Inicializa la barra de progreso
    mostrarSiguientePalabra();
}

// Función para ir al Módulo 3
function irAlModulo4() {
    window.location.href = 'bienvenida.html?modulo=4';
}

// Mostrar la primera palabra cuando la página se carga
window.onload = function() {
    indiceActual = 0;
    seleccionarPalabrasAlAzar(); // Selecciona las palabras al azar cuando la página se carga
    actualizarProgreso(); // Asegura que la barra de progreso inicie en 0
    mostrarSiguientePalabra();
};
