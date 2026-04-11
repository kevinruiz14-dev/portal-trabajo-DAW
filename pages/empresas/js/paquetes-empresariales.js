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

    localStorage.setItem('pagos', JSON.stringify(pagos))

    window.location.href = "paquetes-empresariales.html"
}