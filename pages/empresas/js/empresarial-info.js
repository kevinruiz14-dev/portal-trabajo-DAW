document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('a[href="Inicio-CE.html"]').addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = '../usuario/Inicio-Sesión-general.html';
    });

    document.getElementById('btnPublicar').addEventListener('click', function () {
        window.location.href = '../usuario/Inicio-Sesión-general.html';
    });

    document.getElementById('btnEncontrar').addEventListener('click', function () {
        window.location.href = '../usuario/Inicio-Sesión-general.html';
    });

});
