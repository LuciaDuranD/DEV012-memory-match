import {
  duplicarCartas,
  barajearCartas,
  renderizarCartas,
} from "./components/App.js";

import pokemon from "./data/pokemon/pokemon.js";

const juegoContenedor = document.getElementById("root");

const iniciarJuego = () => {
  document.querySelectorAll(".carta-imagen").forEach((imagen) => {
    imagen.style.display = "none";
  });

  const cartasDuplicadas = duplicarCartas(pokemon.items);
  const cartasBarajadas = barajearCartas(cartasDuplicadas);

  renderizarCartas(cartasBarajadas, juegoContenedor);

  ocultarCartasDespuesDeTiempo();
};

window.addEventListener("load", iniciarJuego);

const ocultarCartasDespuesDeTiempo = () => {
  setTimeout(() => {
    document.querySelectorAll(".carta-imagen").forEach((imagen) => {
      imagen.style.display = "none";
    });
  }, 2000);
};

const botonRepetir = document.getElementById("repetirJuego");

botonRepetir.addEventListener("click", () => {
  iniciarJuego();
});
