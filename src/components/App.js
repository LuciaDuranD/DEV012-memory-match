//MAXIMO DE PAREJAS 9
const MAX_PAREJAS = 9;
//VARIABLES PARA ALMACENAR CARTAS Y CONTADOR DE PAREJAS
let cartaSeleccionada = null;
let parejasEncontradas = 0;

//FUNCION DE DUPLAR LAS CARTAS
const duplicarCartas = (cartas) => {
  if (!Array.isArray(cartas)) {
    return [];
    //SI NO ES UN ARRAY LO RETORNA VACIO
  }

  const cartasDuplicadas = [];
  //COMIENZA VACIO DONDE SE ALMACENAN LAS CARTAS DUPLICADAS
  cartas.forEach((carta) => {
    cartasDuplicadas.push({ ...carta, id: carta.id + "_1" });
    cartasDuplicadas.push({ ...carta, id: carta.id + "_2" });
  });
  //SE ITERA SOBRE CADA ELEMENTO DEL ARRAY Y CADA CARTA SE DUPLICA CREANDO DOS CARTAS CON ID
  //UNICO PARA DIFERENCIARLAS --- CON PUSH AGREGAMOS MAS DE UN ELEMENTO AL FINAL DEL ARRAY

  return cartasDuplicadas
    .sort(() => Math.random() - 0.5)
    .slice(0, MAX_PAREJAS * 2);
  //REGRESAMOS EL ARRAY DESPUES DE MEZCLARLAS CON SORT Y CON SLICE PARA REDUCIR
  //EL TAMAÑO DEL ARRAY CON MATH.RANDOM ARROJA UN ELEMENTO ALEATORIO
};

//ALGORITMO DE FISHER YATES
const barajearCartas = (cartas) => {
  const cartasCopia = [...cartas]; // Copia el array original
  for (let i = cartasCopia.length - 1; i > 0; i--) {
    //ITERO SOBRE CADA ELEMENTO DEL ARRAY DE EL ULTIMO HASTA EL 2
    const j = Math.floor(Math.random() * (i + 1));
    //CON MATH.FLOOR EN CADA ITERACION HENERA UN NUMERO ALEATORIO 'J' EN RANGO DE
    //0 Y INDICE 'I' Y EL NUMERO SE USA PARA INTERCAMBIAR EL NUMERO ACTUAL.
    [cartasCopia[i], cartasCopia[j]] = [cartasCopia[j], cartasCopia[i]];
    //CON ESTO LOS INTERCALAMOS
  }
  return cartasCopia; //YA LO REGRESA TODO MEZCLADO
};

const manejarClicCarta = (cartaElement, cartas) => {
  //TENEMOS 2 PARAMETROS
  //CARTAELEMENT QUE REPRESENTA EL ELEMENTO DE LA CARTA EN EL QUE SE DA EL EVENTO CLIC Y
  //CARTAS QUE ES EL ARRAY
  const imagenCarta = cartaElement.querySelector(".carta-imagen");
  //CON EL EVENTO CLIC SE SELECCIONA LA IMAGEN DE LA CARTA CON EL QUERYSELETOR
  //CON SU CORRESPONDIENTE CLASS EN CSS
  const cartaActual = cartas.find((c) => c.id === imagenCarta.alt);
  //BUSCA LA CARTA CORRECTA EN EL ARRAY QUE TENGA EL MISMO ID DE ALT CON SU CLIC
  if (
    cartaElement.classList.contains("emparejada") ||
    cartaElement === cartaSeleccionada
    //SE VERIFICA SI LA CARTA ESTA EMPAREJADA O SI YA FUE SELECCIONADA
  ) {
    return;
  }

  mostrarCarta(imagenCarta);
  //SE LLAMA LA FUNCION MOSTRAR CARTA

  //COMPARAMOS EL NUMERO ID DE LAS CAARTAS SI COINCIDEN
  if (!cartaSeleccionada) {
    cartaSeleccionada = cartaElement;
  } else {
    const imagenCartaSeleccionada =
      cartaSeleccionada.querySelector(".carta-imagen");
    const cartaSeleccionadaActual = cartas.find(
      (c) => c.id === imagenCartaSeleccionada.alt
    );

    //COMPARA LAS IMAGENES DE LAS CARTAS
    if (cartaActual.image === cartaSeleccionadaActual.image) {
      cartaElement.classList.add("emparejada");
      cartaSeleccionada.classList.add("emparejada");
      parejasEncontradas++;
      console.log("Parejas encontradas:", parejasEncontradas);
      //CON ESTO HACEMOS QUE EL ALERT SALGA CON CADA MULTIPLO DE 9 AL ENCONTRAR LAS PAREJAS
      if (parejasEncontradas > 0 && parejasEncontradas % 9 === 0) {
        alert("¡Felicidades! Has encontrado todas las parejas.");
      }
      //CON SETTIMEUOT SI NO COINCIDEN LAS CARTAS SE OCULTAN CON UN TIEMPO DE MEDIO SEGUNDO
    } else {
      setTimeout(() => {
        ocultarCarta(imagenCarta);
        ocultarCarta(imagenCartaSeleccionada);
      }, 550);
    }
    cartaSeleccionada = null;
    //LA CARTA EN LA QUE SE DA CLIC ES LA CARTA SELECCIONADA
  }
};

