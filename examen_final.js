let respuestasCorrectas = 0;
let puntuacionTotal = 0;
let parteActual = 1;
let puntosEnviados = false; 

// Variables para almacenar las preguntas y frases seleccionadas aleatoriamente
let preguntasSeleccionadasParte1 = [];
let frasesSeleccionadasParte2 = [];
let oracionesSeleccionadasParte3 = [];

// Preguntas parte 1
const preguntasParte1 = [
    { pregunta: "¿Cuál de estas es una fruta?", opciones: ["manzana", "perro", "coche"], respuestaCorrecta: "manzana" },
    { pregunta: "¿Qué animal dice 'miau'?", opciones: ["gato", "pato", "vaca"], respuestaCorrecta: "gato" },
    { pregunta: "¿Qué color es el cielo?", opciones: ["azul", "rojo", "verde"], respuestaCorrecta: "azul" },
    { pregunta: "¿Cuál es un medio de transporte?", opciones: ["avión", "árbol", "perro"], respuestaCorrecta: "avión" },
    { pregunta: "¿Qué comemos en el desayuno?", opciones: ["cereal", "silla", "teléfono"], respuestaCorrecta: "cereal" },
    { pregunta: "¿Qué instrumento se toca con las manos?", opciones: ["guitarra", "piano", "batería"], respuestaCorrecta: "piano" },
    { pregunta: "¿Cuál es el número mayor?", opciones: ["5", "8", "3"], respuestaCorrecta: "8" },
    { pregunta: "¿Qué es más rápido?", opciones: ["coche", "bicicleta", "avión"], respuestaCorrecta: "avión" },
    { pregunta: "¿Qué animal vuela?", opciones: ["pájaro", "perro", "gato"], respuestaCorrecta: "pájaro" },
    { pregunta: "¿Qué se usa para escribir?", opciones: ["lápiz", "cuchara", "vaso"], respuestaCorrecta: "lápiz" }
];

// Frases para completar parte 2 
const frasesParaCompletar = [
    { frase: "La ______ es roja y tiene semillas.", respuesta: "manzana" },
    { frase: "El ______ es amarillo y largo.", respuesta: "plátano" },
    { frase: "El ______ es un animal que hace 'guau'.", respuesta: "perro" },
    { frase: "El ______ es amarillo y nos da luz.", respuesta: "sol" },
    { frase: "La ______ es un dulce que se come.", respuesta: "paleta" },
    { frase: "El ______ es verde y se usa para la ensalada.", respuesta: "pepino" },
    { frase: "El ______ es un pájaro pequeño.", respuesta: "gorrión" },
    { frase: "El ______ es una fruta verde.", respuesta: "limón" },
    { frase: "La ______ es blanca y se bebe.", respuesta: "leche" },
    { frase: "La ______ es marrón y tiene caparazón.", respuesta: "tortuga" }
];

//oraciones parte 3
const oracionesParte3 = [
    { oracion: "El gato dice ______.", respuesta: "miau" },
    { oracion: "La manzana es ______.", respuesta: "roja" },
    { oracion: "El agua es ______.", respuesta: "transparente" },
    { oracion: "La nieve es ______.", respuesta: "fría" },
    { oracion: "El tren es ______.", respuesta: "largo" },
    { oracion: "El árbol tiene ______.", respuesta: "hojas" },
    { oracion: "La luna es ______.", respuesta: "redonda" },
    { oracion: "El pasto es ______.", respuesta: "verde" },
    { oracion: "El fuego es ______.", respuesta: "caliente" },
    { oracion: "El león es ______.", respuesta: "fuerte" }
];
// Palabras para arrastrar y soltar
const palabrasArrastrar = ["gato", "miau", "roja", "transparente", "fría", "largo", "hojas", "redonda", "verde", "caliente", "fuerte"];

// Función para seleccionar elementos aleatorios
function seleccionarAleatorios(arr, num) {
    return arr
        .sort(() => Math.random() - 0.5)
        .slice(0, num);
}

// Función para iniciar el examen
function iniciarExamen() {
    // Reiniciar las variables al inicio del examen
    respuestasCorrectas = 0;
    puntuacionTotal = 0;

    cargarPreguntas();
    mostrarParte(1);
}

document.getElementById("verificar-btn").addEventListener("click", function () {
    if (parteActual === 1) {
        validarParte1();
    } else if (parteActual === 2) {
        validarParte2();
    }
});

