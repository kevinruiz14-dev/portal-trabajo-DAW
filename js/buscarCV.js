 const cvs = [
  {
    nombre: "María López",
    edad: 25,
    estudios: "Administración",
    disponibilidad: "Inmediata",
    salario: 500
  },
  {
    nombre: "Carlos Pérez",
    edad: 30,
    estudios: "Ingeniería",
    disponibilidad: "Parcial",
    salario: 800
  }
];

/*const cvs = [];*/

document.getElementById("btnExplorar").addEventListener("click", () => {

  const contenedor = document.getElementById("listaResultados");
  contenedor.innerHTML = "";

  // SI NO HAY DATOS
  if (cvs.length === 0) {
    contenedor.innerHTML = `
      <p class="text-center mt-3 text-muted fw-bold">
        No hay resultados
      </p>
    `;
    return;
  }

  // SI HAY DATOS
  cvs.forEach(cv => {
    contenedor.innerHTML += `
      <div class="card p-3 mb-3 text-start">
        <strong>${cv.nombre}</strong><br>
        Edad: ${cv.edad}<br>
        Estudios: ${cv.estudios}<br>
        Disponibilidad: ${cv.disponibilidad}<br>
        Salario: $${cv.salario}
      </div>
    `;
  });

});