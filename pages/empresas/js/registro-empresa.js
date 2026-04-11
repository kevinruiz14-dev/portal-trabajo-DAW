document.querySelector('button[type="button"]').addEventListener('click', function () {

    let inputs = document.querySelectorAll('input, select')
    let mensajeError = document.getElementById('mensajeError')
    let todoLleno = true

    inputs.forEach(function (campo) {
        if (campo.type == 'file') return

        let valor = campo.value.trim()

        let valoresVacios = ['', 'País', 'Departamento', 'Ciudad', 'Selecciona el sector', 'Nº de trabajadores', 'Nº de vacantes anuales']

        if (valoresVacios.includes(valor)) {
            todoLleno = false
            campo.classList.add('is-invalid')
        } else {
            campo.classList.remove('is-invalid')
            campo.classList.add('is-valid')
        }
    })

    if (todoLleno == true) {
        mensajeError.classList.add('d-none')
        window.location.href = 'Pagina-principal-empresas.html'
    } else {
        mensajeError.classList.remove('d-none')
    }
})

document.querySelectorAll('input, select').forEach(function (campo) {
    campo.addEventListener('input', function () {
        document.getElementById('mensajeError').classList.add('d-none')
    })
})