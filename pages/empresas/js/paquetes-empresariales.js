function seleccionarPlan(nombre, precio) {

    localStorage.setItem('planActual', nombre)

    let pagos = JSON.parse(localStorage.getItem('pagos'))

    if (pagos == null) {
        pagos = []
    }

    let fecha = new Date().toLocaleDateString()

    pagos.push({
        fecha: fecha,
        plan: nombre,
        monto: precio,
        estado: "Pendiente"
    })

    // muestra el nombre del plan en el modal
    document.getElementById('nombrePlanModal').textContent = nombre

    // abre el modal
    let modal = new bootstrap.Modal(document.getElementById('modalPlan'))
    modal.show()
}
