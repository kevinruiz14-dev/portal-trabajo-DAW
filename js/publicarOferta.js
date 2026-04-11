document.addEventListener("DOMContentLoaded", () => {

  const btnPublicar = document.getElementById("btnPublicar");

  btnPublicar.addEventListener("click", (e) => {

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const salario = document.getElementById("salario").value;
    const ubicacion = document.getElementById("ubicacion").value;

    // VALIDACIÓN
    if (!titulo || !descripcion || salario === "$ Selecciona") {
      e.preventDefault();
      alert("Completa los campos obligatorios");
      return;
    }

    // CREAR OBJETO
    const nuevaOferta = {
      titulo,
      descripcion,
      salario,
      ubicacion,
      estado: "Activa"
    };

    // GUARDAR EN LOCALSTORAGE
    let ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];

    ofertas.push(nuevaOferta);

    localStorage.setItem("ofertas", JSON.stringify(ofertas));

  });

// LIMPIAR FORMULARIO
  document.querySelectorAll("#formPublicar input, #formPublicar textarea").forEach(campo => {
    campo.value = "";
  });

  document.querySelectorAll("#formPublicar select").forEach(select => {
    select.selectedIndex = 0;
  });

});
