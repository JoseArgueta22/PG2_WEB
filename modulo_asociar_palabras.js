// Variables globales
let imagenesYRespuestas = [
    { src: "images/manzana.png", respuesta: "manzana" },
    { src: "images/banana.png", respuesta: "banana" },
    { src: "images/carro.png", respuesta: "carro" },
    { src: "images/sol.png", respuesta: "sol" },
    { src: "images/luna.png", respuesta: "luna" },
    { src: "images/flor.png", respuesta: "flor" },
    { src: "images/gato.jpg", respuesta: "gato" },
    { src: "images/perro.png", respuesta: "perro" },
    { src: "images/casa.png", respuesta: "casa" },
    { src: "images/gota.jpg", respuesta: "gota" },
    { src: "images/pan.png", respuesta: "pan" }
    // Añadir más imágenes y respuestas hasta tener 50
];

let respuestasCorrectas = 0;
let indiceImagenActual = 0;
let respuestasUsuario = [];
let totalImagenes = 10;
let imagenesSeleccionadas = [];

// Función para inicializar el módulo
function iniciarModulo() {
    // Seleccionar 10 imágenes al azar
    imagenesSeleccionadas = imagenesYRespuestas.sort(() => 0.5 - Math.random()).slice(0, totalImagenes);
    cargarImagen();
}

// Función para cargar la imagen actual
function cargarImagen() {
    if (indiceImagenActual < totalImagenes) {
        const imagen = document.getElementById("imagen");
        imagen.src = imagenesSeleccionadas[indiceImagenActual].src;
        document.getElementById("respuesta").value = "";
        document.getElementById("mensaje").textContent = "";
    } else {
        mostrarResultados();
        reproducirSonido('sonido-fin-modulo');
    }
}

// Función para verificar la respuesta
function verificarRespuesta() {
    const respuestaUsuario = document.getElementById("respuesta").value.trim().toLowerCase();

    // Verificar si la respuesta está vacía
    if (respuestaUsuario === "") {
        alert("Debe ingresar una respuesta antes de continuar.");
        return; // Detener la ejecución si la respuesta está vacía
    }

    const respuestaCorrecta = imagenesSeleccionadas[indiceImagenActual].respuesta.toLowerCase();
    
    respuestasUsuario.push({ correcta: respuestaCorrecta, usuario: respuestaUsuario });

    if (respuestaUsuario === respuestaCorrecta) {
        respuestasCorrectas++;
        document.getElementById("mensaje").textContent = "Correcto +10";
        document.getElementById("mensaje").style.color = "green";
        reproducirSonido('sonido-correcto');
    } else {
        document.getElementById("mensaje").textContent = "Incorrecto";
        document.getElementById("mensaje").style.color = "red";
    }

    // Actualizar la barra de progreso
    indiceImagenActual++;
    document.getElementById("barra-progreso").value = indiceImagenActual;
    
    setTimeout(cargarImagen, 1000); // Pasar a la siguiente imagen después de 1 segundo
}

// Función para cambiar la imagen a otra al azar
function cambiarImagen() {
    // Selecciona un nuevo índice de imagen aleatoriamente diferente al actual
    let nuevoIndice = Math.floor(Math.random() * totalImagenes);
    while (nuevoIndice === indiceImagenActual) {
        nuevoIndice = Math.floor(Math.random() * totalImagenes);
    }
    indiceImagenActual = nuevoIndice;
    cargarImagen();
}


// Función para mostrar los resultados al final del módulo
function mostrarResultados() {
    document.getElementById("imagen-container").style.display = "none";
    document.getElementById("respuesta-container").style.display = "none";
    document.getElementById("mensaje-container").style.display = "none";
    
    const resultadosContainer = document.getElementById("resultados-container");
    resultadosContainer.style.display = "block";
    
    let resultadosTexto = `Correctas: ${respuestasCorrectas} / ${totalImagenes}\n\n`;
    respuestasUsuario.forEach((respuesta, index) => {
        resultadosTexto += `<div class="respuesta">Imagen ${index + 1}: Correcta: ${respuesta.correcta}, Tu respuesta: ${respuesta.usuario}</div>`;
    });
    
    document.getElementById("resultados-texto").innerHTML = resultadosTexto;
}

// Función para reproducir sonido
function reproducirSonido(id) {
    const sonido = document.getElementById(id);
    if (sonido) {
        sonido.play();
    }
}

function mostrarMensajeBienvenida() {
    document.getElementById("loading-bar").style.display = "flex"; // Mostrar barra de carga
    setTimeout(() => {
        document.getElementById("loading-bar").style.display = "none"; // Ocultar barra de carga
        document.getElementById("popup").style.display = "block"; // Mostrar el mensaje emergente
    }, 1000); // Simula un retraso para la barra de carga
}

function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
}

function empezarModulo() {
    cerrarPopup();
    // Aquí puedes inicializar cualquier función o iniciar la actividad
}

function ocultarBarraDeCarga() {
    document.getElementById("loading-bar").style.display = "none"; // Ocultar la barra de carga
}


// Función para regresar a la página principal
function regresar() {
    window.location.href = 'index.html';
}

// Iniciar el módulo cuando la página se carga
window.onload = iniciarModulo;
