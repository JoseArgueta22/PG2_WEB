let palabrasPorLetra = {
    A: ["Amor", "Amigo", "Árbol", "Avión", "Abrigo", "Arco", "Arena", "Aire", "Anillo", "Ave"],
    B: ["Barco", "Beso", "Bailar", "Bola", "Bebé", "Batería", "Bicicleta", "Boca", "Buzo", "Bandera"],
    C: ["Casa", "Cielo", "Correr", "Coche", "Camino", "Cebra", "Cuchara", "Café", "Camisa", "Carro"],
    D: ["Dado", "Danza", "Diamante", "Delfín", "Dedo", "Diente", "Dios", "Dinero", "Dulce", "Desierto"],
    E: ["Elefante", "Espejo", "Escuela", "Estrella", "Espada", "Escritorio", "Estación", "Escalera", "Espacio", "Ensalada"],
    F: ["Flor", "Fruta", "Fuego", "Falda", "Frío", "Fuente", "Foca", "Flecha", "Fantasma", "Faro"],
    G: ["Gato", "Globo", "Guitarra", "Gorra", "Guante", "Ganso", "Gol", "Galleta", "Goma", "Grillo"],
    H: ["Huevo", "Helado", "Hilo", "Hoja", "Hermano", "Hormiga", "Hacha", "Héroe", "Helicóptero", "Hotel"],
    I: ["Isla", "Iglesia", "Imán", "Ídolo", "Invierno", "Insecto", "Iris", "Idea", "Inteligente", "Instituto"],
    J: ["Jardín", "Jirafa", "Juguete", "Jugo", "Juego", "Joya", "Juez", "Jabón", "Jirón", "Jirón"],
    K: ["Koala", "Kilo", "Karate", "Kiwi", "Kilómetro", "Kárate", "Karaoke", "Kiosco", "Koan", "Karma"],
    L: ["Luna", "Lápiz", "Libro", "Luz", "León", "Lago", "Lobo", "Llorar", "Lluvia", "Lentejas"],
    M: ["Manzana", "Mesa", "Montaña", "Mar", "Martillo", "Mosca", "Mango", "Moto", "Miel", "Médico"],
    N: ["Nube", "Nido", "Naranja", "Nieve", "Nariz", "Nota", "Niña", "Noche", "Nave", "Nuez"],
    O: ["Oso", "Ola", "Oreja", "Olivo", "Ojo", "Oro", "Obra", "Olla", "Oscuro", "Oruga"],
    P: ["Perro", "Pelota", "Pato", "Piedra", "Paloma", "Plato", "Parque", "Puerta", "Playa", "Pez"],
    Q: ["Queso", "Quinto", "Quimera", "Quinto", "Quijote", "Querido", "Quena", "Quimono", "Quiste", "Química"],
    R: ["Ratón", "Río", "Rosa", "Roca", "Rey", "Rueda", "Risa", "Rana", "Robot", "Rayo"],
    S: ["Sol", "Silla", "Sapo", "Sombrero", "Sopa", "Sombra", "Sierra", "Sirena", "Serpiente", "Sueño"],
    T: ["Tigre", "Taza", "Tierra", "Techo", "Tenedor", "Teléfono", "Tortuga", "Trompeta", "Tren", "Tomate"],
    U: ["Uva", "Universo", "Unicornio", "Uña", "Ukelele", "Urraca", "Uniforme", "Ulises", "Urbano", "Utopía"],
    V: ["Vaca", "Viento", "Vela", "Valle", "Vampiro", "Ventana", "Violeta", "Verano", "Vino", "Volar"],
    W: ["Wafle", "Web", "Wifi", "Whisky", "Wok", "Wombat", "Walkman", "Washington", "Wasabi", "Watt"],
    X: ["Xilófono", "Xenón", "Xilografía", "Xenofobia", "Xenófobo", "Xenial", "Xenófago", "Xenops", "Xerox", "Xero"],
    Y: ["Yate", "Yogur", "Yodo", "Yunque", "Yegua", "Yema", "Yuyo", "Yodoformo", "Yeti", "Yegua"],
    Z: ["Zapato", "Zorro", "Zanahoria", "Zebra", "Zueco", "Zafiro", "Zanja", "Zarza", "Zoológico", "Zumbido"],
};

let palabrasSeleccionadas = [];
let indicePalabraActual = 0;
let letraSeleccionada = null;
let moduloFinalizado = false;

function seleccionarPalabrasAleatorias(palabras) {
    let seleccionadas = [];
    let indicesUsados = new Set();
    
    while (seleccionadas.length < 5) {
        let indiceAleatorio = Math.floor(Math.random() * palabras.length);
        if (!indicesUsados.has(indiceAleatorio)) {
            seleccionadas.push(palabras[indiceAleatorio]);
            indicesUsados.add(indiceAleatorio);
        }
    }
    
    return seleccionadas;
}

function mostrarSiguientePalabra() {
    if (indicePalabraActual < palabrasSeleccionadas.length) {
        document.getElementById("palabra").textContent = palabrasSeleccionadas[indicePalabraActual];
        indicePalabraActual++;
        actualizarProgreso();

        if (indicePalabraActual === palabrasSeleccionadas.length) {
            moduloFinalizado = true;
            document.getElementById("seguir-button").textContent = "Finalizar";
        }
    } else if (moduloFinalizado) {
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
    document.getElementById("palabra").style.display = "block"; 
    document.getElementById("seguir-button").textContent = "Seguir"; 
    abrirModal('modal-letras');
    actualizarProgreso();
}

function regresar() {
    window.location.href = 'index.php'; 
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
    palabrasSeleccionadas = seleccionarPalabrasAleatorias(palabrasPorLetra[letra]);  
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

    // Mostrar los puntos obtenidos
    let puntosObtenidos = document.getElementById("puntos-obtenidos");
    if (puntosObtenidos) {
        puntosObtenidos.textContent = "¡Has ganado 25 puntos!";
    } else {
        console.error('El elemento #puntos-obtenidos no se encontró en el DOM.');
    }

    // Mostrar los botones para volver a jugar o regresar
    document.getElementById("volver-jugar-btn").style.display = "inline-block";
    document.getElementById("regresar-btn").style.display = "inline-block";

    // Mostrar la sección de resultados
    document.getElementById("resultados").style.display = "block";

    // Abrir el modal final
    abrirModal('modal-final');

    // Enviar puntos al servidor
    enviarPuntos(25);
}

function enviarPuntos(puntos) {
    fetch('guardar_puntos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            puntos: puntos,
            modulo: 4 // Cambia esto según el módulo actual
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
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
