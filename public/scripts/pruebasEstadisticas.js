function pruebaPromedios() {
  try {
    const U = 0.5;
    const Z = 1.96;
    const numerosAleatorios = JSON.parse(
      leerLocalStorage({ nombre: "numeros_aleatorios" }) || "[]"
    );
    const sumatoria = numerosAleatorios.reduce(
      (sum, currentValue) => sum + currentValue,
      0
    );
    console.log({ numerosAleatorios, sumatoria });
    const N = numerosAleatorios.length;
    const promedio = sumatoria / N;

    const Zo = Math.abs(((promedio - U) * Math.sqrt(N)) / Math.sqrt(1 / 12));

    const LI = U - Z * (1 / Math.sqrt(12 * N));
    const LS = U + Z * (1 / Math.sqrt(12 * N));

    if (LI <= promedio && promedio <= LS)
      Swal.fire(
        "Prueba Promedios pasada",
        `Por límites, los Numeros Aleatorios están uniformemente distribuidos | promedio: ${promedio}, LI: ${LI}, LS: ${LS}`,
        "success"
      );
    else
      Swal.fire(
        "Prueba Promedios fallida",
        `Por límites, los Numeros Aleatorios no están uniformemente distribuidos | promedio: ${promedio}, LI: ${LI}, LS: ${LS}`,
        "error"
      );

    if (Zo < Z)
      Swal.fire(
        "Prueba Promedios pasada",
        `Por estadístico de prueba, los Numeros Aleatorios están uniformemente distribuidos | Zo: ${Zo}, Z: ${Z}`,
        "success"
      );
    else
      Swal.fire(
        "Prueba Promedios fallida",
        `Por estadístico de prueba, los Numeros Aleatorios no están uniformemente distribuidos | Zo: ${Zo}, Z: ${Z}`,
        "error"
      );
  } catch (error) {
    console.error(error);
  }
}

