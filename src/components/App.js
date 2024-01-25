const duplicarCartas = (cartas) => {
  const cartasDuplicadas = [];

  for (let i = 0; i < cartas.length; i++) {
    const carta = cartas[i];
    //SE CREA LA COPIA DE LA CARTA ORIGINAL Y SE LE ASIGNA UN ID DIFERENTE
    //Y SE AGREGA AL ARRAY
    cartasDuplicadas.push({ ...carta, id: carta.id + "_1" });
    cartasDuplicadas.push({ ...carta, id: carta.id + "_2" });
  }
  return cartasDuplicadas;
};

const barajearCartas = (cartas) => {
  const cartasBarajadas = [...cartas];
  for (let i = cartasBarajadas.length - 1; i > 0; i--) {
    //CON MATCH.RANDOM HAGO QUE ME DEVUELVA CUALQUIER NUMERO ENTRE 0 Y EL "I"
    //EL "I" VA DISMINUYENDO SOBRE CADA ITERACION POR EL FOR

    //Y ASI CON LA MULTIPLICACION EXPANDE EL RANGO Y ASI NOS ARROJA NUMEROS ALEATORIOS
    //CON MATCH.FLOOR REDONDEAMOS EL NUMERO RESULTANE DE LA MULTIPLICACION HACIA ABAJO
    //PARA OBTENER UN NUMERO ENTERO EN EL RANGO DESEADO
    const j = Math.floor(Math.random() * (i + 1));
    [cartasBarajadas[i], cartasBarajadas[j]] = [
      cartasBarajadas[j],
      cartasBarajadas[i],
    ];
  }
  return cartasBarajadas;
};

let cartaSeleccionada = null;

const manejarClicCarta = (carta) => {
  if (cartaSeleccionada) {
    //CONDICIONO QUE LAS IMAGENES DE LAS CARTAS SEAN IGUALES Y ME LO MUESTRA EN CONSOLA
    if (cartaSeleccionada.image === carta.image) {
      console.log("¡Encontraste la pareja!");
    } else {
      console.log("No coincide, vamos de nuevo...");
      //Y ADICIONAL CON EL METODO SETIMEOUT POR UN PERIODO DE 1000 MILISEGUNDOS,
      setTimeout(() => ocultarCartas(), 1000);
    }
    cartaSeleccionada = null;
  } else {
    cartaSeleccionada = carta;
  }
};

const ocultarCartas = () => {
  console.log("Ocultando las cartas...");

  const cartasVisibles = document.querySelectorAll(
    ".carta:not(.oculta):not(.emparejada)"
  );
  //CON EL METODO SETTIMEOUT PROGRAMO UNA FUNCION CON UN TIEMPO DE 1000 MILISEGUNDOS
  setTimeout(() => {
    //ITERO SOBRE CADA CARTA VISIBLE Y SE AGREGA LA CLASE OCULTA PARA QUE DESAPAREZCAN
    cartasVisibles.forEach((carta) => carta.classList.add("ocultar"));
    cartaSeleccionada = null;
  }, 1000);
};

const iniciarJuego = (cartas) => {
  const cartasDuplicadas = duplicarCartas(cartas);
  const cartasBarajadas = barajearCartas(cartasDuplicadas);
  console.log("cartas barajadas:", cartasBarajadas);
  return cartasBarajadas;
};

const renderizarCartas = (cartas, contenedor) => {
  if (!cartas) {
    console.error("El conjunto de cartas es undefined");
    return;
  }
  cartas.forEach((carta) => {
    //CREO UN DIV CON CLASS CARTA PARA CSS
    const cartaElement = document.createElement("div");
    cartaElement.className = "carta";
    //CREO EL ELEMENTO DE IMG PARA MOSTRAR LAS URL DE LA DATA Y LOS ID CORRESPONDIENTES
    //CON SRC LAS IMAGENES Y CON ALT LOS ID
    const imagenElement = document.createElement("img");
    imagenElement.src = carta.image;
    imagenElement.alt = carta.id;
    //SE AGREGA IMG AL DIV DE CARTA
    cartaElement.appendChild(imagenElement);
    cartaElement.addEventListener("click", () => manejarClicCarta(carta));
    contenedor.appendChild(cartaElement);
  });
  console.log("cartas:", cartas);
};

const indicarVictoria = () => {
  // PENDIENTE
};

export { iniciarJuego, renderizarCartas, indicarVictoria, manejarClicCarta };
