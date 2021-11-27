// Esta función inicializa el juego
expor const inicializarJuego = ( numJugadores = 2 ) => {
    deck = crearDeck();

    puntosJugadores = [];
    for( let i = 0; i< numJugadores; i++ ) {
        puntosJugadores.push(0);
    }

    puntosHTML.forEach( elem => elem.innerText = 0 );
    divCartasJugadores.forEach( elem => elem.innerHTML = '' );

    btnPedir.disabled   = false;
    btnDetener.disabled = false;

}
