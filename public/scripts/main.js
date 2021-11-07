const LINEAL = "lineal";
const MULTIPLICATIVO = "multiplicativo";
let EXPORTAR = false;

window.addEventListener("DOMContentLoaded", (event) => {
  let tipoDeGenerador = null;
  const form = document.getElementById("numeros_aleatorios");
  const exportarLineal = document.getElementById(
    "btn_exportar_aleatorios_lineal"
  );
  const exportarMultiplicativo = document.getElementById(
    "btn_exportar_aleatorios_multiplicativo"
  );

  const linealMixtoBoton = document.getElementById(
    "btn_generar_aleatorios_lineal"
  );
  const multiplicativoBoton = document.getElementById(
    "btn_generar_aleatorios_multiplicativo"
  );
  const pruebaPromediosBoton = document.getElementById("btn_prueba_promedio");
  const pruebaDistanciaBoton = document.getElementById("btn_prueba_distancia");
  const pruebaSeriesBoton = document.getElementById("btn_prueba_series");
  const pruebaFrecuenciaBoton = document.getElementById(
    "btn_prueba_frecuencia"
  );
  const pruebaKolmogorovBoton = document.getElementById(
    "btn_prueba_kolmogorov"
  );

  pruebaPromediosBoton.addEventListener("click", pruebaPromedios);
  pruebaFrecuenciaBoton.addEventListener("click", pruebaFrecuencias);
  pruebaKolmogorovBoton.addEventListener("click", pruebaKolmogorov);
  pruebaDistanciaBoton.addEventListener("click", pruebaDistancias);
  pruebaSeriesBoton.addEventListener("click", pruebaSeries);
  linealMixtoBoton.addEventListener("click", () => {
    tipoDeGenerador = LINEAL;
  });
  multiplicativoBoton.addEventListener("click", () => {
    tipoDeGenerador = MULTIPLICATIVO;
  });
  exportarLineal.addEventListener("click", () => {
    tipoDeGenerador = LINEAL;
    EXPORTAR = true;
  });
  exportarMultiplicativo.addEventListener("click", () => {
    tipoDeGenerador = MULTIPLICATIVO;
    EXPORTAR = true;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const a = +document.getElementById("parametro_a").value;
    const m = +document.getElementById("parametro_m").value;
    const c = +document.getElementById("parametro_c").value;
    const x = +document.getElementById("parametro_x").value;
    const tipo = tipoDeGenerador;

    const pseudoNumeros = generarNumeroPseudoAleatorios({
      a,
      c,
      x,
      m,
      tipo
    });
    const numerosAleatorios = generarNumerosAleatorios({ pseudoNumeros, m });
    const datosJson = JSON.stringify(numerosAleatorios);

    const nombreDeArchivo = `numeros_aleatorios_${tipo}`;
    guardarLocalStorage({
      nombre: nombreDeArchivo,
      datos: datosJson
    });
    guardarLocalStorage({
      nombre: "numeros_aleatorios",
      datos: datosJson
    });

    if (!EXPORTAR) {
      document.getElementById("titulo_pruebas").innerText =
        tipoDeGenerador === LINEAL
          ? "Prueba Estadistica: Lineal mixto"
          : "Prueba Estadistica: Multiplicativo";
    }

    if (EXPORTAR) {
      guardarArchivo({
        nombre: nombreDeArchivo,
        datos: numerosAleatorios
      });
      EXPORTAR = false;
    }
  });
});

const generarNumeroPseudoAleatorios = ({ a, c, x, m, tipo }) => {
  try {
    let randomeNumbers = [x];
    let index = 0;
    c = tipo === LINEAL ? c : 0;

    let pseudoNumber = (a * randomeNumbers[index] + c) % m;

    while (!randomeNumbers.slice(1).includes(pseudoNumber)) {
      randomeNumbers.push(pseudoNumber);
      pseudoNumber = (a * randomeNumbers[++index] + c) % m;
    }

    return randomeNumbers.slice(1);
  } catch (error) {
    console.log(error);
    return;
  }
};

const generarNumerosAleatorios = ({ pseudoNumeros, m }) => {
  return pseudoNumeros.map((pseudoNumero) => {
    return pseudoNumero / m;
  });
};
