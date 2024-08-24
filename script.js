// script.js

// Crear una instancia de Audio para el sonido de clic
const clickSound = new Audio('sounds/Sonido_mario.wav');

// Función para reproducir el sonido de clic
function playClickSound() {
    clickSound.currentTime = 0; // Reiniciar el sonido si ya está en reproducción
    clickSound.play();
}

// Función que se llama al hacer clic en los botones de los módulos
function iniciarActividad(modulo) {
    playClickSound(); // Reproducir el sonido
    // Aquí iría la lógica para iniciar la actividad del módulo
    console.log(`Iniciar actividad del ${modulo}`);
}

// script.js

// script.js

function mostrarInstrucciones(id) {
    const instrucciones = {
        'instrucciones1': '¡Hola! En este juego, vas a ver una imagen en la pantalla. Debajo de la imagen, hay un espacio para que escribas la palabra que piensas que es la imagen. Por ejemplo, si ves una imagen de una manzana, escribe la palabra \'manzana\'. ¡Diviértete asociando las imágenes con las palabras correctas!',
        'instrucciones2': '¡Hola! En este juego, verás una oración que está incompleta. Tu trabajo es completar la oración escribiendo la palabra que falta. Por ejemplo, si ves \'El gato está en el ______\', debes escribir \'techo\' si es la respuesta correcta. ¡Es como un rompecabezas de palabras, y tú eres el héroe que lo completa!',
        'instrucciones3': '¡Hola! En este juego, verás una palabra en la pantalla. Luego, escucharás esa palabra varias veces, por ejemplo, \'pelota, pelota, pelota\'. Tu tarea es decir la palabra en voz alta cuando la escuches. ¡Es un divertido juego de repetición para practicar cómo se dicen las palabras!'
    };

    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');

    popupText.textContent = instrucciones[id];
    popup.style.display = 'flex'; // Mostrar el popup
}

function cerrarPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none'; // Ocultar el popup
}

function salir() {
    // Función para el botón de salir (si tienes alguna funcionalidad aquí)
}

