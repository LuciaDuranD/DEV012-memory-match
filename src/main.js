import {
  inicializarJuego,
  renderizarCartas,
  indicarVictoria,
} from "./components/App.js";
import pokemon from "./data/pokemon/pokemon.js";

const juegoContainer = document.createElement("div");
juegoContainer.className = "juego-container";

// Inicializa el juego y obtén las cartas barajadas
const cartasBarajadas = inicializarJuego(pokemon.items);

// Renderiza las cartas en el contenedor del juego
renderizarCartas(cartasBarajadas, juegoContainer);

// Agrega el contenedor del juego al elemento con id 'root' en tu HTML
document.getElementById("root").appendChild(juegoContainer);
