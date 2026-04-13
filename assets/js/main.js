function cambiarTipo(boton, tipo) {
  document.querySelectorAll(".btn-tipo").forEach(btn => {
    btn.classList.remove("activo");
  });

  boton.classList.add("activo");
  document.body.classList.remove("usuario", "empresa", "admin");
  document.body.classList.add(tipo);

  const crearCuenta = document.querySelector(".text-center.mt-3 a");
  if (crearCuenta) {
    if (tipo === "empresa") {
      crearCuenta.textContent = "Crea una cuenta de empresa";
    } else if (tipo === "usuario") {
      crearCuenta.textContent = "Crea una cuenta";
    } else {
      crearCuenta.textContent = "";
    }
  }

  const logo = document.getElementById("Logo");
  if (logo) {
    if (tipo === "empresa") {
      logo.src = "./assets/img/logoEmpresa.png";
    } else if (tipo === "usuario") {
      logo.src = "./assets/img/logoUsuarios.png";
    } else if (tipo === "admin") {
      logo.src = "./assets/img/logo_admin.png";
    }
  }
}