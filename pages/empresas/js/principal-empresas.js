document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('btnPostularme').addEventListener('click', function () {
        window.location.href = '../usuario/empleos.html';
    });

     let nombre = localStorage.getItem('usuarioNombre');

      if (nombre) {
    document.getElementById('nombreUsuario').textContent = nombre;
    } else {
    document.getElementById('nombreUsuario').textContent = 'Usuario';
    }

    document.getElementById('btnEmpleos').addEventListener('click', function () {
        window.location.href = '../usuario/empleos.html';
    });

    document.getElementById('btnForo').addEventListener('click', function () {
        window.location.href = '../usuario/foro.html';
    });

    document.getElementById('btnEstadisticas').addEventListener('click', function () {
        window.location.href = '../usuario/estadisticas.html';
    });

    document.getElementById('btnConsejos').addEventListener('click', function () {
        window.location.href = '../usuario/consejos.html';
    });

});