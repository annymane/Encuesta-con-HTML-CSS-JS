document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('encuestaForm');
    const gridEncuestas = document.getElementById('encuestasGrid');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        const respuestas = obtenerRespuestas();
        if (respuestas.length === 4) {
            agregarEncuesta(respuestas);
            guardarEncuestas();
            limpiarFormulario();
        } else {
            alert('Por favor, responde todas las preguntas.');
        }
    });

    function obtenerRespuestas() {
        const respuestas = [];
        respuestas.push(document.getElementById('pregunta1').value);
        respuestas.push(document.getElementById('pregunta2').value);
        respuestas.push(document.getElementById('pregunta3').value);
         respuestas.push(document.getElementById('pregunta4').value);
        return respuestas;
    }

    function agregarEncuesta(respuestas) {
        const encuestaDiv = document.createElement('div');
        encuestaDiv.classList.add('encuesta');
        encuestaDiv.innerHTML = `
            <p><strong>Ingresa tus nombres:</strong> ${respuestas[0]}</p>
            <p><strong>Ingresa tus apellidos:</strong> ${respuestas[1]}</p>
            <p><strong>Ingresa tu edad:</strong> ${respuestas[2]}</p>
            <p><strong>Ingresa tu correo:</strong> ${respuestas[3]}</p>

            <button class="eliminar">Eliminar</button>
        `;
        gridEncuestas.appendChild(encuestaDiv);
        encuestaDiv.querySelector('.eliminar').addEventListener('click', function() {
            encuestaDiv.remove();
            guardarEncuestas();
        });
    }

    function guardarEncuestas() {
        const encuestas = [];
        document.querySelectorAll('.encuesta').forEach(function(encuestaDiv) {
            const preguntas = [
                encuestaDiv.querySelector('p:nth-child(1)').textContent.split(':')[1].trim(),
                encuestaDiv.querySelector('p:nth-child(2)').textContent.split(':')[1].trim(),
                encuestaDiv.querySelector('p:nth-child(3)').textContent.split(':')[1].trim(),
                encuestaDiv.querySelector('p:nth-child(4)').textContent.split(':')[1].trim()
            ];
            encuestas.push(preguntas);
        });
        localStorage.setItem('encuestas', JSON.stringify(encuestas));
    }

    function limpiarFormulario() {
        formulario.reset();
    }

    function cargarEncuestasGuardadas() {
        const encuestas = JSON.parse(localStorage.getItem('encuestas'));
        if (encuestas) {
            encuestas.forEach(function(respuestas) {
                agregarEncuesta(respuestas);
            });
        }
    }

    cargarEncuestasGuardadas(); // Cargar las encuestas al cargar la página
});
