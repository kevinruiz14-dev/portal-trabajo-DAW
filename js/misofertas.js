let ofertaSeleccionada = null;

// Agregar ofertas de forma dinamica //
document.addEventListener("DOMContentLoaded", mostrarOfertas);

function mostrarOfertas() {

  const contenedor = document.getElementById("contenedorOfertas");
  const ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];

  contenedor.innerHTML = "";

  ofertas.forEach((oferta, index) => {

    const estadoClase = oferta.estado === "Activa" ? "estadoActiva" : "estadoFinalizada";
    const color = oferta.estado === "Activa" ? "#DFF5E1" : "#F8D7DA";
    const textoColor = oferta.estado === "Activa" ? "green" : "red";
    const modal = oferta.estado === "Activa" ? "#modalFinalizar" : "#modalActivar";

    const card = `
      <div class="card-oferta ${oferta.estado.toLowerCase()} rounded-4 p-3 mb-3 border position-relative" style="background-color:#ECECFA;">

        <div class="row align-items-center text-center text-md-start">

          <div class="col-md-4 border-end">
            <strong>Título:</strong><br>
            ${oferta.titulo}
          </div>

          <div class="col-md-3 border-end">
            <strong>Salario:</strong><br>
            ${oferta.salario}
          </div>

          <div class="col-md-3 border-end">
            <strong>Ubicación:</strong><br>
            ${oferta.ubicacion}
          </div>

          <div class="col-md-2 text-center">
            <span class="badge ${estadoClase} rounded-pill p-2"
              style="background-color:${color}; color:${textoColor}; cursor:pointer;"
              data-bs-toggle="modal"
              data-bs-target="${modal}">
              ${oferta.estado}
            </span>
          </div>

        </div>

      </div>
    `;

    contenedor.innerHTML += card;

  });
// GUARDAR ESTADOS
function guardarEstados() {
  const estados = [];

  document.querySelectorAll(".estadoActiva, .estadoFinalizada").forEach(badge => {
    estados.push(badge.textContent);
  });

  localStorage.setItem("estadosOfertas", JSON.stringify(estados));
}


// SELECCIONAR OFERTA

  // VOLVER A ASIGNAR EVENTOS DESPUÉS DE CREAR LAS CARDS
document.querySelectorAll(".estadoActiva, .estadoFinalizada").forEach(badge => {
  badge.addEventListener("click", () => {
    ofertaSeleccionada = badge;
  });
});
}

// FINALIZAR

document.getElementById("btnFinalizar").addEventListener("click", () => {

  if (ofertaSeleccionada) {

    const ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];

    const titulo = ofertaSeleccionada.closest(".card-oferta")
      .querySelector(".col-md-4").textContent;

    const oferta = ofertas.find(o => titulo.includes(o.titulo));

    if (oferta) {
      oferta.estado = "Finalizada";
      localStorage.setItem("ofertas", JSON.stringify(ofertas));
    }

    mostrarOfertas();
  }

});


// ACTIVAR

document.getElementById("btnActivar").addEventListener("click", () => {

  if (ofertaSeleccionada) {

    const ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];

    const titulo = ofertaSeleccionada.closest(".card-oferta")
      .querySelector(".col-md-4").textContent;

    const oferta = ofertas.find(o => titulo.includes(o.titulo));

    if (oferta) {
      oferta.estado = "Activa";
      localStorage.setItem("ofertas", JSON.stringify(ofertas));
    }

    mostrarOfertas();
  }

});


// FILTRO
let filtroSeleccionado = null;

// seleccionar opción
document.getElementById("filtroActiva").addEventListener("click", () => {
  filtroSeleccionado = "Activa";
});

document.getElementById("filtroFinalizada").addEventListener("click", () => {
  filtroSeleccionado = "Finalizada";
});

document.getElementById("filtroTodos").addEventListener("click", () => {
  document.querySelectorAll(".card-oferta").forEach(card => {
    card.style.display = "block";
  });
});
// aplicar filtro al darle "Aplicar"
document.querySelector("#modalEstado .btn.text-white").addEventListener("click", () => {

  const cards = document.querySelectorAll(".card-oferta");

  cards.forEach(card => {
    const badge = card.querySelector(".badge");

    if (!filtroSeleccionado || filtroSeleccionado ==="todos") {
      card.style.display = "block";
    } else if (badge.textContent.trim() === filtroSeleccionado) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

});