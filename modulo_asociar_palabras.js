// Variables globales
let imagenesYRespuestas = [
    { src: "images/manzana.png", respuesta: "manzana" },
    { src: "images/banana.png", respuesta: "banano" },
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
    respuestasIncorrectas: 0, // Nuevo: contador de respuestas incorrectas
    indiceImagenActual: 0,
    respuestasUsuario: [],
    totalImagenes: 5,
    imagenesSeleccionadas: [],
    imagenesRespondidas: [],
    puntos: 0 // Nuevo: acumulador de puntos
};

// Función para inicializar el módulo
function iniciarModulo() {
    estado.imagenesSeleccionadas = imagenesYRespuestas.sort(() => 0.5 - Math.random()).slice(0, estado.totalImagenes);
    estado.imagenesRespondidas = [];
    estado.indiceImagenActual = 0;
    estado.respuestasUsuario = [];  // Reiniciar las respuestas del usuario
    estado.respuestasCorrectas = 0; // Reiniciar el contador de respuestas correctas
    estado.puntos = 0; // Reiniciar los puntos

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

// Función para normalizar texto eliminando tildes
function eliminarTildes(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Función para verificar la respuesta
function verificarRespuesta() {
    // Obtener la respuesta del usuario y normalizarla
    const respuestaUsuario = eliminarTildes(document.getElementById("respuesta").value.trim().toLowerCase());

    if (respuestaUsuario === "") {
        alert("Ingresa una respuesta para poder continuar :D.");
        return;
    }

    const imagenSeleccionada = estado.imagenesSeleccionadas[estado.indiceImagenActual];
    if (!imagenSeleccionada) {
        return;
    }

    // Normalizar las respuestas correctas
    const respuestasCorrectas = eliminarTildes(imagenSeleccionada.respuesta.toLowerCase()).split("||");

    // Comprobar si la respuesta del usuario coincide con alguna de las respuestas correctas
    const esRespuestaCorrecta = respuestasCorrectas.some(respuestaCorrecta => respuestaUsuario === eliminarTildes(respuestaCorrecta));

    estado.respuestasUsuario.push({ correcta: respuestasCorrectas.join("||"), usuario: respuestaUsuario });

    if (esRespuestaCorrecta) {
        estado.respuestasCorrectas++;
        estado.puntos += 10; // Nuevo: sumar 10 puntos
        mostrarMensaje("Correcto +10", "green");
        reproducirSonido('sonido-correcto');
    } else {
        estado.respuestasIncorrectas++; // Nuevo: contar respuesta incorrecta
        estado.puntos -= 5; // Nuevo: restar 5 puntos
        mostrarMensaje("Incorrecto -5", "red");
    }

    // Actualizar barra de progreso después de verificar la respuesta
    document.getElementById("barra-progreso").value = estado.respuestasUsuario.length;

    // Eliminar la imagen actual de la lista de imágenes seleccionadas
    estado.imagenesSeleccionadas.splice(estado.indiceImagenActual, 1);

    // Verificar si todas las imágenes han sido respondidas
    if (estado.imagenesSeleccionadas.length === 0) {
        finalizarModulo();
    } else {
        estado.indiceImagenActual = Math.min(estado.indiceImagenActual, estado.imagenesSeleccionadas.length - 1);
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
    
    let resultadosTexto = `Respuestas correctas: ${estado.respuestasCorrectas} de ${estado.totalImagenes}.<br>Puntos Totales: ${estado.puntos}<br><br>`;
    estado.respuestasUsuario.forEach((respuesta, index) => {
        resultadosTexto += `<div class="respuesta">Imagen ${index + 1}: Correcta: ${respuesta.correcta}, Tu respuesta: ${respuesta.usuario}</div>`;
    });
    
    document.getElementById("resultados-texto").innerHTML = resultadosTexto;
    marcarModuloCompleto(1);
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

// Función para mostrar el mensaje final en el modal
function mostrarMensajeFinal() {
    const modal = document.getElementById("modal-final");

    // Mostrar el modal
    modal.style.display = "block";

    // Obtener el elemento del botón de continuar aprendiendo
    const continuarBtn = document.getElementById("listo-btn");
    continuarBtn.onclick = function() {
        modal.style.display = "none";

    }

    // Obtener el elemento del botón de cerrar
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
       
    }

    // Cerrar el modal si se hace clic fuera del contenido
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
           
        }
    }
}

// Función para finalizar el módulo y ocultar la barra de progreso
function finalizarModulo() {
    document.getElementById("barra-progreso-container").style.display = 'none';
    mostrarResultados();
    reproducirSonido('sonido-fin-modulo');
    mostrarMensajeFinal(); 
    enviarPuntosAlServidor(); 
}

// Función para enviar los puntos al servidor
function enviarPuntosAlServidor() {
    const puntos = estado.puntos;
    const modulo = 1; // numero de modulos 

    fetch('guardar_puntos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            puntos: puntos,
            modulo: modulo
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error al guardar los puntos:', data.error);
        } else {
            console.log('Puntos guardados con éxito:', data.message);
        }
    })
    .catch(error => console.error('Error al enviar los puntos:', error));
}

function marcarModuloCompleto(modulo) {
    localStorage.setItem(`modulo${modulo}Completo`, true);
    console.log(`Modulo ${modulo} completado y guardado en localStorage.`);
}

// Función para regresar a la página principal
function regresar() {
    window.location.href = 'index.php';
}

// Iniciar el módulo cuando la página se carga
window.onload = iniciarModulo;