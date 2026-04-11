document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('.data-box a').addEventListener('click', function (e) {
        e.preventDefault()

        let parrafos = document.querySelectorAll('.col-md-8 p')
        let columna = document.querySelector('.col-md-8')

        if (parrafos.length > 0) {

            this.textContent = 'Guardar'
            columna.style.paddingTop = '30px'

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

            let inputs = document.querySelectorAll('.col-md-8 input')
            let vacio = false

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

        let li = document.createElement('li')
        li.className = 'list-group-item d-flex justify-content-between align-items-center'
        li.innerHTML = correo + ' <button class="btn btn-sm btn-danger btnEliminar">X</button>'
        document.getElementById('listaUsuarios').appendChild(li)

        let liVista = document.createElement('li')
        liVista.className = 'list-group-item'
        liVista.textContent = correo
        // guardo el correo en un atributo para identificarlo despues
        liVista.setAttribute('data-correo', correo)
        document.getElementById('usuariosVista').appendChild(liVista)

        document.getElementById('nuevoUsuario').value = ''
    })

    // cuando elimino un usuario del modal tambien lo borro de la vista
    document.getElementById('listaUsuarios').addEventListener('click', function (e) {
        if (e.target.classList.contains('btnEliminar')) {

            let correo = e.target.parentElement.firstChild.textContent.trim()
            e.target.parentElement.remove()

            // busco en la vista el que tiene el mismo correo y lo elimino
            let vistaUsuarios = document.querySelectorAll('#usuariosVista li')

            for (let i = 0; i < vistaUsuarios.length; i++) {
                if (vistaUsuarios[i].getAttribute('data-correo') == correo) {
                    vistaUsuarios[i].remove()
                }
            }
        }
    })

})