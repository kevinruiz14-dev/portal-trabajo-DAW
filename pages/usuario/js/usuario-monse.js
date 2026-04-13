// Para cambiar los botones segun el tipo de usuario

function cambiarTipo(boton, tipo) {
  document.querySelectorAll(".btn-tipo").forEach(function(btn) { btn.classList.remove("activo"); });
  boton.classList.add("activo");
  document.body.classList.remove("usuario", "empresa", "admin");
  document.body.classList.add(tipo);

  var linkCrear = document.getElementById("link-crear-cuenta");
  if (linkCrear) {
    if (tipo === "empresa") {
      linkCrear.textContent = "Crea una cuenta de empresa";
      linkCrear.href = "../empresas/Registro-Cuenta-Empresarial.html";
    } else if (tipo === "usuario") {
      linkCrear.textContent = "Crea una cuenta";
      linkCrear.href = "Registro-usuarios.html";
    } else {
      linkCrear.textContent = "";
      linkCrear.href = "#";
    }
  }

  var logo = document.getElementById("Logo");
  if (logo) {
    if (tipo === "empresa")      logo.src = "./multimedia/logoEmpresa.png";
    else if (tipo === "usuario") logo.src = "./multimedia/logoUsuarios.png";
    else if (tipo === "admin")   logo.src = "./multimedia/logo_admin.png";
  }
}

// ── LOGIN 

function login() {
  var correo   = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();

  if (!correo || !password) { alert("Por favor completá los dos campos."); return; }

  var tipo = document.body.classList.contains("empresa") ? "empresa" : "usuario";

  if (tipo === "usuario") {
    var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    var usuario  = usuarios.find(function(u) { return u.correo === correo && u.password === password; });
    if (!usuario) { alert("Correo o contraseña incorrectos."); return; }
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    window.location.href = "index.html";

  } else {
    var empresas = JSON.parse(localStorage.getItem("empresas") || "[]");
    var empresa  = empresas.find(function(e) { return e.correo === correo && e.password === password; });
    if (!empresa) { alert("Correo o contraseña incorrectos."); return; }
    localStorage.setItem("empresaActiva", JSON.stringify(empresa));
    window.location.href = "../empresas/Pagina-principal-empresas.html";
  }
}

// ── REGISTRO USUARIO 

function registrarUsuario() {
  var correo    = (document.getElementById("correo")    || {}).value || "";
  var password  = (document.getElementById("password")  || {}).value || "";
  var nombres   = (document.getElementById("nombres")   || {}).value || "";
  var apellidos = (document.getElementById("apellidos") || {}).value || "";
  var telefono1 = (document.getElementById("telefono1") || {}).value || "";
  var ciudad    = (document.getElementById("ciudad")    || {}).value || "";

  correo = correo.trim(); password = password.trim(); nombres = nombres.trim(); apellidos = apellidos.trim();

  if (!correo || !password || !nombres || !apellidos) { alert("Completá los campos obligatorios."); return; }

  var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  if (usuarios.find(function(u) { return u.correo === correo; })) { alert("Ya existe una cuenta con ese correo."); return; }

  var nuevo = { correo: correo, password: password, nombres: nombres, apellidos: apellidos, telefono1: telefono1.trim(), ciudad: ciudad.trim() };
  usuarios.push(nuevo);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Registro exitoso. Iniciá sesión para continuar.");
  window.location.href = "Inicio-Sesión-general.html";
}

// ── CERRAR SESIÓN 

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  localStorage.removeItem("empresaActiva");
  window.location.href = "../usuario/Inicio-Sesión-general.html";
}

// ── PERFIL 

