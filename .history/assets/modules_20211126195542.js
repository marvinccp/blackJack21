const btnPedir = document.querySelector("#btnPedir"),
      btnDetener = document.querySelector("#btnDetener"),
      btnNuevo = document.querySelector("#btnNuevo");

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  const puntosJugador = acumularPuntos(carta, 0);

  crearCarta(carta, 0);

  if (puntosJugador > 21) {
    console.warn("Lo siento mucho, perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, genial!");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;

  turnoComputadora(puntosJugadores[0]);
});

btnNuevo.addEventListener("click", () => {
  inicializarJuego();
});

// return {
//     nuevoJuego: inicializarJuego
// };

const inicializarJuego = (numJugadores = 2) => {
//     deck = crearDeck();

//     puntosJugadores = [];
//     for (let i = 0; i < numJugadores; i++) {
//       puntosJugadores.push(0);
//     }

//     puntosHTML.forEach((elem) => (elem.innerText = 0));
//     divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));

//     btnPedir.disabled = false;
//     btnDetener.disabled = false;
//   };

export { btnDetener, btnNuevo, btnPedir, inicializarJuego };
