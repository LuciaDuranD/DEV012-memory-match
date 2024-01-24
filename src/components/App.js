// DUPLICAR LAS CARTAS
const duplicarCartas = (cartas) => {
  // ASIGNANDO ID UNICO A CADA CARTA
  const cartasDuplicadas = cartas.flatMap((carta) => [
    { ...carta, id: carta.id + "_1" },
    { ...carta, id: carta.id + "_2" },
  ]);

  return cartasDuplicadas;
};

const barajearCartas = (cartas) => {
  //CLONAMOS ARRAY
  const cartasBarajadas = [...cartas];

  // ALGORITMO FISHER-YATES
  for (let i = cartasBarajadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // INTERCAMBIO DE POSICIONES
    [cartasBarajadas[i], cartasBarajadas[j]] = [
      cartasBarajadas[j],
      cartasBarajadas[i],
    ];
  }

  return cartasBarajadas;
};

const inicializarJuego = (cartas) => {
  //DUPLICAR
  const cartasDuplicadas = duplicarCartas(cartas);

  //MEZCLAR
  const cartasBarajadas = barajearCartas(cartasDuplicadas);
  console.log("cartas barajadas:", cartasBarajadas);
  return cartasBarajadas;
};

//RENDERIZACION
const renderizarCartas = (cartas, contenedor) => {
  // VERIFICO QUE "CARTAS" ESTE DEFINIDO ANTES DE ITERAR
  if (!cartas) {
    console.error("El conjunto de cartas es undefined");
    return;
  }

  //LOGICA PARA RENDERIZAR LAS CARTAS DEL DOM
  cartas.forEach((carta) => {
    const cartaElement = document.createElement("div");
    cartaElement.className = "carta";

    // SE CREAN LAS IMAGENES CON EL LLAMADO DE LA URL
    const imagenElement = document.createElement("img");
    imagenElement.src = carta.image;
    imagenElement.alt = carta.id;
    cartaElement.appendChild(imagenElement);

    // EVENTO CLIC A LA CARTA
    cartaElement.addEventListener("click", () => manejarClicCarta(carta));

    //LA CARTA EN EL CONTENEDOR
    contenedor.appendChild(cartaElement);
  });

  console.log("cartas:", cartas);
};

const indicarVictoria = () => {
  //PENDIENTE
};

export { inicializarJuego, renderizarCartas, indicarVictoria };