function cargarPerfil() {
  var usuario  = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
  var nombre   = (usuario && (usuario.nombres + " " + usuario.apellidos).trim()) || localStorage.getItem("perfil_nombre")   || "Monserrat Barillas";
  var ciudad   = (usuario && usuario.ciudad)    || localStorage.getItem("perfil_ciudad")   || "Santa Ana";
  var correo   = (usuario && usuario.correo)    || localStorage.getItem("perfil_correo")   || "monsebarillas28@gmail.com";
  var telefono = (usuario && usuario.telefono1) || localStorage.getItem("perfil_telefono") || "+503-60703230";
  var foto     = localStorage.getItem("perfil_foto") || "./multimedia/perfil.png";

  if (document.getElementById("nombre"))      document.getElementById("nombre").innerText      = nombre;
  if (document.getElementById("ciudad"))      document.getElementById("ciudad").innerText      = ciudad;
  if (document.getElementById("correo"))      document.getElementById("correo").innerText      = correo;
  if (document.getElementById("telefono"))    document.getElementById("telefono").innerText    = telefono;
  if (document.getElementById("foto-perfil")) document.getElementById("foto-perfil").src       = foto;

  renderExperiencias(); renderEstudios(); renderConocimientos(); renderMovilidad(); mostrarCV();
}

function editarPerfil() {
  document.getElementById("formPerfil").style.display = "block";
  document.getElementById("editNombre").value   = document.getElementById("nombre").innerText;
  document.getElementById("editCiudad").value   = document.getElementById("ciudad").innerText;
  document.getElementById("editCorreo").value   = document.getElementById("correo").innerText;
  document.getElementById("editTelefono").value = document.getElementById("telefono").innerText;
}

function guardarPerfil() {
  var nombre = document.getElementById("editNombre").value; var ciudad = document.getElementById("editCiudad").value;
  var correo = document.getElementById("editCorreo").value; var telefono = document.getElementById("editTelefono").value;
  document.getElementById("nombre").innerText = nombre; document.getElementById("ciudad").innerText = ciudad;
  document.getElementById("correo").innerText = correo; document.getElementById("telefono").innerText = telefono;
  localStorage.setItem("perfil_nombre", nombre); localStorage.setItem("perfil_ciudad", ciudad);
  localStorage.setItem("perfil_correo", correo); localStorage.setItem("perfil_telefono", telefono);
  document.getElementById("formPerfil").style.display = "none";
}

function cambiarFoto(input) {
  if (!input.files || !input.files[0]) return;
  var reader = new FileReader();
  reader.onload = function(e) { document.getElementById("foto-perfil").src = e.target.result; localStorage.setItem("perfil_foto", e.target.result); };
  reader.readAsDataURL(input.files[0]);
}

// ── EXPERIENCIAS 

function getExperiencias() {
  return JSON.parse(localStorage.getItem("perfil_experiencias") || "null") ||
    [{ puesto: "Analista de Sistemas", empresa: "", periodo: "Detección de fallos" }];
}
function renderExperiencias() {
  var lista = getExperiencias(); var cont = document.getElementById("exp-lista"); if (!cont) return;
  if (lista.length === 0) { cont.innerHTML = '<p class="text-muted">Sin experiencias agregadas.</p>'; return; }
  cont.innerHTML = lista.map(function(ex, i) {
    return '<div class="d-flex justify-content-between align-items-start mb-3 pb-2" style="border-bottom:1px solid #eee;">' +
      '<div><p class="mb-0 fw-bold">' + ex.puesto + '</p>' + (ex.empresa ? '<p class="mb-0 text-muted" style="font-size:13px;">' + ex.empresa + '</p>' : '') +
      '<p class="mb-0 text-muted" style="font-size:13px;">' + ex.periodo + '</p></div>' +
      '<div style="white-space:nowrap;"><i class="bi bi-pencil text-primary me-3" style="cursor:pointer;" onclick="abrirFormExp(' + i + ')"></i>' +
      '<i class="bi bi-trash text-danger" style="cursor:pointer;" onclick="eliminarExp(' + i + ')"></i></div></div>';
  }).join('');
}
function abrirFormExp(i) {
  document.getElementById("formExperiencia").style.display = "block"; document.getElementById("editExpIndex").value = i;
  if (i === -1) { document.getElementById("formExp-titulo").innerText = "Agregar Experiencia"; document.getElementById("editPuesto").value = ""; document.getElementById("editEmpresaExp").value = ""; document.getElementById("editDescExp").value = ""; }
  else { var l = getExperiencias(); document.getElementById("formExp-titulo").innerText = "Editar Experiencia"; document.getElementById("editPuesto").value = l[i].puesto||""; document.getElementById("editEmpresaExp").value = l[i].empresa||""; document.getElementById("editDescExp").value = l[i].periodo||""; }
}
function cerrarFormExp() { document.getElementById("formExperiencia").style.display = "none"; }
function guardarExperiencia() {
  var puesto = document.getElementById("editPuesto").value.trim(); var empresa = document.getElementById("editEmpresaExp").value.trim(); var periodo = document.getElementById("editDescExp").value.trim();
  if (!puesto) { alert("El puesto no puede estar vacío."); return; }
  var i = parseInt(document.getElementById("editExpIndex").value); var lista = getExperiencias();
  if (i === -1) lista.push({ puesto:puesto, empresa:empresa, periodo:periodo }); else lista[i] = { puesto:puesto, empresa:empresa, periodo:periodo };
  localStorage.setItem("perfil_experiencias", JSON.stringify(lista)); renderExperiencias(); cerrarFormExp();
}
function eliminarExp(i) {
  if (!confirm("¿Eliminar esta experiencia?")) return;
  var lista = getExperiencias(); lista.splice(i,1); localStorage.setItem("perfil_experiencias", JSON.stringify(lista)); renderExperiencias();
}

