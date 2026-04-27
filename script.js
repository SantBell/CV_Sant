const comandos = {
  "experiencia": "Desarrollo de sistemas administrativos y gestión legal...",
  "tech": "VBA, SQL, Python, JavaScript, .NET C#",
  "contacto": "Enviando mensaje..."
};

// Función simple para procesar la entrada del usuario
function procesarComando(input) {
  const output = comandos[input.toLowerCase()] || "Comando no reconocido. Prueba con 'tech' o 'experiencia'.";
  document.getElementById("terminal-output").innerText = output;
}

const textoElemento = document.getElementById("typing-text");
const frases = [
    "Desarrollador de Sistemas",
    "Especialista en Automatización",
    "Experto en Ciberseguridad Forense",
    "Analista de Bases de Datos"
];

let fraseIndex = 0;
let caracterIndex = 0;
let borrando = false;

function animarTexto() {
    const fraseActual = frases[fraseIndex];
    
    if (borrando) {
        // Quitar caracteres
        textoElemento.innerHTML = fraseActual.substring(0, caracterIndex - 1) + '<span class="cursor">|</span>';
        caracterIndex--;
    } else {
        // Poner caracteres
        textoElemento.innerHTML = fraseActual.substring(0, caracterIndex + 1) + '<span class="cursor">|</span>';
        caracterIndex++;
    }

    // Lógica de cambio de estado
    let velocidad = borrando ? 50 : 100;

    if (!borrando && caracterIndex === fraseActual.length) {
        velocidad = 2000; // Pausa cuando la frase está completa
        borrando = true;
    } else if (borrando && caracterIndex === 0) {
        borrando = false;
        fraseIndex = (fraseIndex + 1) % frases.length; // Pasar a la siguiente frase
        velocidad = 500;
    }

    setTimeout(animarTexto, velocidad);
}

window.onload = animarTexto;

const observerOptions = {
    threshold: 0.2 // Se activa cuando el 20% del elemento es visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Seleccionamos lo que queremos animar
document.querySelectorAll('section, .project-card').forEach(el => {
    el.classList.add('reveal'); // Añadimos la clase inicial
    observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("terminal-input");
    const output = document.getElementById("terminal-output");
    const body = document.getElementById("terminal-body");

    const comandos = {
        "help": "Comandos disponibles: <br> - <b>about</b>: Resumen profesional <br> - <b>skills</b>: Mi stack técnico <br> - <b>clear</b>: Limpiar terminal <br> - <b>contact</b>: Redes sociales",
        "about": "Santiago Soriano: Especialista en sistemas administrativos y ciberseguridad.",
        "skills": "Python, SQL, VBA, JS, C#.",
        "contact": "LinkedIn: /santiago-soriano",
        "clear": "clear"
    };

    // Escuchar la tecla Enter
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const valor = input.value.toLowerCase().trim();
            
            // 1. Crear línea de lo que escribió el usuario
            const userLine = document.createElement("div");
            userLine.innerHTML = `<span style="color: #38bdf8">santiago@system:~$</span> ${valor}`;
            output.appendChild(userLine);

            // 2. Lógica de respuesta
            if (valor === "clear") {
                output.innerHTML = "Escribe 'help' para ver los comandos disponibles.";
            } else if (valor !== "") {
                const result = document.createElement("div");
                result.style.marginBottom = "10px";
                result.innerHTML = comandos[valor] || `Comando '${valor}' no encontrado.`;
                output.appendChild(result);
            }

            // 3. Limpiar y hacer scroll
            input.value = "";
            body.scrollTop = body.scrollHeight;
        }
    });
});

const form = document.getElementById("contact-form");

async function handleSubmit(event) {
  event.preventDefault(); // Evita que la página salte al enviar
  const status = document.querySelector(".btn-enviar");
  const data = new FormData(event.target);

  status.innerText = "Enviando...";

  fetch(event.target.action, {
    /* method: form.method, */
    method: 'POST',
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerText = "¡Mensaje Enviado!";
      status.style.backgroundColor = "#27c93f"; // Cambia a verde éxito
      form.reset();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert("Oops! Hubo un problema al enviar el formulario");
        }
      })
    }
  }).catch(error => {
    alert("Error de conexión al servidor.");
  });
}

form.addEventListener("submit", handleSubmit);