function cargarPreguntas() {
    const contenedorPreguntas = document.getElementById("preguntas-1");
    preguntasSeleccionadasParte1 = seleccionarAleatorios(preguntasParte1, 5); // Seleccionar preguntas al azar
    contenedorPreguntas.innerHTML = "";

    preguntasSeleccionadasParte1.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${index + 1}. ${item.pregunta}</p>` + // Agregar número a cada inciso 
            item.opciones.map(opcion => `<label><input type="radio" name="pregunta${index}" value="${opcion}"> ${opcion}</label>`).join("");
        contenedorPreguntas.appendChild(div);
    });
}

// En la función validarParte1
function validarParte1() {
    const todasRespondidas = preguntasSeleccionadasParte1.every((item, index) => {
        return document.querySelector(`input[name="pregunta${index}"]:checked`);
    });

    if (!todasRespondidas) {
        mostrarModal("Alerta: Debes responder todas las preguntas antes de continuar.");
        return;
    }

    preguntasSeleccionadasParte1.forEach((item, index) => {
        const respuestaSeleccionada = document.querySelector(`input[name="pregunta${index}"]:checked`);
        if (respuestaSeleccionada) {
            if (respuestaSeleccionada.value === item.respuestaCorrecta) {
                respuestasCorrectas++;
                puntuacionTotal += 5; 
            } else {
                puntuacionTotal -= 3; 
            }
        }
    });
    mostrarParte(2);
    cargarFrases();  // Cargar las frases de la segunda parte
}

function cargarFrases() {
    const contenedorFrases = document.getElementById("frases-completar");
    frasesSeleccionadasParte2 = seleccionarAleatorios(frasesParaCompletar, 5); // Seleccionar frases al azar
    contenedorFrases.innerHTML = "";

    frasesSeleccionadasParte2.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${index + 1}. ${item.frase}</p><input type="text" id="completar-${index}" />`; // Agregar número
        contenedorFrases.appendChild(div);
    });
}

function validarParte2() {
    const todasRespondidas = frasesSeleccionadasParte2.every((item, index) => {
        const respuesta = document.getElementById(`completar-${index}`).value.trim();
        return respuesta !== ""; // Verificar que todas las respuestas están completas
    });

    if (!todasRespondidas) {
        mostrarModal("Alerta: Debes llenar todas las frases antes de continuar.");
        return;
    }

    frasesSeleccionadasParte2.forEach((item, index) => {
        const respuesta = document.getElementById(`completar-${index}`).value.trim().toLowerCase();
        
        // Normalizar respuestas para quitar tildes
        const respuestaNormalizada = respuesta.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Normalizar la respuesta correcta de la frase
        const respuestaCorrectaNormalizada = item.respuesta.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (respuesta) {
            if (respuestaNormalizada === respuestaCorrectaNormalizada) {
                respuestasCorrectas++;
                puntuacionTotal += 5; 
            } else {
                puntuacionTotal -= 3; 
            }
        }
    });
    mostrarParte(3);
}

// Función para cargar las oraciones de la parte 3
function cargarOracionesArrastrar() {
    const contenedorOraciones = document.getElementById("oraciones-arrastrar");
    oracionesSeleccionadasParte3 = seleccionarAleatorios(oracionesParte3, 5); // Seleccionar oraciones al azar
    contenedorOraciones.innerHTML = "";

    oracionesSeleccionadasParte3.forEach((item, index) => {
        const div = document.createElement("div");
        // Añadir numeración a las oraciones
        div.innerHTML = `<p>${index + 1}. ${item.oracion.replace('______', `<span id="dropzone-${index}" class="dropzone"></span>`)}</p>`;
        contenedorOraciones.appendChild(div);
    
        const dropzone = document.getElementById(`dropzone-${index}`);
        dropzone.addEventListener("dragover", onDragOver);  // Permitir el arrastre sobre la zona
        dropzone.addEventListener("drop", onDrop);          // Permitir soltar en la zona
    });
    
    cargarPalabrasArrastrar(); // Cargar palabras para arrastrar
}