// ── ESTUDIOS 

function getEstudios() {
  return JSON.parse(localStorage.getItem("perfil_estudios") || "null") ||
    [{ nivel: "Bachillerato/Educación Media", institucion: "Colegio Juan Napier Chalchuapa", periodo: "Enero 2020 - Diciembre 2022" }];
}
function renderEstudios() {
  var lista = getEstudios(); var cont = document.getElementById("estudios-lista"); if (!cont) return;
  if (lista.length === 0) { cont.innerHTML = '<p class="text-muted">Sin estudios agregados.</p>'; return; }
  cont.innerHTML = lista.map(function(es, i) {
    return '<div class="d-flex justify-content-between align-items-start mb-3 pb-2" style="border-bottom:1px solid #eee;">' +
      '<div><p class="mb-0 fw-bold">' + es.nivel + '</p><p class="mb-0 text-muted" style="font-size:13px;">' + es.institucion + '<br>' + es.periodo + '</p></div>' +
      '<div style="white-space:nowrap;"><i class="bi bi-pencil text-primary me-3" style="cursor:pointer;" onclick="abrirFormEstudio(' + i + ')"></i>' +
      '<i class="bi bi-trash text-danger" style="cursor:pointer;" onclick="eliminarEstudio(' + i + ')"></i></div></div>';
  }).join('');
}
function abrirFormEstudio(i) {
  document.getElementById("formEstudios").style.display = "block"; document.getElementById("editEstIndex").value = i;
  if (i === -1) { document.getElementById("formEst-titulo").innerText = "Agregar Estudio"; document.getElementById("editNivel").value = ""; document.getElementById("editInstitucion").value = ""; document.getElementById("editPeriodo").value = ""; }
  else { var l = getEstudios(); document.getElementById("formEst-titulo").innerText = "Editar Estudio"; document.getElementById("editNivel").value = l[i].nivel||""; document.getElementById("editInstitucion").value = l[i].institucion||""; document.getElementById("editPeriodo").value = l[i].periodo||""; }
}
function cerrarFormEstudio() { document.getElementById("formEstudios").style.display = "none"; }
function guardarEstudio() {
  var nivel = document.getElementById("editNivel").value.trim(); var inst = document.getElementById("editInstitucion").value.trim(); var per = document.getElementById("editPeriodo").value.trim();
  if (!nivel) { alert("El nivel no puede estar vacío."); return; }
  var i = parseInt(document.getElementById("editEstIndex").value); var lista = getEstudios();
  if (i === -1) lista.push({ nivel:nivel, institucion:inst, periodo:per }); else lista[i] = { nivel:nivel, institucion:inst, periodo:per };
  localStorage.setItem("perfil_estudios", JSON.stringify(lista)); renderEstudios(); cerrarFormEstudio();
}
function eliminarEstudio(i) {
  if (!confirm("¿Eliminar este estudio?")) return;
  var lista = getEstudios(); lista.splice(i,1); localStorage.setItem("perfil_estudios", JSON.stringify(lista)); renderEstudios();
}

// ── CONOCIMIENTOS 

