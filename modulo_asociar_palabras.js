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

let estado = {
    respuestasCorrectas: 0,
    indiceImagenActual: 0,
    respuestasUsuario: [],
    totalImagenes: 5, // Fijo en 5 para mostrar exactamente 5 imágenes
    imagenesSeleccionadas: [],
    imagenesRespondidas: [] // Para almacenar las imágenes ya respondidas
};

// Función para inicializar el módulo
function iniciarModulo() {
    // Seleccionar 'totalImagenes' imágenes al azar
    estado.imagenesSeleccionadas = imagenesYRespuestas.sort(() => 0.5 - Math.random()).slice(0, estado.totalImagenes);
    estado.imagenesRespondidas = [];
    estado.indiceImagenActual = 0;
    estado.respuestasUsuario = [];  // Reiniciar las respuestas del usuario
    estado.respuestasCorrectas = 0; // Reiniciar el contador de respuestas correctas

    document.getElementById("barra-progreso-container").style.display = "block";
    document.getElementById("barra-progreso").value = 0;
    document.getElementById("barra-progreso").max = estado.totalImagenes;

    cargarImagen();
}

// Función para cargar la imagen actual
function cargarImagen() {
    if (estado.indiceImagenActual < estado.imagenesSeleccionadas.length) {
        const imagen = document.getElementById("imagen");
        const imagenSeleccionada = estado.imagenesSeleccionadas[estado.indiceImagenActual];

        if (imagenSeleccionada) {
            imagen.src = imagenSeleccionada.src;
            document.getElementById("respuesta").value = "";
            mostrarMensaje("", "");
        }
    } else {
        finalizarModulo();
    }
}

// Función para verificar la respuesta
function verificarRespuesta() {
    const respuestaUsuario = document.getElementById("respuesta").value.trim().toLowerCase();

    if (respuestaUsuario === "") {
        alert("Ingresa una respuesta para poder continuar :D.");
        return;
    }

    const imagenSeleccionada = estado.imagenesSeleccionadas[estado.indiceImagenActual];
    if (!imagenSeleccionada) {
        return;
    }

    const respuestaCorrecta = imagenSeleccionada.respuesta.toLowerCase();
    estado.respuestasUsuario.push({ correcta: respuestaCorrecta, usuario: respuestaUsuario });

    if (respuestaUsuario === respuestaCorrecta) {
        estado.respuestasCorrectas++;
        mostrarMensaje("Correcto +10", "green");
        reproducirSonido('sonido-correcto');
    } else {
        mostrarMensaje("Incorrecto", "red");
    }

    // Actualizar barra de progreso después de verificar la respuesta
    document.getElementById("barra-progreso").value = estado.respuestasUsuario.length;

    // Eliminar la imagen actual de la lista de imágenes seleccionadas
    estado.imagenesSeleccionadas.splice(estado.indiceImagenActual, 1);

    // Verificar si todas las imágenes han sido respondidas
    if (estado.imagenesSeleccionadas.length === 0) {
        finalizarModulo();
    } else {
        // Avanzar al siguiente índice de imagen
        estado.indiceImagenActual = Math.min(estado.indiceImagenActual, estado.imagenesSeleccionadas.length - 1);
        
        // Cargar la siguiente imagen después de un pequeño retraso
        setTimeout(() => {
            cargarImagen();
        }, 1000);
    }
}

// Función para cambiar la imagen a otra al azar
function cambiarImagen() {
    if (estado.imagenesSeleccionadas.length > 1) {
        let nuevoIndice = Math.floor(Math.random() * estado.imagenesSeleccionadas.length);
        
        while (nuevoIndice === estado.indiceImagenActual) {
            nuevoIndice = Math.floor(Math.random() * estado.imagenesSeleccionadas.length);
        }

        estado.indiceImagenActual = nuevoIndice;
        cargarImagen(); 
    }
}

// Función para mostrar el mensaje de correcto o incorrecto
function mostrarMensaje(texto, color) {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;
    mensaje.style.color = color;
}

// Función para mostrar los resultados al final del módulo
function mostrarResultados() {
    document.getElementById("imagen-container").style.display = "none";
    document.getElementById("respuesta-container").style.display = "none";
    document.getElementById("mensaje-container").style.display = "none";
    document.getElementById("titulo-cambiar-imagen").style.display = "none"; 
    document.getElementById("cambiar-imagen-btn").style.display = "none"; 
    
    const resultadosContainer = document.getElementById("resultados-container");
    resultadosContainer.style.display = "block";
    
    let resultadosTexto = `Correctas: ${estado.respuestasCorrectas} / ${estado.totalImagenes}\n\n`;
    estado.respuestasUsuario.forEach((respuesta, index) => {
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

// Función para reiniciar el módulo
function reiniciarModulo() {
    document.getElementById("resultados-container").style.display = "none";
    document.getElementById("imagen-container").style.display = "block";
    document.getElementById("respuesta-container").style.display = "block";
    document.getElementById("mensaje-container").style.display = "block";
    document.getElementById("titulo-cambiar-imagen").style.display = "block"; 
    document.getElementById("cambiar-imagen-btn").style.display = "block"; 
    
    iniciarModulo();
}

// Función para finalizar el módulo y ocultar la barra de progreso
function finalizarModulo() {
    document.getElementById("barra-progreso-container").style.display = 'none';
    mostrarResultados();
    reproducirSonido('sonido-fin-modulo');
}

// Función para regresar a la página principal
function regresar() {
    window.location.href = 'index.html';
}

// Iniciar el módulo cuando la página se carga
window.onload = iniciarModulo;
