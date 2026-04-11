document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('btnBuscar').addEventListener('click', function () {

        let cargo = document.getElementById('inputCargo').value.toLowerCase();
        let ubicacion = document.getElementById('inputUbicacion').value.toLowerCase();

        let empleos = [
            { cargo: "repartidor", ubicacion: "san salvador" },
            { cargo: "vendedor", ubicacion: "santa ana" },
            { cargo: "desarrollador", ubicacion: "san salvador" },
            { cargo: "cajero", ubicacion: "sonsonate" }
        ];

        let resultados = empleos.filter(function (empleo) {
            return (
                (cargo === '' || empleo.cargo.toLowerCase().includes(cargo)) &&
                (ubicacion === '' || empleo.ubicacion.toLowerCase().includes(ubicacion))
            );
        });

        mostrarResultados(resultados);
    });

    //  MOSTRAR RESULTADOS
    function mostrarResultados(lista) {
        let contenedor = document.getElementById('resultados');
        contenedor.innerHTML = '';

        if (lista.length === 0) {
            contenedor.innerHTML = '<p class="text-center mt-3">No se encontraron resultados</p>';
            return;
        }

        lista.forEach(function (empleo) {
            let div = document.createElement('div');
            div.className = 'card p-3 mb-3 shadow-sm';

            div.innerHTML = `
                <h5 class="fw-bold text-primary">${empleo.cargo}</h5>
                <p class="mb-0 text-muted"><i class="bi bi-geo-alt"></i> ${empleo.ubicacion}</p>
            `;

            contenedor.appendChild(div);
        });
    }

    // BOTONES
    document.getElementById('btnPostularme').addEventListener('click', function () {
        window.location.href = '../usuario/empleos.html';
    });

    document.getElementById('btnRecursos').addEventListener('click', function () {
        window.location.href = '../usuario/recursos.html';
    });

});