function getConocimientos() { return JSON.parse(localStorage.getItem("perfil_conocimientos") || "null") || ["Ventas", "Inventario"]; }
function renderConocimientos() {
  var lista = getConocimientos(); var cont = document.getElementById("conocimientos-botones"); if (!cont) return;
  cont.innerHTML = lista.map(function(c){ return '<span class="btn btn-outline-secondary text-primary rounded-4 mb-2 me-2">' + c + '</span>'; }).join('');
}
function editarConocimientos() { document.getElementById("formConocimientos").style.display = "block"; document.getElementById("editConocimientos").value = getConocimientos().join(", "); }
function guardarConocimientos() {
  var lista = document.getElementById("editConocimientos").value.split(",").map(function(c){ return c.trim(); }).filter(function(c){ return c; });
  localStorage.setItem("perfil_conocimientos", JSON.stringify(lista)); renderConocimientos(); document.getElementById("formConocimientos").style.display = "none";
}

// ── MOVILIDAD 

function renderMovilidad() {
  var guardado = localStorage.getItem("perfil_movilidad_checks");
  var items = guardado ? guardado.split("|").filter(function(s){ return s; }) : ["Disponibilidad para viajar", "Disponibilidad para cambiar de residencia", "No tengo vehículo propio"];
  var cont = document.getElementById("movilidad-texto"); if (!cont) return;
  cont.innerHTML = items.map(function(s){ return '<p><i class="bi bi-circle-fill text-primary"></i> ' + s + '</p>'; }).join('');
}
function editarMovilidad() {
  document.getElementById("formMovilidad").style.display = "block";
  var guardado = localStorage.getItem("perfil_movilidad_checks") || "";
  ["mov1","mov2","mov3","mov4","mov5"].forEach(function(id){ var el = document.getElementById(id); if (el) el.checked = guardado.indexOf(el.value) !== -1; });
}
function guardarMovilidad() {
  var sel = []; ["mov1","mov2","mov3","mov4","mov5"].forEach(function(id){ var el = document.getElementById(id); if (el && el.checked) sel.push(el.value); });
  localStorage.setItem("perfil_movilidad_checks", sel.join("|")); renderMovilidad(); document.getElementById("formMovilidad").style.display = "none";
}

// ── CV 

function subirCV(input) {
  if (!input.files || !input.files[0]) return;
  var archivo = input.files[0]; var reader = new FileReader();
  reader.onload = function(e) { localStorage.setItem("perfil_cv_data", e.target.result); localStorage.setItem("perfil_cv_nombre", archivo.name); mostrarCV(); };
  reader.readAsDataURL(archivo);
}
function mostrarCV() {
  var nombre = localStorage.getItem("perfil_cv_nombre"); var data = localStorage.getItem("perfil_cv_data"); var zona = document.getElementById("cv-zona");
  if (!zona || !nombre) return;
  zona.innerHTML = '<p><i class="bi bi-file-earmark-pdf text-danger me-2"></i><strong>' + nombre + '</strong></p>' +
    '<a href="' + data + '" download="' + nombre + '" class="btn btn-outline-success rounded-4 me-2"><i class="bi bi-download me-1"></i> Descargar</a>' +
    '<label for="inputCV" class="btn btn-outline-secondary rounded-4"><i class="bi bi-arrow-repeat me-1"></i> Cambiar CV</label>' +
    '<input type="file" id="inputCV" accept=".pdf" style="display:none;" onchange="subirCV(this)">';
}

// ── EMPLEOS / FILTROS 

var filtros = { orden:"", categoria:"", experiencia:"", salario:"", lugar:"" };

function setFiltro(tipo, valor, btnId, labelDefault) {
  filtros[tipo] = valor; var btn = document.getElementById(btnId); if (btn) btn.textContent = valor ? valor : labelDefault; aplicarFiltros();
}

function getDB() {
  if (typeof empleosDB !== "undefined") return empleosDB;
  if (typeof monseBD   !== "undefined") return monseBD;
  return [];
}

