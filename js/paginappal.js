document.querySelector(".dropdown-item.text-danger").addEventListener("click", () => {
  localStorage.clear(); // Para borrar datos guardados
  window.location.href = "login.html"; // redirigir a pantalla Login
});