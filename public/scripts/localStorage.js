function guardarLocalStorage({ nombre, datos }) {
  localStorage.setItem(nombre, datos);
}

function leerLocalStorage({ nombre }) {
  return localStorage.getItem(nombre);
}
