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
let totalImagenes = 5;
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
        alert("Ingresa una respuesta para poder continuar :D.");
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
    document.getElementById("titulo-cambiar-imagen").style.display = "none"; 
    document.getElementById("cambiar-imagen-btn").style.display = "none"; 
    
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

function reiniciarModulo() {
    respuestasCorrectas = 0;
    indiceImagenActual = 0;
    respuestasUsuario = [];
    
    // Seleccionar 5 imágenes al azar nuevamente
    imagenesSeleccionadas = imagenesYRespuestas.sort(() => 0.5 - Math.random()).slice(0, totalImagenes);
    
    // Mostrar los contenedores relevantes y ocultar el de resultados
    document.getElementById("imagen-container").style.display = "block";
    document.getElementById("respuesta-container").style.display = "block";
    document.getElementById("mensaje-container").style.display = "block";
    document.getElementById("resultados-container").style.display = "none";

    document.getElementById("titulo-cambiar-imagen").style.display = "block"; 
    document.getElementById("cambiar-imagen-btn").style.display = "block";
    
 // Reiniciar la barra de progreso
 document.getElementById("barra-progreso").value = 0;

    // Cargar la primera imagen
    cargarImagen();
}

function iniciarCuentaRegresiva() {
    const cuentaRegresiva = document.getElementById("cuenta-regresiva");
    const elementosParaOcultar = [
        document.getElementById("barra-progreso-container"),
        document.getElementById("imagen-container"),
        document.getElementById("titulo-cambiar-imagen"),
        document.getElementById("respuesta-container"),
        document.getElementById("mensaje-container"),
        document.getElementById("cambiar-imagen-btn")
    ];
    
    let tiempo = 3; // Cuenta regresiva de 3 segundos
    
    cuentaRegresiva.style.display = "block";
    cuentaRegresiva.style.fontSize = "72px";  // Tamaño de la fuente más grande
    cuentaRegresiva.style.color = "yellow";   // Color amarillo
    cuentaRegresiva.style.textAlign = "center";
    cuentaRegresiva.style.position = "absolute";
    cuentaRegresiva.style.top = "50%";
    cuentaRegresiva.style.left = "50%";
    cuentaRegresiva.style.transform = "translate(-50%, -50%)";

    // Oculta los otros elementos
    elementosParaOcultar.forEach(elemento => elemento.style.display = "none");

    const intervalo = setInterval(() => {
        cuentaRegresiva.textContent = tiempo;
        tiempo--;

        if (tiempo < 0) {
            clearInterval(intervalo);
            cuentaRegresiva.style.display = "none";
            
            // Muestra nuevamente los otros elementos
            elementosParaOcultar.forEach(elemento => elemento.style.display = "block");

            iniciarModulo(); // Iniciar el módulo después de la cuenta regresiva
        }
    }, 1000);
}



// Función para regresar a la página principal
function regresar() {
    window.location.href = 'index.html';
}

// Iniciar el módulo cuando la página se carga
window.onload = iniciarModulo;
