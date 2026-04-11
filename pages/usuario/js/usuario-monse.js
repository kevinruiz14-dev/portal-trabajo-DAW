// Para que se puedan editar los datos en el perfil 

function editarPerfil() {

  document.getElementById("formPerfil").style.display = "block";

  document.getElementById("editNombre").value = document.getElementById("nombre").innerText;
  document.getElementById("editCiudad").value = document.getElementById("ciudad").innerText;
  document.getElementById("editCorreo").value = document.getElementById("correo").innerText;
  document.getElementById("editTelefono").value = document.getElementById("telefono").innerText;

}

function guardarPerfil() {

  document.getElementById("nombre").innerText = document.getElementById("editNombre").value;
  document.getElementById("ciudad").innerText = document.getElementById("editCiudad").value;
  document.getElementById("correo").innerText = document.getElementById("editCorreo").value;
  document.getElementById("telefono").innerText = document.getElementById("editTelefono").value;

  document.getElementById("formPerfil").style.display = "none";
};