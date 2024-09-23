let oraciones = [
    { oracion: "El _____ es muy rápido.", opciones: ["gato", "perro", "carro"], correcta: "carro" },
    { oracion: "El _____ es el rey de la selva.", opciones: ["león", "tigre", "oso"], correcta: "león" },
    { oracion: "El _____ vuela en el cielo.", opciones: ["avión", "barco", "tren"], correcta: "avión" },
    { oracion: "El _____ vive en el agua.", opciones: ["tiburón", "gato", "perro"], correcta: "tiburón" },
    { oracion: "La _____ es una fruta.", opciones: ["manzana", "zanahoria", "papa"], correcta: "manzana" },
    { oracion: "La _____ es un mamífero.", opciones: ["pato", "ballena", "tortuga"], correcta: "ballena" },
    { oracion: "El _____ es amarillo y brilla en el cielo.", opciones: ["sol", "luna", "estrella"], correcta: "sol" },
    { oracion: "La _____ es de color verde y salta.", opciones: ["rana", "perro", "gato"], correcta: "rana" },
    { oracion: "La _____ es un insecto que hace miel.", opciones: ["abeja", "mosca", "hormiga"], correcta: "abeja" },
    { oracion: "El _____ tiene rayas y es un felino.", opciones: ["tigre", "león", "gato"], correcta: "tigre" }
];

let estado = {
    respuestasCorrectas: 0,
    respuestasIncorrectas: 0, // Contador de respuestas incorrectas
    respuestasUsuario: [],
    indiceActual: 0,
    oracionesSeleccionadas: [],
    totalOraciones: 5,
    oracionActual: null,
    oracionesRespondidas: [],
    puntos: 0 // Acumulador de puntos
};

// Función para inicializar el módulo
function iniciarModulo() {
    estado.oracionesSeleccionadas = oraciones.sort(() => 0.5 - Math.random()).slice(0, estado.totalOraciones);
    estado.indiceActual = 0;
    estado.respuestasCorrectas = 0;
    estado.respuestasIncorrectas = 0; // Reiniciar el contador de respuestas incorrectas
    estado.respuestasUsuario = [];
    estado.oracionesRespondidas = [];
    estado.puntos = 0; // Reiniciar los puntos
    
    document.getElementById("progreso").value = 0;
    document.getElementById("progreso").max = estado.totalOraciones;

    cargarOracion();
}

// Función para cargar la próxima oración
function cargarOracion() {
    if (estado.indiceActual < estado.totalOraciones) {
        estado.oracionActual = estado.oracionesSeleccionadas[estado.indiceActual];
        mostrarOracion(estado.oracionActual);
    } else {
        finalizarModulo();
    }
}

// Función para mostrar la oración actual y sus opciones
function mostrarOracion(oracion) {
    document.getElementById("oracion-incompleta").innerHTML = oracion.oracion.replace("_____", "<span id='espacio-palabra'>_____</span>");
    let opcionesHTML = "";
    oracion.opciones.forEach(opcion => {
        opcionesHTML += `<button class="opcion" onclick="seleccionarOpcion('${opcion}')">${opcion}</button>`;
    });
    document.getElementById("opciones-container").innerHTML = opcionesHTML;

    // Limpiar mensaje de correcto/incorrecto
    let mensaje = document.getElementById("mensaje");
    mensaje.textContent = "";
    mensaje.style.color = "";
}