const mostrarCarta = (imagenCarta) => {
  //PASAMOS EL PARAMETRO DE IMAGEN CARTA PARA ASOCIARLOS CON UN ELEMENTO HTML
  if (imagenCarta) {
    //VERIFICAMOS QUE NO SEA NULA O NO ESTE DEFINIDA POR LO CUAL SERIA FALSE
    imagenCarta.style.display = "block";
    //CAMBIAMOS EL ESTILO DE CSS PARA QUE SEA VISIBLE CON DISPLAY CON BLOC MUESTRA LA OTRA IMAGEN
    const dorso = imagenCarta.parentElement.querySelector(".dorso");
    //EL ELEMENTO CON CLASE DORSO
    if (dorso) {
      //VERIFICA QUE LO ENCUENTRE
      dorso.style.display = "none";
      //Y LO OCULTA SI DISPLAY ESTA EN NONE
    }
  }
};

const ocultarCarta = (imagenCarta) => {
  //NUEVAMENTE PASA EL PARAMENTRO QUE ESPERA EL ELEMENTO DE HTML
  console.log("Ocultando carta:", imagenCarta);
  //IMPRIMIMOS MENSAJE EN CONSOLA PARA DEPURAR QUE FUNCIONA
  if (imagenCarta) {
    //VERIFICAMOS SI ES NULO O NO DEFINIDO LO CUAL ES FALSE
    imagenCarta.style.display = "none";
    //CAMBIAMOS ESTILO EN CSS PARA OCULTARLO SI DISPLAY ES EN NONE
    const dorso = imagenCarta.parentElement.querySelector(".dorso");
    //VALIDAMOS EL HIJO QUE ES DORSO DE EL PADRE IMAGENCARTA
    if (dorso) {
      //VERIFICA QUE EXISTA EL ELEMENTO
      dorso.style.display = "block";
      //PASAMOS DISPLAY A BLOCK PARA QUE SOLO SE VEA LA IMAGEN DORSO
    }
  }
};

const renderizarCartas = (cartas, contenedor) => {
  //PASAMOS DOS PARAMETROS CARTAS QUE ES EL ARRAY Y CONTENEDOR EL ELEMENTO HTML DONDE SE
  //RENDERIZAN LAS CARTAS
  contenedor.innerHTML = "";
  //BORRAMOS TODO EL CONTENIDO DEL HTML PARA LIMPIARLO ANTES DE RENDIZAR LAS CARTAS
  cartas.forEach((carta) => {
    const cartaElement = document.createElement("div");
    cartaElement.className = "carta";

    const cartaImagenElement = document.createElement("img");
    cartaImagenElement.src = carta.image;
    cartaImagenElement.alt = carta.id;
    cartaImagenElement.className = "carta-imagen";
    cartaElement.appendChild(cartaImagenElement);

    const dorsoImagenElement = document.createElement("img");
    dorsoImagenElement.src = "./imagenes/dormir.png";
    dorsoImagenElement.alt = "dorso";
    dorsoImagenElement.className = "dorso";
    cartaElement.appendChild(dorsoImagenElement);

    cartaElement.addEventListener("click", () => {
      manejarClicCarta(cartaElement, cartas);
    });

    contenedor.appendChild(cartaElement);
  });

  //ASIGNAMOS UN TIEMPO DE CAMBIO DE IMAGEN DORSO A IMAGEN DE LA DATA
  setTimeout(() => {
    contenedor.querySelectorAll(".dorso").forEach((dorso) => {
      ocultarCarta(dorso);
    });
  }, 2000);
};

export {
  duplicarCartas,
  barajearCartas,
  renderizarCartas,
  ocultarCarta,
  mostrarCarta,
  manejarClicCarta,
};
