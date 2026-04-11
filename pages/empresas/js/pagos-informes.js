document.addEventListener('DOMContentLoaded', function () {

    // PLAN ACTUAL
    let plan = {
        nombre: "Premium",
        precio: 25,
        beneficios: [
            "10 vacantes activas",
            "Acceso a candidatos destacados",
            "Estadísticas avanzadas"
        ]
    };

    // PAGOS
    let pagos = [
        { fecha: "10/03/2025", plan: "Premium", monto: 25, estado: "Pagado" },
        { fecha: "01/03/2025", plan: "Básico", monto: 10, estado: "Pagado" },
        { fecha: "20/03/2025", plan: "Premium", monto: 25, estado: "Pendiente" }
    ];

    // MUESTRA PLAN ACTUAL
    let contenedorPlan = document.getElementById('planActual');

    contenedorPlan.innerHTML = `
        <h5 class="fw-bold text-primary">${plan.nombre}</h5>
        <p class="mb-1">Precio: $${plan.precio}</p>
        <ul>
            ${plan.beneficios.map(b => `<li>${b}</li>`).join('')}
        </ul>
    `;

    // MUESTRA PAGOS
    let contenedorPagos = document.getElementById('historialPagos');

    pagos.forEach(function (pago, i) {

        let div = document.createElement('div')
        div.className = 'card p-3 mb-3 shadow-sm'

        let colorEstado = ''
        if (pago.estado == 'Pagado') {
            colorEstado = 'bg-success'
        } else {
            colorEstado = 'bg-warning text-dark'
        }

        div.innerHTML = `
            <h6 class="fw-bold">${pago.plan}</h6>
            <p class="mb-1">Fecha: ${pago.fecha}</p>
            <p class="mb-1">Monto: $${pago.monto}</p>
            <span class="badge ${colorEstado}">${pago.estado}</span>
        `

        // solo los pendientes se pueden marcar
        if (pago.estado == 'Pendiente') {
            div.style.cursor = 'pointer'

            div.addEventListener('click', (event) => {
                event.currentTarget.classList.toggle('pagoCompletado')

                let badge = event.currentTarget.querySelector('.badge')
                let estaCompletado = event.currentTarget.classList.contains('pagoCompletado')

                if (estaCompletado) {
                    badge.className = 'badge bg-success'
                    badge.textContent = 'Pagado'
                    pagos[i].estado = 'Pagado'
                } else {
                    badge.className = 'badge bg-warning text-dark'
                    badge.textContent = 'Pendiente'
                    pagos[i].estado = 'Pendiente'
                }
            })
        }

        contenedorPagos.appendChild(div)
    })

})