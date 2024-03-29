const miModulo = (() => {
  "use strict";

  let deck = [];

  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  // Referencias del HTML
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo");

  const divCartasJugadores = document.querySelectorAll(".divCartas"),
    puntosHTML = document.querySelectorAll("small");

  // Esta función inicializa el juego
  const inicializarJuego = (numJugadores = 2) => {

    deck = crearDeck();

    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHTML.forEach((elem) => (elem.innerText = 0));
    divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  // Esta función crea un nuevo deck
  const crearDeck = () => {

    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }

    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }

    return _.shuffle(deck);
  };

  // Esta función me permite tomar una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw new Error("No hay cartas en el deck");
    }
    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  // Turno: 0 = primer jugador y el último será la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };
  

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`; //3H, JD
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  };

  const estiloDisableBoton = () => {
    btnPedir.classList.replace("btn-start-game", "btn-game-off");
    btnDetener.classList.replace("btn-stop-game", "btn-game-off");
  };

  const estiloEnableBoton = () => {
    btnPedir.classList.replace("btn-game-off", "btn-start-game");
    btnDetener.classList.replace("btn-game-off", "btn-stop-game");
  };

  const winComputer = (msg) => {
    let container = document.querySelector("#computadora-cartas");
    let el = document.createElement("span");
    el.classList.add("winComputer");
    el.textContent = `${msg}`;
    container.append(el);
  };
  const winPlayer1 = (msg) => {
    const container = document.querySelector("#jugador-cartas");
    const ele = document.createElement("span");
    ele.textContent = `${msg}`;
    ele.classList.add("winPlayer1");
    container.append(ele);
  };

  const NadieGana = (msg) => {
    let container = document.querySelector("#jugador-cartas");
    let ele2 = document.createElement("span");
    ele2.classList.add("nadieGana");
    ele2.textContent = `${msg}`;
    container.append(ele2);
  };

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        NadieGana("");
        estiloDisableBoton();
      } else if (puntosMinimos > 21) {
        estiloDisableBoton();
        winComputer("");
        // alert("Computadora gana");
      } else if (puntosComputadora > 21) {
        estiloDisableBoton();
        // alert("Jugador Gana");
        winPlayer1('');
      } else {
        estiloDisableBoton();
        // alert("Computadora Gana");
        winComputer("");
      }
    }, 100);
  };

  // turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;

    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
  };

  // Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
      estiloEnableBoton();
    } else if (puntosJugador === 21) {
      console.warn("21, genial!");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
      estiloEnableBoton();
    }
  });

  btnDetener.addEventListener("click", () => {
    estiloDisableBoton();

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
    estiloEnableBoton();
  });

  // return {
  //     nuevoJuego: inicializarJuego
  // };
})();