function aplicarFiltros() {
  var inputCargo = document.getElementById("input-cargo") || document.getElementById("job-keyword");
  var inputLugar = document.getElementById("input-lugar") || document.getElementById("job-location");
  var textoCargo = inputCargo ? inputCargo.value.toLowerCase().trim() : "";
  var textoLugar = inputLugar ? inputLugar.value.toLowerCase().trim() : "";
  var db = getDB();
  var resultado = db.filter(function(e) {
    if (textoCargo && e.cargo.toLowerCase().indexOf(textoCargo)===-1 && e.categoria.toLowerCase().indexOf(textoCargo)===-1) return false;
    if (textoLugar && e.ciudad.toLowerCase().indexOf(textoLugar)===-1 && e.departamento.toLowerCase().indexOf(textoLugar)===-1) return false;
    if (filtros.categoria   && e.categoria    !== filtros.categoria)   return false;
    if (filtros.experiencia && e.experiencia  !== filtros.experiencia) return false;
    if (filtros.salario     && e.rangoSalario !== filtros.salario)     return false;
    if (filtros.lugar       && e.departamento !== filtros.lugar)       return false;
    return true;
  });
  if (filtros.orden === "Reciente") resultado.sort(function(a,b){ return a.diasAtras-b.diasAtras; });
  if (filtros.orden === "Antiguo")  resultado.sort(function(a,b){ return b.diasAtras-a.diasAtras; });
  renderLista(resultado);
}

function iniciales(nombre) { return nombre.split(' ').slice(0,2).map(function(w){ return w[0]; }).join('').toUpperCase(); }

// ── FAVORITOS 

function getFavoritos() { return JSON.parse(localStorage.getItem("favoritos") || "[]"); }
function esFavorito(id) { return getFavoritos().indexOf(id) !== -1; }

function toggleFavorito(id, event) {
  if (event) event.stopPropagation();
  var favs = getFavoritos(); var idx = favs.indexOf(id);
  if (idx === -1) favs.push(id); else favs.splice(idx, 1);
  localStorage.setItem("favoritos", JSON.stringify(favs));
  document.querySelectorAll(".btn-fav[data-id='" + id + "']").forEach(function(btn) { actualizarIconoFav(btn, favs.indexOf(id) !== -1); });
  if (document.getElementById("lista-favoritos")) renderFavoritos();
}

function actualizarIconoFav(btn, activo) {
  btn.innerHTML = activo ? '<i class="bi bi-heart-fill"></i>' : '<i class="bi bi-heart"></i>';
  btn.style.color = activo ? "#E24B4A" : "#aaa";
  btn.title = activo ? "Quitar de favoritos" : "Guardar en favoritos";
}

function botonFav(id) {
  var activo = esFavorito(id);
  return '<button class="btn-fav" data-id="' + id + '" title="' + (activo?"Quitar de favoritos":"Guardar en favoritos") + '" ' +
    'style="background:none;border:none;cursor:pointer;font-size:20px;color:' + (activo?"#E24B4A":"#aaa") + ';padding:0 6px;line-height:1;flex-shrink:0;" ' +
    'onclick="toggleFavorito(' + id + ', event)"><i class="bi ' + (activo?"bi-heart-fill":"bi-heart") + '"></i></button>';
}

function renderFavoritos() {
  var cont = document.getElementById("lista-favoritos"); if (!cont) return;
  var favs = getFavoritos(); var db = getDB();
  var items = db.filter(function(e){ return favs.indexOf(e.id) !== -1; });
  if (items.length === 0) {
    cont.innerHTML = '<div class="text-center text-muted py-5"><i class="bi bi-heart fs-1 d-block mb-3" style="opacity:.3;"></i><p>Todavía no tenés empleos guardados.</p><a href="index.html" class="btn btn-pill-active border-0 rounded-pill px-4 fw-bold mt-2">Explorar empleos</a></div>';
    return;
  }
  cont.innerHTML = items.map(function(e) {
    return '<div class="card-usuario-custom p-3 mb-3">' +
      '<div class="d-flex justify-content-between align-items-start">' +
        '<div><h5 class="fw-bold mb-1">' + e.cargo + '</h5><p class="text-secondary mb-1" style="font-size:14px;">' + e.empresa + '</p>' +
        '<p class="text-secondary mb-2" style="font-size:13px;"><i class="bi bi-geo-alt-fill me-1"></i>' + e.ciudad + ', ' + e.departamento + '</p>' +
        '<p class="text-secondary mb-0" style="font-size:13px;"><i class="bi bi-cash-stack me-1"></i>' + e.salario + '</p></div>' +
        botonFav(e.id) +
      '</div>' +
      '<div class="text-end mt-3"><button class="btn border-0 rounded-4 px-4 btn-pill-active fw-bold" onclick="guardarPostulacion(' + e.id + ')">Postularme</button></div>' +
    '</div>';
  }).join('');
}

