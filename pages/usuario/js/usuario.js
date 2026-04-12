function cambiarTipo(boton, tipo) {
  document.querySelectorAll(".btn-tipo").forEach(btn => {
    btn.classList.remove("activo");
  });

  boton.classList.add("activo");
  document.body.classList.remove("usuario", "empresa", "admin");
  document.body.classList.add(tipo);

  const crearCuenta = document.querySelector(".text-center.mt-3 a");
  if (crearCuenta) {
    if(tipo === "empresa"){
      crearCuenta.textContent = "Crea una cuenta de empresa";
    } else if(tipo === "usuario"){
      crearCuenta.textContent = "Crea una cuenta";
    } else {
      crearCuenta.textContent = "";
    }
  }

  const logo = document.getElementById("Logo");
  if (logo) {
    if(tipo === "empresa"){
      logo.src = "./multimedia/logoEmpresa.png";
    } else if(tipo === "usuario"){
      logo.src = "./multimedia/logoUsuarios.png";
    } else if(tipo === "admin"){
      logo.src = "./multimedia/logo_admin.png";
    }
  }
}

function editarPerfil() {
  const form = document.getElementById("formPerfil");
  if (form) {
    form.style.display = "block";
    document.getElementById("editNombre").value = document.getElementById("nombre").innerText;
    document.getElementById("editCiudad").value = document.getElementById("ciudad").innerText;
    document.getElementById("editCorreo").value = document.getElementById("correo").innerText;
    document.getElementById("editTelefono").value = document.getElementById("telefono").innerText;
  }
}

function guardarPerfil() {
  document.getElementById("nombre").innerText = document.getElementById("editNombre").value;
  document.getElementById("ciudad").innerText = document.getElementById("editCiudad").value;
  document.getElementById("correo").innerText = document.getElementById("editCorreo").value;
  document.getElementById("telefono").innerText = document.getElementById("editTelefono").value;

  const form = document.getElementById("formPerfil");
  if (form) {
    form.style.display = "none";
  }
}

function aquipondrelafunciondespues() {
}

const modalEmpresa = document.getElementById('modalEmpresa');
if (modalEmpresa) {
  modalEmpresa.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget;
    
    // Extraemos la información de los atributos data-bs-*
    const nombre = button.getAttribute('data-bs-nombre');
    const rating = button.getAttribute('data-bs-rating');
    const ubicacion = button.getAttribute('data-bs-ubicacion');
    const desc = button.getAttribute('data-bs-desc');
    const ofertas = button.getAttribute('data-bs-ofertas');
    const img = button.getAttribute('data-bs-img');

    // Insertamos la información en los campos del modal
    modalEmpresa.querySelector('#modalNombre').innerText = nombre;
    modalEmpresa.querySelector('#modalRating').innerText = rating;
    modalEmpresa.querySelector('#modalUbicacion').innerText = ubicacion;
    modalEmpresa.querySelector('#modalDescripcion').innerText = desc;
    modalEmpresa.querySelector('#modalOfertas').innerHTML = ofertas;
    modalEmpresa.querySelector('#modalLogo').src = img;
  });
}

const empleos = [
  {
    id: 1,
    titulo: "Asistente Administrativo",
    empresa: "Global Corp",
    ubicacion: "San Salvador",
    categoria: "administracion",
    descripcion: "Apoyo en la gestión de oficina y atención al cliente.",
    img: "./multimedia/logoUsuarios.png"
  },
  {
    id: 2,
    titulo: "Desarrollador Jr",
    empresa: "Software Solutions",
    ubicacion: "Santa Ana",
    categoria: "tecnologia",
    descripcion: "Mantenimiento de aplicaciones web y soporte técnico.",
    img: "./multimedia/logoUsuarios.png"
  },
  {
    id: 3,
    titulo: "Contador General",
    empresa: "Finanzas S.A.",
    ubicacion: "La Libertad",
    categoria: "administracion",
    descripcion: "Gestión de libros contables y declaraciones de impuestos.",
    img: "./multimedia/logoUsuarios.png"
  },
  {
    id: 4,
    titulo: "Diseñador Gráfico",
    empresa: "Creativa Studio",
    ubicacion: "San Salvador",
    categoria: "diseño",
    descripcion: "Creación de contenido visual para redes sociales.",
    img: "./multimedia/logoUsuarios.png"
  }
];

function renderizarEmpleos(categoria = "todos", busqueda = "") {
  const contenedor = document.getElementById("contenedor-empleos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  const filtrados = empleos.filter(e => {
    const coincideFiltro = categoria === "todos" || e.categoria === categoria;
    const coincideBusqueda = e.titulo.toLowerCase().includes(busqueda.toLowerCase()) || 
                             e.empresa.toLowerCase().includes(busqueda.toLowerCase());
    return coincideFiltro && coincideBusqueda;
  });

  filtrados.forEach(e => {
    contenedor.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="card h-100 card-usuario-custom p-4">
          <div class="d-flex align-items-center mb-3">
            <img src="${e.img}" alt="${e.empresa}" height="45" class="me-3">
            <div>
              <h5 class="fw-bold mb-0" style="font-size: 1.1rem;">${e.titulo}</h5>
              <p class="text-secondary mb-0 small">${e.empresa}</p>
            </div>
          </div>
          <p class="text-secondary small mb-3"><i class="bi bi-geo-alt me-1"></i>${e.ubicacion}</p>
          <p class="small text-dark mb-4" style="height: 40px; overflow: hidden;">${e.descripcion}</p>
          <div class="mt-auto">
            <button class="btn btn-purple w-100 py-2">Ver detalle</button>
          </div>
        </div>
      </div>
    `;
  });
}

const barraBusqueda = document.querySelector('.input-search input');
if (barraBusqueda) {
  barraBusqueda.addEventListener('input', (e) => {
    renderizarEmpleos("todos", e.target.value);
  });
}

document.querySelectorAll('.btn-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
    renderizarEmpleos(cat);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById("contenedor-empleos")) {
    renderizarEmpleos();
  }
});