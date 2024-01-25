import { iniciarJuego, renderizarCartas } from "./components/App.js";
import pokemon from "./data/pokemon/pokemon.js";

//ES EL DIV PRINCIPAL
const juegoContenedor = document.createElement("div");
juegoContenedor.className = "contenedor";

// INICIAR JUEGO CON LAS CARTAS YA MEZCLADAS CON LA PROPIEDAD ITEM DE LA DATA
const cartasBarajadas = iniciarJuego(pokemon.items);

// RENDERIZO LAS CARTAS EN EL CONTENDER LLAMANDO LA FUNCION DE MEZCLAR CARTAS
renderizarCartas(cartasBarajadas, juegoContenedor);

//AGREGO ROOT COMO HIJO AL CONTENEDOR
document.getElementById("root").appendChild(juegoContenedor);