// ── POSTULACIONES 

function getPostulaciones() { return JSON.parse(localStorage.getItem("postulaciones") || "[]"); }

function guardarPostulacion(id) {
  var postulaciones = getPostulaciones();
  if (postulaciones.indexOf(id) === -1) { postulaciones.push(id); localStorage.setItem("postulaciones", JSON.stringify(postulaciones)); alert("¡Te postulaste exitosamente!"); }
  else { alert("Ya te habías postulado a este empleo."); }
}

function renderPostulaciones() {
  var cont = document.getElementById("lista-postulaciones"); var vacio = document.getElementById("sin-postulaciones"); if (!cont) return;
  var postulaciones = getPostulaciones(); var db = getDB(); cont.innerHTML = "";
  if (postulaciones.length === 0) { if (vacio) vacio.style.display = "flex"; return; }
  if (vacio) vacio.style.display = "none";
  postulaciones.forEach(function(id) {
    var empleo = db.find(function(e){ return e.id === id; }); if (!empleo) return;
    cont.innerHTML += '<div class="mb-3 p-3 rounded-4 bg-white" style="border:1px solid #ccc;">' +
      '<h5 class="fw-bold">' + empleo.cargo + '</h5><p class="text-muted mb-1">' + empleo.empresa + '</p><p class="text-muted">' + empleo.ciudad + ', ' + empleo.departamento + '</p>' +
      '<div class="text-end mt-2"><button class="btn" style="background:#a988b3;" onclick="verDetalle(' + empleo.id + ')">Ver detalles</button></div></div>';
  });
}

// ── RENDER TARJETAS 

function renderLista(lista) {
  var cont = document.getElementById("lista-empleos"); if (!cont) return;
  cont.innerHTML = "";
  if (lista.length === 0) {
    var isRow = cont.classList.contains("row");
    cont.innerHTML = isRow ? '<div class="col-12"><div class="alert alert-secondary text-center">No se encontraron empleos con esos criterios.</div></div>' : '<div class="alert alert-secondary text-center">No se encontraron empleos con esos criterios.</div>';
    return;
  }
  var isRow = cont.classList.contains("row");
  lista.forEach(function(e) {
    var dias = e.diasAtras === 1 ? "Hace 1 día" : "Hace " + e.diasAtras + " días";
    if (isRow) {
      cont.innerHTML += '<div class="col-md-6"><div class="card empleo-card h-100" id="card-' + e.id + '" style="cursor:pointer;" onclick="verDetalle(' + e.id + ')">' +
        '<div class="card-body d-flex flex-column"><div>' +
        '<h5 class="fw-bold mb-2">' + e.cargo + '</h5>' +
        '<p class="mb-2 text-muted small"><i class="bi bi-geo-alt-fill text-primary"></i><span class="ms-1">' + e.ciudad + ', ' + e.departamento + '</span></p>' +
        '<div class="info-line mb-1"><i class="bi bi-person-check text-primary"></i> ' + e.contrato + '</div>' +
        '<div class="info-line mb-1"><i class="bi bi-clock text-primary"></i> ' + e.jornada + '</div>' +
        '<div class="info-line"><i class="bi bi-building text-primary"></i> ' + e.modalidad + '</div></div>' +
        '<div class="mt-auto d-flex justify-content-between align-items-center pt-3 border-top">' +
        '<span class="text-muted small">' + dias + '</span>' +
        '<div class="d-flex align-items-center gap-2">' + botonFav(e.id) + '<button class="btn btn-lila btn-sm" onclick="event.stopPropagation(); verDetalle(' + e.id + ')">Ver detalles</button></div>' +
        '</div></div></div></div>';
    } else {
      cont.innerHTML += '<div class="card empleo-card-relative" id="card-' + e.id + '" style="cursor:pointer;" onclick="verDetalle(' + e.id + ')">' +
        '<div class="card-body"><div class="d-flex justify-content-between">' +
        '<div class="d-flex gap-3 align-items-start"><div class="logo-empresa">' + iniciales(e.empresa) + '</div>' +
        '<div><h5 class="card-title fw-bold mb-1">' + e.cargo + '</h5>' +
        '<p class="text-muted mb-2" style="font-size:13px;">' + e.empresa + '</p>' +
        '<p class="mb-2"><i class="bi bi-geo-alt-fill text-primary"></i><span class="ms-1">' + e.ciudad + ', ' + e.departamento + '</span></p>' +
        '<div class="info-line mb-1"><i class="bi bi-person-check"></i><span>' + e.contrato + '</span></div>' +
        '<div class="info-line mb-1"><i class="bi bi-clock"></i><span>' + e.jornada + '</span></div>' +
        '<div class="info-line mb-1"><i class="bi bi-building"></i><span>' + e.modalidad + '</span></div></div></div>' +
        '<div class="text-end fecha-publicacion fecha-card">' + dias + '</div></div>' +
        '<div class="mt-3 d-flex justify-content-end align-items-center gap-2">' + botonFav(e.id) +
        '<button class="btn btn-lila boton-detalles" onclick="event.stopPropagation(); verDetalle(' + e.id + ')">Ver detalles</button></div></div></div>';
    }
  });
}

