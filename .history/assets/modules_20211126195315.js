


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

export { btnDetener, btnNuevo, btnPedir}