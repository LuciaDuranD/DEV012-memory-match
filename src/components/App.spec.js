import {
  duplicarCartas,
  barajearCartas,
  renderizarCartas,
  ocultarCarta,
  mostrarCarta,
} from "./App";

//PRUEBAS UNITARIAS PARA LA FUNCION DE DUPLICARCARTAS
//PRIMERA PRUEBA
describe("duplicarCartas", () => {
  it("duplica correctamente un array de cartas", () => {
    //NOMBRAMOS LA PRUEBA PARA LA GESTION QUE QUEREMOS PROBAR
    const cartas = [
      //DEFINIMOS EL ARRAY Y LO LLAMAMOS CON ID Y CON NOMBRE DE LA CARTA
      { id: 1, nombre: "Carta 1" },
      { id: 2, nombre: "Carta 2" },
    ];

    const cartasDuplicadas = duplicarCartas(cartas);
    //LLAMAMOS LA FUNCION

    expect(cartasDuplicadas.length).toBe(cartas.length * 2);
    //SE EVALUA LA LONGITUD DEL ARRAY Y COMPARAMOS SI EL VALOR OBTENIDO ES IGUAL AL VALOR ESPERADO
    //CALCULAMOS EL DOBLE DE LA LONGITUD DEL ARRAY ORIGINAL
  });
});

//SEGUNDA PRUEBA
describe("duplicarCartas", () => {
  it("devuelve un array vacío si se le pasa un array vacío", () => {
    //NOMBRAMOS LA PRUEBA PARA LA GESTION QUE QUEREMOS PROBAR
    const cartas = [];
    //GENERAMOS UN ARRAY VACIO

    const cartasDuplicadas = duplicarCartas(cartas);
    //LLAMAMOS LA FUNCION

    expect(cartasDuplicadas.length).toBe(0);
    //VALIDAMOS SI EL ARRAY RESULTANTE ES IGUAL A 0
  });
});

//TERCERA PRUEBA
describe("duplicarCartas", () => {
  it("duplica correctamente un array de cartas", () => {
    //NOMBRAMOS LA PRUEBA PARA LA GESTION QUE QUEREMOS PROBAR
    const cartas = [
      //DEFINIMOS EL ARRAY Y LO LLAMAMOS CON ID Y CON NOMBRE DE LA CARTA
      { id: 1, nombre: "Carta 1" },
      { id: 2, nombre: "Carta 2" },
      { id: 3, nombre: "Carta 3" },
      { id: 4, nombre: "Carta 4" },
    ];

    const cartasDuplicadas = duplicarCartas(cartas);
    //LLAMAMOS LA FUNCION

    expect(cartasDuplicadas.length).toBe(cartas.length * 2);
    //VERIFICAMOS SI SE DUPLICAN LAS CARTAS DEL ARRAY CORRECTAMENTE

    const idSet = new Set(cartasDuplicadas.map((carta) => carta.id));
    //CREAMOS EL SET CON SOLO LOS ID
    expect(idSet.size).toBe(cartas.length * 2);
    //SE VERIFICA LA LONGITUD DE IDSET QUE DEBE SER EL DOBLE DEL ARRAY ORIGINAL

    cartas.forEach((carta) => {
      //ITERAMOS SOBRE CADA CARTA DEL ARRAY ORIGINAL
      const cartaDuplicada1 = cartasDuplicadas.find(
        (c) => c.id === carta.id + "_1"
      );
      const cartaDuplicada2 = cartasDuplicadas.find(
        (c) => c.id === carta.id + "_2"
      );
      //SE VERIFICA SI LA CARTA DUPLICADA TIENE SU VERSION DUPLICADA POR ESO LOS SUFIJOS DE 1 Y 2
      expect(cartaDuplicada1).toBeTruthy();
      expect(cartaDuplicada2).toBeTruthy();
      //
    });
  });
});