function verDetalle(id) {
  var db = getDB(); var e = null;
  for (var i = 0; i < db.length; i++) { if (db[i].id === id) { e = db[i]; break; } }
  if (!e) return;
  document.querySelectorAll("[id^='card-']").forEach(function(c){ c.style.border = ""; });
  var activa = document.getElementById("card-" + id); if (activa) activa.style.border = "2px solid #A869F0";
  var resp = e.responsabilidades.map(function(r){ return "<li>"+r+"</li>"; }).join("");
  var reqs = e.requisitos.map(function(r){ return "<li>"+r+"</li>"; }).join("");
  var bens = e.beneficios.map(function(b){ return "<li>"+b+"</li>"; }).join("");
  document.getElementById("detalle-empleo").innerHTML =
    '<h4 class="fw-bold mb-1">' + e.cargo + ' — Detalles del puesto</h4>' +
    '<p class="text-muted mb-3" style="font-size:13px;">' + e.empresa + '</p>' +
    '<p><i class="bi bi-geo-alt-fill text-primary"></i> <strong>Ubicación:</strong> ' + e.ciudad + ', ' + e.departamento + '</p>' +
    '<p><i class="bi bi-cash-stack text-success"></i> <strong>Salario:</strong> ' + e.salario + '</p>' +
    '<p><i class="bi bi-clock"></i> <strong>Horario:</strong> ' + e.horario + '</p><hr>' +
    '<h5 class="fw-bold">Descripción del puesto</h5><p>' + e.descripcion + '</p>' +
    '<h5 class="fw-bold mt-3">Responsabilidades</h5><ul>' + resp + '</ul>' +
    '<h5 class="fw-bold mt-3">Requisitos</h5><ul>' + reqs + '</ul>' +
    '<h5 class="fw-bold mt-3">Beneficios</h5><ul>' + bens + '</ul>' +
    '<div class="d-flex align-items-center gap-3 mt-4">' +
      '<button class="btn-postularme" onclick="guardarPostulacion(' + e.id + ')">Postularme</button>' +
      botonFav(e.id) +
    '</div>';
}

// ── INICIAR AL CARGAR 

document.addEventListener("DOMContentLoaded", function() {
  if (window.location.search.indexOf("tipo=empresa") !== -1) {
    var btns = document.querySelectorAll(".btn-tipo");
    btns.forEach(function(btn) {
      if (btn.getAttribute("onclick") && btn.getAttribute("onclick").indexOf("empresa") !== -1) {
        cambiarTipo(btn, "empresa");
      }
    });
  }

  cargarPerfil();
  if (document.getElementById("lista-empleos"))       aplicarFiltros();
  if (document.getElementById("lista-favoritos"))     renderFavoritos();
  if (document.getElementById("lista-postulaciones")) renderPostulaciones();
});