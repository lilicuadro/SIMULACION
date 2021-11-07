function descargarArchivo({ nombre, datos }) {
  const downloadElt = document.createElement("a");
  const blob = new Blob([datos], {
    type: "octet/stream"
  });
  const url = URL.createObjectURL(blob);
  downloadElt.setAttribute("href", url);
  downloadElt.setAttribute("download", nombre);
  downloadElt.style.display = "none";
  document.body.appendChild(downloadElt);
  downloadElt.click();
  document.body.removeChild(downloadElt);
  URL.revokeObjectURL(url);
}

function guardarArchivo({ nombre, datos = [] }) {
  const tabla = datos.map((dato) => {
    return { "Numeros aleatorios": dato };
  });

  console.log({ tabla });

  const opciones = [{ sheetid: "Hoja1", header: false }];
  const resultado = alasql(`SELECT * INTO XLSX("${nombre}.xlsx",?) FROM ?`, [
    opciones,
    [tabla]
  ]);
}