//PRUEBAS UNITARIAS PARA LA BARAJEARCARTAS
//PRIMERA PRUEBA
describe("barajearCartas", () => {
  it("barajea correctamente un array de cartas", () => {
    //NOMBRAMOS LA PRUEBA PARA LA GESTION QUE QUEREMOS PROBAR
    const cartas = [
      //DEFINIMOS EL ARRAY Y LO LLAMAMOS CON ID Y CON NOMBRE DE LA CARTA
      { id: 1, nombre: "Carta 1" },
      { id: 2, nombre: "Carta 2" },
    ];
    const cartasBarajadas = barajearCartas(cartas);
    //LLAMAMOS LA FUNCION

    const cartasSet = new Set(cartas.map((card) => JSON.stringify(card)));
    //CON EL METODO JSON.STRINGIFY PASAMOS LAS CARTAS A CADENA DE TEXTO JSON CON ESTO SE COMPARA MAS RAPIDO Y FACIL SI
    //SE TIENEN CARTAS REPETIDAS O FALTANTES AL IGUAL QUE DUPLICADOS - MITIGAR ERRORES
    const cartasBarajadasSet = new Set(
      cartasBarajadas.map((card) => JSON.stringify(card))
    );
    //HACEMOS UN CONJUNTO DE SET UNO PARA EL ARRAY ORIGINAL Y OTRO PARA LAS BARAJEADAS ASI SE ELIMINA LOS DUPLICADOS
    //PARA PODER COMPARARLOS
    expect(cartasBarajadasSet).toEqual(cartasSet);
    //COMPARA LOS CONJUNTOS PARA QUE AL BARAJEAR NO SE AGREGE NI SE ELIMINE NINGUNA CARTA AL MEZCLARLAS
  });
});

//SEGUNDA PRUEBA
describe("barajearCartas", () => {
  it("barajea correctamente un array de cartas y no modifica el array original", () => {
    //NOMBRAMOS LA PRUEBA PARA LA GESTION QUE QUEREMOS PROBAR
    const cartas = [
      { id: 1, nombre: "Carta 1" },
      { id: 2, nombre: "Carta 2" },
      { id: 3, nombre: "Carta 3" },
      { id: 4, nombre: "Carta 4" },
      { id: 5, nombre: "Carta 5" },
      //HACEMOS UN ARRAY CON 5 OBJETOS CON PROPIEDAD ID Y NOMBRE
    ];

    const cartasBarajadas = barajearCartas(cartas);
    //LLAMAMOS LA FUNCION

    expect(cartasBarajadas).not.toEqual(cartas);
    //VERIFICAMOS QUE EL ARRAY NO SEA IGUAL AL ORIGINAL
    expect(cartasBarajadas.length).toEqual(cartas.length);
    //VERIFICAMOS QUE LA LONGITUD SEA IGUAL AL ORIGINAL

    const cartasSet = new Set(cartas.map((card) => JSON.stringify(card)));
    const cartasBarajadasSet = new Set(
      cartasBarajadas.map((card) => JSON.stringify(card))
      //SE CREA CONJUNTO SET Y VALIDAMOS QUE LOS DOS CONJUNTOS ESTEN IGUALES SIN IMPORTAR SU ORDEN
    );
    expect(cartasBarajadasSet).toEqual(cartasSet);
    //VERIFICAMOS QUE EL CONJUNTO SER SEA IGUAL AL ARRAY ORIGINAL SIN IMPORTAR SU ORDEN
  });
});

//TERCERA PRUEBA
describe("barajearCartas", () => {
  it("no debe modificar el array original y barajear correctamente un array de cartas", () => {
    //NOMBRAMOS LA PRUEBA PARA LA GESTION QUE QUEREMOS PROBAR
    const cartas = [
      { id: 1, nombre: "Carta 1" },
      { id: 2, nombre: "Carta 2" },
      { id: 3, nombre: "Carta 3" },
      { id: 4, nombre: "Carta 4" },
      { id: 5, nombre: "Carta 5" },
      //HACEMOS UN ARRAY CON 5 OBJETOS CON PROPIEDAD ID Y NOMBRE
    ];

    const copiaOriginal = [...cartas];
    //HACEMOS UNA COPIA DEL ARRAY CARTAS

    const cartasBarajadas = barajearCartas(cartas);
    //LLAMAMOS LA FUNCION

    expect(cartas).toEqual(copiaOriginal);
    //VERIFICAMOS QUE EL ARRAY CARTAS SEA IGUAL A LA COPIA ORIGINAL PARA QUE AL MEZCLAR NO SE MODIFIQUE EL ARRAY CARTAS

    expect(cartasBarajadas.length).toEqual(cartas.length);
    //VERIFICAMOS QUE LA LONGITUD SEA IGUAL AL ORIGINAL

    let mismoContenido = true;
    for (let i = 0; i < cartas.length; i++) {
      if (cartas[i].id !== cartasBarajadas[i].id) {
        mismoContenido = false;
        break;
      }
    }
    expect(mismoContenido).toBe(false);
    //HACEMOS UNA COMPARACION ITERATIVA CON EL FOR TANTO DEL ARRAY CARTAS COMO LA COPIA DEL ARRAY ORIGINAL PARA VER QUE NO SEAN IDENTICO EL ORDEN
    //SI ALGUNA CARTA EN POSICION I NO COINCIDE CON ID SE ESTABLESE EN FALSE CON LA VARIABLE "MISMOCONTENIDO"
    //ASI SE VERIFICA QUE NINGUNA CARTA TIENE LA MISMA POSICION
  });
});

