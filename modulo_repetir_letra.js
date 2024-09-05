let palabrasPorLetra = {
    A: ["Amor", "Amigo", "Árbol"],
    B: ["Barco", "Beso", "Bailar"],
    C: ["Casa", "Cielo", "Correr"],
    // Agrega más letras y palabras aquí
};

let palabrasSeleccionadas = [];
let indicePalabraActual = 0;
let letraSeleccionada = null;
let moduloFinalizado = false;

function mostrarSiguientePalabra() {
    // Verificar si el módulo ya finalizó
    if (indicePalabraActual < palabrasSeleccionadas.length) {
        document.getElementById("palabra").textContent = palabrasSeleccionadas[indicePalabraActual];
        indicePalabraActual++;
        actualizarProgreso();

        // Ocultar el botón "Seguir" y "Escuchar" cuando se llegue a la última palabra
        if (indicePalabraActual === palabrasSeleccionadas.length) {
            moduloFinalizado = true;
            document.getElementById("seguir-button").textContent = "Finalizar"; // Cambia el texto del botón
        }
    } else if (moduloFinalizado) {
        // Si ya hemos llegado al final, mostramos el modal final
        mostrarModalFinal();
    }
}

function reproducirAudio() {
    let palabraActual = document.getElementById("palabra").textContent;
    let utterance = new SpeechSynthesisUtterance(palabraActual);
    speechSynthesis.speak(utterance);
}

function reiniciarModulo() {
    indicePalabraActual = 0;
    letraSeleccionada = null;
    palabrasSeleccionadas = [];
    moduloFinalizado = false;
    document.getElementById("resultados").style.display = "none";
    document.getElementById("seguir-button").style.display = "inline-block";
    document.getElementById("escuchar-button").style.display = "inline-block";
    document.getElementById("palabra").style.display = "block"; // Asegurarse de que se muestre de nuevo
    document.getElementById("seguir-button").textContent = "Seguir"; // Restablecer el texto del botón
    abrirModal('modal-letras');
    actualizarProgreso();
}

function regresar() {
    window.location.href = 'index.html'; 
}

function actualizarProgreso() {
    document.getElementById("progreso").value = indicePalabraActual;
    document.getElementById("progreso").max = palabrasSeleccionadas.length;
}

function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function abrirModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function seleccionarLetra(letra) {
    letraSeleccionada = letra;
    palabrasSeleccionadas = palabrasPorLetra[letra];
    indicePalabraActual = 0;
    actualizarProgreso();
    cerrarModal('modal-letras');
    mostrarSiguientePalabra();
}

function mostrarModalFinal() {
    // Ocultar botones de "Seguir" y "Escuchar"
    document.getElementById("seguir-button").style.display = "none";
    document.getElementById("escuchar-button").style.display = "none";
    document.getElementById("palabra").style.display = "none";  // Ocultar la palabra actual

    // Mostrar el modal final con las palabras seleccionadas
    const resultadosDiv = document.getElementById("palabras-mostradas");
    resultadosDiv.innerHTML = "";  // Limpiar contenido previo
    palabrasSeleccionadas.forEach(palabra => {
        const palabraElement = document.createElement("p");
        palabraElement.textContent = palabra;
        resultadosDiv.appendChild(palabraElement);
    });

    // Mostrar los botones para volver a jugar o regresar
    document.getElementById("volver-jugar-btn").style.display = "inline-block";
    document.getElementById("regresar-btn").style.display = "inline-block";

    // Mostrar la sección de resultados
    document.getElementById("resultados").style.display = "block";

    // Abrir el modal final
    abrirModal('modal-final');
}

// Evento de clic para el botón "Seguir"
document.getElementById("seguir-button").onclick = function() {
    if (moduloFinalizado) {
        mostrarModalFinal(); // Aquí se mostrará el modal cuando finalice
    } else {
        mostrarSiguientePalabra();
    }
};

document.getElementById("escuchar-button").onclick = function() {
    reproducirAudio();
};

// Cerrar el modal final cuando se hace clic fuera de él o en el botón "Listo"
document.getElementById("listo-btn").onclick = function() {
    cerrarModal('modal-final');
};

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        cerrarModal('modal-final');
    }
};

document.getElementById("volver-jugar-btn").onclick = function() {
    reiniciarModulo(); // Volver a jugar reiniciando el módulo
};


document.getElementById("regresar-btn").onclick = function() {
    window.location.href = 'index.html';
    regresar(); // Regresar a la pantalla principal
};

function generarLetras() {
    const letrasContainer = document.getElementById("letras-container");
    Object.keys(palabrasPorLetra).forEach(letra => {
        const btn = document.createElement("button");
        btn.textContent = letra;
        btn.onclick = () => seleccionarLetra(letra);
        letrasContainer.appendChild(btn);
    });
}

// Inicialización
window.onload = function() {
    generarLetras();
    abrirModal('modal-letras');
};