// Función para cargar las palabras arrastrables para la parte 3
function cargarPalabrasArrastrar() {
    const contenedorPalabras = document.getElementById("palabras-arrastrar-3");
    contenedorPalabras.innerHTML = "";

    palabrasArrastrar.forEach((palabra, index) => {
        const palabraElemento = document.createElement("div");
        palabraElemento.textContent = palabra;
        palabraElemento.setAttribute("draggable", "true");
        palabraElemento.id = `palabra-${index}-3`;
        palabraElemento.classList.add("draggable");
        palabraElemento.addEventListener("dragstart", onDragStart);
        contenedorPalabras.appendChild(palabraElemento);
    });
}

function onDragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    event.preventDefault();
    const idPalabra = event.dataTransfer.getData("text");
    const palabraArrastrada = document.getElementById(idPalabra);

    // Añadir la palabra a la zona de soltar
    if (event.target.classList.contains("dropzone") && !event.target.hasChildNodes()) {
        event.target.appendChild(palabraArrastrada);
        palabraArrastrada.setAttribute("draggable", "false");  // Desactivar arrastre después de soltar
    }
}

function validarParte3() {
    const todasRespondidas = oracionesSeleccionadasParte3.every((item, index) => {
        const respuesta = document.getElementById(`dropzone-${index}`).textContent.trim();
        return respuesta !== ""; // Verificar que todas las respuestas están completas
    });

    if (!todasRespondidas) {
        mostrarModal("Alerta: Debes llenar todas las oraciones antes de continuar.");
        return;
    }

    oracionesSeleccionadasParte3.forEach((item, index) => {
        const respuesta = document.getElementById(`dropzone-${index}`).textContent.trim().toLowerCase();
        if (respuesta === item.respuesta.toLowerCase()) {
            respuestasCorrectas++;
            puntuacionTotal += 5; 
        } else {
            puntuacionTotal -= 3; 
        }
    });

    mostrarResultadosFinales();
}

document.getElementById("finalizar-btn").addEventListener("click", function () {
    if (parteActual === 3) {
        validarParte3();
    }
});

function mostrarParte(parte) {
    console.log("Mostrando parte:", parte);  
    document.getElementById(`parte-${parteActual}`).style.display = "none";
    
    // Mostrar la nueva parte
    document.getElementById(`parte-${parte}`).style.display = "block";
    parteActual = parte;

    if (parte === 3) {
        cargarOracionesArrastrar(); 
        document.getElementById("verificar-btn").style.display = "none";
        document.getElementById("finalizar-btn").style.display = "block";
    } else {
        document.getElementById("verificar-btn").style.display = "block";
        document.getElementById("finalizar-btn").style.display = "none";
    }
}

function mostrarResultadosFinales() {
    // Verificar si los puntos ya han sido enviados
    if (!puntosEnviados) {
        document.getElementById("resultado-final").textContent = `Has acertado ${respuestasCorrectas} respuestas. Puntuación total: ${puntuacionTotal}`;
        document.getElementById("resultado-final").style.display = "block";

        const mensajeAdicional = "Recuerda que puedes volver a los módulos para mejorar tu conocimiento. Cuando quieras volver hacer el examen completa los modulos del 1 al 3 nuevamente :D Buena suerte";
        mostrarModal(`¡Felicidades, terminaste el examen!\n\n${mensajeAdicional}`);

        enviarPuntos(puntuacionTotal); 
        puntosEnviados = true; 
    } else {
        console.log("Los puntos ya han sido enviados.");
    }

    // Limpiar claves de los modulos en el LocalStorage
    localStorage.removeItem('modulo1Completo');
    localStorage.removeItem('modulo2Completo');
    localStorage.removeItem('modulo3Completo');
}

function mostrarModal(mensaje) {
    document.getElementById("modal-mensaje").textContent = mensaje;
    document.getElementById("modal").style.display = "block";
}

document.getElementById("close-modal").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
});

// Cerrar el modal al hacer clic fuera de él
document.getElementById("modal").addEventListener("click", function (event) {
    if (event.target === this) {
        this.style.display = "none";
    }
});

// Regresar a la página principal
document.getElementById("regresar-btn").addEventListener("click", function () {
    window.location.href = 'index.php';
});

// Función para enviar puntos al servidor
function enviarPuntos(puntuacion) {
    const modulo = 5; // Número de módulo que corresponda

    fetch('guardar_puntos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            puntos: puntuacion,
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

// Iniciar el examen al cargar
window.onload = iniciarExamen;