// Función para manejar la selección de una opción
function seleccionarOpcion(opcionSeleccionada) {
    let correcta = estado.oracionActual.correcta;
    let mensaje = document.getElementById("mensaje");

    // Guardar la respuesta
    estado.respuestasUsuario.push({
        oracion: estado.oracionActual.oracion,
        respuestaUsuario: opcionSeleccionada,
        respuestaCorrecta: correcta
    });

    // Añadir la oración a las respondidas
    estado.oracionesRespondidas.push(estado.oracionActual);

    if (opcionSeleccionada === correcta) {
        estado.respuestasCorrectas++;
        estado.puntos += 10; // Sumar 10 puntos por respuesta correcta
        mensaje.textContent = "¡Correcto! +10";
        mensaje.style.color = "green";
        document.getElementById("sonido-correcto").play();
    } else {
        estado.respuestasIncorrectas++;
        estado.puntos -= 5; // Restar 5 puntos por respuesta incorrecta
        mensaje.textContent = "Incorrecto -5.";
        mensaje.style.color = "red";
    }

    // Pasar a la siguiente oración
    estado.indiceActual++;

    // Actualizar barra de progreso
    document.getElementById("progreso").value = estado.indiceActual;

    // Limpiar mensaje después de un segundo
    setTimeout(() => {
        document.getElementById("mensaje").textContent = "";
        cargarOracion();
    }, 1000);
}

// Función para cambiar a otra oración al azar sin afectar el índice actual
function cambiarOracion() {
    // Filtrar las oraciones para evitar mostrar las ya respondidas
    let opcionesDisponibles = oraciones.filter(o => !estado.oracionesRespondidas.includes(o) && !estado.oracionesSeleccionadas.includes(o));
    if (opcionesDisponibles.length > 0) {
        let nuevaOracion = opcionesDisponibles[Math.floor(Math.random() * opcionesDisponibles.length)];
        estado.oracionActual = nuevaOracion;
        mostrarOracion(nuevaOracion);
    } else {
        alert("No hay más oraciones disponibles para cambiar.");
    }
}

// Función para mostrar el modal
function mostrarModalFinal() {
    document.getElementById("modal-final").style.display = "block";

    // Hacer clic en la "X" para cerrar el modal
    document.getElementById("cerrar-modal-btn").onclick = function() {
        cerrarModal();
    };

    // Hacer clic en el botón "Listo" para cerrar el modal
    document.getElementById("listo-btn").onclick = function() {
        cerrarModal();
    };

    // Cerrar modal si se hace clic fuera del contenido
    window.onclick = function(event) {
        let modal = document.getElementById("modal-final");
        if (event.target == modal) {
            cerrarModal();
        }
    };
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById("modal-final").style.display = "none";
}

// Función para finalizar el módulo y mostrar los resultados
function finalizarModulo() {
    document.getElementById("oracion-container").style.display = "none";
    document.getElementById("opciones-container").style.display = "none";

    let resultadosTexto = `Has completado el módulo. Respuestas correctas: ${estado.respuestasCorrectas} de ${estado.totalOraciones}.<br>Puntos Totales: ${estado.puntos}<br><br>`;
    
    estado.respuestasUsuario.forEach((respuesta, index) => {
        resultadosTexto += `${index + 1}. Oración: ${respuesta.oracion}<br>Tu respuesta: ${respuesta.respuestaUsuario}<br>Respuesta correcta: ${respuesta.respuestaCorrecta}<br><br>`;
    });

    document.getElementById("resultados-texto").innerHTML = resultadosTexto;
    document.getElementById("resultados-container").style.display = "block";
    document.getElementById("sonido-fin-modulo").play();

    // Mostrar el modal final
    mostrarModalFinal();
    enviarPuntosAlServidor(); // Enviar los puntos al servidor
    marcarModuloCompleto(2);
}

// Función para enviar los puntos al servidor
function enviarPuntosAlServidor() {
    const puntos = estado.puntos;
    const modulo = 2; // Número de módulo

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

// Función para regresar al inicio
function regresarAlInicio() {
    window.location.href = 'index.php';
}

// Función para reiniciar el módulo
function reiniciarModulo() {
    window.location.reload();
}

// Función para ir al Módulo 3
function irAlModulo3() {
    window.location.href = 'bienvenida.html?modulo=3';
}

function marcarModuloCompleto(modulo) {
    localStorage.setItem(`modulo${modulo}Completo`, 'true');
    console.log(`Modulo ${modulo} completado y guardado en localStorage.`);
}

// Cargar la primera oración cuando la página se carga
window.onload = iniciarModulo;
