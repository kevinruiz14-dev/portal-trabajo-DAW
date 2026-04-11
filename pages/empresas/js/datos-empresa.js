document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('.data-box a').addEventListener('click', function (e) {
        e.preventDefault()

        let parrafos = document.querySelectorAll('.col-md-8 p')
        let columna = document.querySelector('.col-md-8')

        if (parrafos.length > 0) {

            this.textContent = 'Guardar'
            columna.style.paddingTop = '30px'

            // cambio cada parrafo por un input
            parrafos.forEach(function (p, i) {
                let input = document.createElement('input')
                input.className = 'form-control mb-2'
                input.value = p.textContent

                if (i == 4) {
                    input.type = 'password'
                }

                p.replaceWith(input)
            })

        } else {


            // Verificar que no hay campos vacios
            inputs.forEach(function (input) {
                if (input.value.trim() == '') {
                    input.style.border = '2px solid red'
                    vacio = true
                } else {
                    input.style.border = ''
                }
            })

            if (vacio == true) {
                document.getElementById('mensajeError').classList.remove('d-none')
                document.getElementById('mensajeExito').classList.add('d-none')
                return
            }

            inputs.forEach(function (input, i) {
                let p = document.createElement('p')

                if (i == 4) {
                    p.textContent = '***************'
                } else {
                    p.textContent = input.value
                }

                input.replaceWith(p)
            })

            columna.style.paddingTop = ''
            this.textContent = '✏️ Editar'
            document.getElementById('mensajeExito').classList.remove('d-none')
            document.getElementById('mensajeError').classList.add('d-none')
        }
    })

    document.getElementById('btnAgregarUsuario').addEventListener('click', function () {

        let correo = document.getElementById('nuevoUsuario').value.trim()

        if (correo == '') {
            document.getElementById('errorUsuario').classList.remove('d-none')
            return
        }

        document.getElementById('errorUsuario').classList.add('d-none')

        // Verificar si el correo existe
        let lista = document.querySelectorAll('#listaUsuarios li')
        let existe = false

        for (let i = 0; i < lista.length; i++) {
            if (lista[i].textContent.includes(correo)) {
                existe = true
            }
        }

        if (existe == true) {
            alert('Este usuario ya existe')
            return
        }

        // lo agrego al modal
        let li = document.createElement('li')
        li.className = 'list-group-item d-flex justify-content-between align-items-center'
        li.innerHTML = correo + ' <button class="btn btn-sm btn-danger btnEliminar">X</button>'
        document.getElementById('listaUsuarios').appendChild(li)

        // lo agrego a la vista principal
        let liVista = document.createElement('li')
        liVista.className = 'list-group-item'
        liVista.textContent = correo
        document.getElementById('usuariosVista').appendChild(liVista)

        document.getElementById('nuevoUsuario').value = ''
    })

    document.getElementById('listaUsuarios').addEventListener('click', function (e) {
        if (e.target.classList.contains('btnEliminar')) {
            e.target.parentElement.remove()
        }
    })

})