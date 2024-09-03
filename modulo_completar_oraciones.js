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
    respuestasUsuario: [],
    indiceActual: 0,
    oracionesSeleccionadas: [],
    totalOraciones: 5,
    oracionActual: null,
    oracionesRespondidas: []
};

// Función para inicializar el módulo
function iniciarModulo() {
    estado.oracionesSeleccionadas = oraciones.sort(() => 0.5 - Math.random()).slice(0, estado.totalOraciones);
    estado.indiceActual = 0;
    estado.respuestasCorrectas = 0;
    estado.respuestasUsuario = [];
    estado.oracionesRespondidas = [];
    
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
        mensaje.textContent = "¡Correcto!";
        mensaje.style.color = "green";
        document.getElementById("sonido-correcto").play();
    } else {
        mensaje.textContent = "Incorrecto.";
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

// Función para finalizar el módulo y mostrar los resultados
function finalizarModulo() {
    document.getElementById("oracion-container").style.display = "none";
    document.getElementById("opciones-container").style.display = "none";

    let resultadosTexto = `Has completado el módulo. Respuestas correctas: ${estado.respuestasCorrectas} de ${estado.totalOraciones}.<br><br>`;
    
    estado.respuestasUsuario.forEach((respuesta, index) => {
        resultadosTexto += `${index + 1}. Oración: ${respuesta.oracion}<br>Tu respuesta: ${respuesta.respuestaUsuario}<br>Respuesta correcta: ${respuesta.respuestaCorrecta}<br><br>`;
    });

    document.getElementById("resultados-texto").innerHTML = resultadosTexto;
    document.getElementById("resultados-container").style.display = "block";
    document.getElementById("sonido-fin-modulo").play();
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
    window.location.href = 'modulo_repetir.html';
}

// Cargar la primera oración cuando la página se carga
window.onload = iniciarModulo;