//PRUEBAS UNITARIAS PARA LA FUNCION DE RENDERIZARCARTAS
//PRIMERA PRUEBA
describe("renderizarCartas", () => {
  it("renderiza correctamente las cartas en el contenedor vacío", () => {
    //NOMBRAMOS LA PRUEBA PARA LA GESTION QUE QUEREMOS PROBAR
    document.body.innerHTML = '<div id="contenedor"></div>';
    //SE CREA UN CONTENEDOR VACIA EN EL HTML PARA SIMULAR RENDERIZAR LAS CARTAS
    const contenedor = document.getElementById("contenedor");
    const cartas = [];
    //CON SU ID CONTENDERO DEL CUAL SE DEFINE UN ARRAY VACIO Y SE PASA COMO ARGUMENTO

    renderizarCartas(cartas, contenedor);
    //LLAMAMOS LA FUNCION

    expect(contenedor.querySelectorAll(".carta").length).toBe(0);
    //VERIFICAMOS QUE ESTA VACIO QUE NO TENGA NINGUN ELEMENTO CON CLASS CARTA
  });
});

//SEGUNDA PRUEBA
describe("renderizarCartas", () => {
  it("renderiza correctamente las cartas en el contenedor con cartas específicas", () => {
    //NOMBRAMOS LA PRUEBA PARA LA GESTION QUE QUEREMOS PROBAR
    const contenedor = document.createElement("div");
    contenedor.id = "contenedor";
    document.body.appendChild(contenedor);
    //CREAMOS UN ID CONTENEDOR Y SE AGREGA AL CUERPO DEL DOCUMENTO UTILIZADO

    const cartas = [
      //CREAMOS UN ARRAY CON ID Y IMG
      { id: 1, image: "imagen1.jpg" },
      { id: 2, image: "imagen2.jpg" },
    ];

    renderizarCartas(cartas, contenedor);
    //LLAMAMOS LA FUNCION

    const cartasRenderizadas = contenedor.querySelectorAll(".carta");
    expect(cartasRenderizadas.length).toBe(cartas.length);
    //SE SELECCIONA TODAS LAS CARTAS YA RENDERIZADAS Y LUEGO MIRAMOS QUE LA LONGITUD SEA LA MISMA Y VEREFICAMOS QUE ESTE CORRECTO

    cartas.forEach((carta, index) => {
      const cartaRenderizada = cartasRenderizadas[index];
      const cartaImagen = cartaRenderizada.querySelector(".carta-imagen");
      expect(cartaImagen.src).toContain(carta.image);
      expect(cartaImagen.alt).toBe(String(carta.id));
      //CREAMOS UN CICLO SOBRE CADA CARTA EN EL ARRAY CARTAS Y SOBRE CADA CARTA SE BUSCA SU DUPLA YA RENDERIZADA EN EL DOM
      //ASI SABREMOS QUE LAS IMAGENES COINCIDEN
    });
  });
});

//PRUEBAS UNITARIAS PARA LA FUNCION DE OCULTARCARTA
//PRIMERA PRUEBA
describe("ocultarCarta", () => {
  it("oculta correctamente la carta", () => {
    //NOMBRAMOS LA PRUEBA PARA LA GESTION QUE QUEREMOS PROBAR
    document.body.innerHTML =
      '<div id="contenedor"><div class="carta"><img class="carta-imagen" alt="1"></div></div>';
    //CREAMOS UN DIV CONTENEDOR EL CUAL SE LE AGREGA UNA CARTA ESTA CONTIENE LA IMAGEN Y ATRIBUTO ALT 1
    const imagenCarta = document.querySelector(".carta-imagen");
    //SELECCIONAMOS LA IMAGEN DE LA CARTA Y SE ALMACENA EN LA VARIABLE

    ocultarCarta(imagenCarta);
    //LLAMAMOS LA FUNCION

    expect(imagenCarta.style.display).toBe("none");
    //VERIFICAMOS QUE EL ESTILO DE DISPLAY SEA NONE Y CON ESO CONFIRMAMOS QUE LA IMAGEN ID ESTA OCULTA
  });
});