function pruebaFrecuencias() {
  try {
    const n = 4;
    const X = 7.8147;
    const numerosAleatorios = ordenarNumeros(
      JSON.parse(leerLocalStorage({ nombre: "numeros_aleatorios" }) || "[]")
    );
    const N = numerosAleatorios.length;
    const intervalos = [];

    for (let i = 0; i < n; i++) {
      intervalos.push({
        intervalo: [i / n, (i + 1) / n],
        fei: N / n,
        foi: 0,
        tag: `n${i + 1}`
      });
    }

    for (const [, prn] of numerosAleatorios.entries()) {
      try {
        for (const [index] of intervalos.entries()) {
          try {
            if (
              prn >= intervalos[index].intervalo[0] &&
              prn < intervalos[index].intervalo[1]
            ) {
              intervalos[index].foi += 1;
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    const Xo = intervalos.reduce(
      (sum, current) =>
        sum + Math.pow(current.foi - current.fei, 2) / current.fei,
      0
    );

    if (Xo < X)
      Swal.fire(
        "Prueba Frecuencia pasada",
        `Por chi cuadrado, los Números aleatorios están uniformemente distribuidos y es independiente | Xo: ${Xo}, X: ${X}`,
        "success"
      );
    else
      Swal.fire(
        "Prueba Frecuencia fallida",
        `Por chi cuadrado, los Números aleatorios no están uniformemente distribuidos | Xo: ${Xo}, X: ${X}`,
        "error"
      );
  } catch (error) {
    console.log(error);
  }
}

function pruebaKolmogorov() {
  try {
    const D = 0.134;
    const numerosAleatorios = ordenarNumeros(
      JSON.parse(leerLocalStorage({ nombre: "numeros_aleatorios" }) || "[]")
    );
    let numerosAleatoriosLista = [];
    let positivo = [];
    let negativo = [];
    const N = numerosAleatorios.length;

    for (let i = 0; i < N; i++) {
      const fn = (i + 1) / N;
      const xi = numerosAleatorios[i];
      const izquierda = Math.abs(fn - xi);
      const derecho = Math.abs(xi - (i + 1 - 1) / N);

      numerosAleatoriosLista.push({
        fn,
        xi,
        izquierda,
        derecho
      });

      positivo.push(izquierda);
      negativo.push(derecho);
    }

    const DNpositivo = Math.max(...positivo.map((number) => Math.abs(number)));
    const DNnegativo = Math.max(...negativo.map((number) => Math.abs(number)));
    const DN = Math.max(DNpositivo, DNnegativo);

    if (DN <= D)
      Swal.fire(
        "Prueba Kolmogorov pasada",
        `Por estadístico de prueba, los numerosAleatorios están uniformemente distribuidos | DN: ${DN}, D: ${D}`,
        "success"
      );
    else
      Swal.fire(
        "Prueba Kolmogorov fallida",
        `Por estadístico de prueba, los numerosAleatorios no están uniformemente distribuidos | DN: ${DN}, D: ${D}`,
        "error"
      );
  } catch (error) {
    console.log(error);
  }
}

function pruebaDistancias() {
  try {
    const n = 4;
    const X = 7.8147;
    const ALPHA = 0.3;
    const BETA = 0.7;
    const numerosAleatorios = JSON.parse(
      leerLocalStorage({ nombre: "numeros_aleatorios" }) || "[]"
    );

    const tetha = BETA - ALPHA;
    let huecos = [];
    let pi;
    let SumFoi = 0;

    const indexes = numerosAleatorios
      .map((prn, index) => prn >= ALPHA && prn <= BETA && index)
      .filter((prn) => prn);

    for (let i = 0; i <= n; i++) {
      if (i >= n) pi = Math.pow(1 - tetha, n);
      else pi = tetha * Math.pow(1 - tetha, i);

      huecos[i] = {
        pi,
        i,
        tag: `p${i}`,
        foi: 0
      };
    }

    for (let i = 0; i < indexes.length - 1; i++) {
      let hole = indexes[i + 1] - indexes[i] - 1;

      for (let j = 0; j <= n; j++) {
        if (hole === j) {
          huecos[j].foi += 1;
          SumFoi++;
        }
      }

      if (hole > n) {
        huecos[n].foi += 1;
        SumFoi++;
      }
    }

    huecos.map((_, index) => (huecos[index].fei = SumFoi * huecos[index].pi));

    console.table(huecos);
    const Xo = huecos.reduce(
      (sum, curr) => sum + Math.pow(curr.foi - curr.fei, 2) / curr.fei,
      0
    );

    if (Xo < X)
      Swal.fire(
        "Prueba Distancia pasada",
        `Por chi cuadrado, los Numeros Aleatorios están uniformemente distribuidos y es independiente | Xo: ${Xo}, X: ${X}`,
        "success"
      );
    else
      Swal.fire(
        "Prueba Distancia fallida",
        `Por chi cuadrado, los Numeros Aleatorios no están uniformemente distribuidos y es independiente | Xo: ${Xo}, X: ${X}`,
        "error"
      );
  } catch (error) {
    console.log(error);
  }
}

function pruebaSeries() {
  try {
    const n = 5;
    const numerosAleatorios = JSON.parse(
      leerLocalStorage({ nombre: "numeros_aleatorios" }) || "[]"
    );
    let planoXY = [];
    let aux = [];
    let pares = [];
    const N = numerosAleatorios.length;
    const fe = (N - 1) / Math.pow(n, 2);
    let total = 0;
    let Xo = 0;
    const X = 36.415;

    for (let i = 0; i < N - 1; i++) {
      pares.push([numerosAleatorios[i], numerosAleatorios[i + 1]]);
    }

    let count = 0;

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        count++;
        aux.push({ x: j / n, y: i / n, fe, fo: 0 });
      }
      planoXY.push(aux);
      aux = [];
    }

    for (let i = 0; i < pares.length; i++) {
      for (let j = 0; j < planoXY.length; j++) {
        planoXY[j].map((pair, index) => {
          const x = pares[i][0];
          const y = pares[i][1];
          const inX = pair.x;
          const inY = pair.y;

          if (inX - 0.2 <= x && x < inX && inY - 0.2 <= y && y < inY) {
            planoXY[j][index].fo += 1;
          }
        });
      }
    }

    for (const data of planoXY) {
      total += data.reduce((sum, curr) => sum + curr.fo, 0);
      Xo += data.reduce((sum, curr) => sum + Math.pow(curr.fo - curr.fe, 2), 0);
    }

    const final = (Math.pow(n, 2) / (N - 1)) * Xo;

    console.table(planoXY);

    planoXY.map((item) => item.map((i) => console.log(i)));

    if (final < X)
      Swal.fire(
        "Prueba Series pasada",
        `Por estadístico de prueba, los NSA están uniformemente distribuidos | final: ${final}, X: ${X}`,
        "success"
      );
    else
      Swal.fire(
        "Prueba Series fallida",
        `Por estadístico de prueba, los NSA no están uniformemente distribuidos | final: ${final}, X: ${X}`,
        "error"
      );
  } catch (error) {
    console.log(error);
  }
}
