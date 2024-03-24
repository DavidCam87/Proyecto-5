export function tresEnRaya(pf) {
  const body = document.querySelector("body");
  body.style.backgroundImage = "url('/assets/back.png')";
  const main = document.querySelector("main");
  let o_win = localStorage.getItem("owin") || 0;
  let x_win = localStorage.getItem("xwin") || 0;


  main.innerHTML = `
      <div id="tresEnRaya">
        <div class="span3 new_span">
          <div class="row">
            <h1 class="span3">3 en Raya</h1>
            <div class="span3">
              <div class="input-prepend input-append">
                <span class="add-on win_text">O Victorias: </span><strong id="o_win"
                  class="win_times add-on">${o_win || 0}</strong><span class="add-on"> Vez(es)</span>
              </div>
              <div class="input-prepend input-append">
                <span class="add-on win_text">X Victorias: </span><strong id="x_win"
                  class="win_times add-on">${x_win || 0}</strong><span class="add-on"> Vez(es)</span>
              </div>
            </div>
          </div>
          <ul class="row" id="game">
            <li id="one" class="btn span1">+</li>
            <li id="two" class="btn span1">+</li>
            <li id="three" class="btn span1">+</li>
            <li id="four" class="btn span1">+</li>
            <li id="five" class="btn span1">+</li>
            <li id="six" class="btn span1">+</li>
            <li id="seven" class="btn span1">+</li>
            <li id="eight" class="btn span1">+</li>
            <li id="nine" class="btn span1">+</li>
          </ul>
          <div class="row clr">
            <a href="#" id="reset" class="btn-success btn span3">Restart</a>
          </div>
        </div>
      </div>
      <button id="back">Volver</button>`;
  let x = "x";
  let o = "o";
  let count = 0;
  const gameListItems = document.querySelectorAll("#game li");

  const restartGame = () => {          // Función para resetear el juego y eliminar las clases de los botones
    for (const li of gameListItems) {
      li.textContent = "+";
      li.classList.remove("disable", "o", "x", "btn-primary", "btn-info");
    };
    count = 0;
    o_win = localStorage.getItem("owin") || 0;
    x_win = localStorage.getItem("xwin") || 0;
    document.getElementById("o_win").textContent = "0";
    document.getElementById("x_win").textContent = "0";
  };

  const resetGame = () => {          // Función para resetear el juego y eliminar las clases de los botones
    for (const li of gameListItems) {
      li.textContent = "+";
      li.classList.remove("disable", "o", "x", "btn-primary", "btn-info");
    };
    count = 0;
  };
  const checkWinner = (player) => {          // Función para comprobar si hay un ganador en la partida actual
    if (
      (document.getElementById("one").classList.contains(player) &&
        document.getElementById("two").classList.contains(player) &&
        document.getElementById("three").classList.contains(player)) ||
      (document.getElementById("four").classList.contains(player) &&
        document.getElementById("five").classList.contains(player) &&
        document.getElementById("six").classList.contains(player)) ||
      (document.getElementById("seven").classList.contains(player) &&
        document.getElementById("eight").classList.contains(player) &&
        document.getElementById("nine").classList.contains(player)) ||
      (document.getElementById("one").classList.contains(player) &&
        document.getElementById("four").classList.contains(player) &&
        document.getElementById("seven").classList.contains(player)) ||
      (document.getElementById("two").classList.contains(player) &&
        document.getElementById("five").classList.contains(player) &&
        document.getElementById("eight").classList.contains(player)) ||
      (document.getElementById("three").classList.contains(player) &&
        document.getElementById("six").classList.contains(player) &&
        document.getElementById("nine").classList.contains(player)) ||
      (document.getElementById("one").classList.contains(player) &&
        document.getElementById("five").classList.contains(player) &&
        document.getElementById("nine").classList.contains(player)) ||
      (document.getElementById("three").classList.contains(player) &&
        document.getElementById("five").classList.contains(player) &&
        document.getElementById("seven").classList.contains(player))
    ) {
      alert(`${player.toUpperCase()} ¡Has Ganado!.Comenzar nueva partida`);
      resetGame();
      if (player === "o") {
        o_win++;
        document.getElementById("o_win").textContent = o_win;
        saveLocalStorageo();
      } else {
        x_win++;
        document.getElementById("x_win").textContent = x_win;
        saveLocalStoragex();
      };
      return true;
    };
    return false;
  };
  const checkDraw = () => {                      // Función para comprobar si hay un empate 
    if (count == 9) {
      alert("¡Empate! ¿Vamos a por otra?");
      resetGame();
    };
  };
  for (const item of gameListItems) {                      // Código para darle funcionalidad a los botones del tablero
    item.addEventListener("click", function () {
      if (this.classList.contains("disable")) {
        alert("Ya Seleccionada");
        return;
      };
      if (count % 2 == 0) {
        count++;
        this.textContent = o;
        this.classList.add("disable", "o", "btn-primary");
        checkWinner("o");
      } else {
        count++;
        this.textContent = x;
        this.classList.add("disable", "x", "btn-info");
        checkWinner("x");
      };
      checkDraw();
    });
  };
  document.getElementById("reset").addEventListener("click", () => {
    restartGame();
    localStorage.clear();
  });
  document.getElementById("back").addEventListener("click", () => {
    pf();
  });

  const saveLocalStorageo = () => {
    localStorage.setItem("owin", o_win);
  };
  const saveLocalStoragex = () => {
    localStorage.setItem("xwin", x_win);
  };

};