//SEGUNDA PRUEBA
describe("ocultarCarta", () => {
  it("oculta correctamente la carta sin mostrar el dorso", () => {
    //NOMBRAMOS LA PRUEBA PARA LA GESTION QUE QUEREMOS PROBAR
    document.body.innerHTML =
      '<div id="contenedor"><div class="carta"><img class="carta-imagen" alt="1"></div></div>';
    //CREAMOS UN DIV CONTENEDOR EL CUAL SE LE AGREGA UNA CARTA ESTA CONTIENE LA IMAGEN Y ATRIBUTO ALT 1
    const imagenCarta = document.querySelector(".carta-imagen");
    //SELECCIONAMOS LA IMAGEN DE LA CARTA Y SE ALMACENA EN LA VARIABLE

    ocultarCarta(imagenCarta);
    //LLAMAMOS LA FUNCION

    expect(imagenCarta.style.display).toBe("none");
    //VERIFICAMOS QUE EL ESTILO DE DISPLAY SEA NONE Y CON ESO CONFIRMAMOS QUE LA IMAGEN ID ESTA OCULTA

    const dorsoCarta = document.querySelector(".dorso");
    expect(dorsoCarta).toBeNull();
    // VERIFICAMOS QUE NO MUESTRE EL DORSO
  });
});

//PRUEBAS UNITARIAS PARA LA FUNCION DE MOSTRARCARTA
//PRIMERA PRUEBA
describe("mostrarCarta", () => {
  it("muestra la carta cuando se llama a la función", () => {
    //NOMBRAMOS LA PRUEBA PARA LA GESTION QUE QUEREMOS PROBAR
    const parentElement = document.createElement("div");
    const cartaElement = document.createElement("div");
    const cartaImagenElement = document.createElement("img");
    const dorsoImagenElement = document.createElement("img");
    //CREAMOS DIVS PARA LA CARTA Y SU DORSO OTRO QUE REPRESENTA LA CARTA OTRO PARA LA IMAGEN DE DATA Y OTRO PARA IMAGEN DORSO

    cartaImagenElement.className = "carta-imagen";
    //SE ASIGNA CLASS PARA LA IMAGEN DATA
    dorsoImagenElement.className = "dorso";
    //SE ASIGNA CLASS PARA LA IMAGEN DORSO

    cartaElement.appendChild(cartaImagenElement);
    cartaElement.appendChild(dorsoImagenElement);
    parentElement.appendChild(cartaElement);
    //SE ASIGNA LOS HIJOS DE EL DIV DEL CONTENEDOR TANTO CARTA COMO IMAGEN ID Y IMAGEN DORSO

    mostrarCarta(cartaImagenElement);
    //LLAMAMOS LA FUNCION

    expect(cartaImagenElement.style.display).toBe("block");
    //SE ESPERA QUE LA IMAGEN ID ESTE BLOQUEADA CON LO CUAL SE DEBE VER
  });

  //SEGUNDA PRUEBA
  it("oculta el dorso de la carta cuando se llama a la función", () => {
    //NOMBRAMOS LA PRUEBA PARA LA GESTION QUE QUEREMOS PROBAR
    const parentElement = document.createElement("div");
    const cartaElement = document.createElement("div");
    const cartaImagenElement = document.createElement("img");
    const dorsoImagenElement = document.createElement("img");
    //CREAMOS DIVS PARA LA CARTA Y SU DORSO OTRO QUE REPRESENTA LA CARTA OTRO PARA LA IMAGEN DE DATA Y OTRO PARA IMAGEN DORSO

    cartaImagenElement.className = "carta-imagen";
    //SE ASIGNA CLASS PARA LA IMAGEN DATA
    dorsoImagenElement.className = "dorso";
    //SE ASIGNA CLASS PARA LA IMAGEN DORSO

    cartaElement.appendChild(cartaImagenElement);
    cartaElement.appendChild(dorsoImagenElement);
    parentElement.appendChild(cartaElement);
    //SE ASIGNA LOS HIJOS DE EL DIV DEL CONTENEDOR TANTO CARTA COMO IMAGEN ID Y IMAGEN DORSO

    mostrarCarta(cartaImagenElement);
    //LLAMAMOS LA FUNCION

    expect(dorsoImagenElement.style.display).toBe("none");
    //SE ESPERA QUE LA IMAGEN DORSO ESTE OCULTA CON LO CUAL NO SE DEBE VER
  });
});
