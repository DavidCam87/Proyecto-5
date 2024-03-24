export function snake(pf) {
  const body = document.querySelector("body");
  body.style.backgroundImage = "url('/assets/backSnake.jpg')";
  const main = document.querySelector('main');
  main.innerHTML = `
  <h1>Snake</h1>
  <div class="btnStart">
    <button class="snakebtn">Iniciar</button>
  </div>
  <div class="scoreDisplay"></div>
  <div class="table"></div>
  <div class="button">
    <button class="top">▲</button>
    <button class="right">▶</button>
    <button class="bottom">▼</button>
    <button class="left">◀</button>
  </div>
  <div class="newGame">
  <button class="playAgain">Otra Vez¡¡</button>
  </div>
  <button id="back">Volver</button>`;

  const table = document.querySelector(".table");
  const btnStart = document.querySelector(".btnStart");
  const newGame = document.querySelector(".newGame");
  const playAgain = document.querySelector(".playAgain");
  const scoreDisplay = document.querySelector(".scoreDisplay");
  scoreDisplay.style.display = "none";

  const left = document.querySelector(".left");
  const bottom = document.querySelector(".bottom");
  const right = document.querySelector(".right");
  const up = document.querySelector(".top");
  const newStart = document.querySelector(".snakebtn");

  const width = 10;
  let currentIndex = 0;
  let appleI = 0;
  let Snake = [2, 1, 0];
  let direction = 1;
  let score = 0;
  let speed = 1;
  let timeInterval = 0;
  let interval = 0;

  createTable();
  newStart.addEventListener("click", () => {
    btnStart.style.display = "none";
    startGame();
  });
  document.addEventListener("keyup", control);
  playAgain.addEventListener("click", replay);
  function createTable() {              //creamos el tablero y le añadimos todos los cuadros 
    newGame.style.display = "none";
    for (let i = 0; i < 100; i++) {
      const div = document.createElement("div");
      table.appendChild(div);
    };
  };
  function randomApple(squares) {   //colocamos lamanzana al azar en el tablero
    do {
      appleI = Math.floor(Math.random() * squares.length);
    } while (squares[appleI].classList.contains("snake"));
    squares[appleI].classList.add("apple");
  };
  function checkMove() {               //controlamos el movimiento de la serpiente para lanzar un mensaje de colision 
    const squares = document.querySelectorAll(".table div");
    if (checkForHits(squares)) {
      alert("Has chocado con la pared");
      newGame.style.display = "flex";
      return clearInterval(interval);
    } else if (squares[Snake[0] + direction].classList.contains("snake")) {
      alert("Has chocado con la serpiente");
      newGame.style.display = "flex";
      return clearInterval(interval);
    }
    else {
      moveSnake(squares);
    };
  };
  function startGame() {                                // inicializamos el juego con los valores deseados
    const squares = document.querySelectorAll(".table div");
    randomApple(squares);
    direction = 1;
    scoreDisplay.style.display = "block";
    scoreDisplay.innerHTML = `Puntiacion: ${score}`;
    timeInterval = 300;
    Snake = [2, 1, 0];
    currentIndex = 0;
    for (const index of Snake) {
      squares[index].classList.add("snake");
    };
    interval = setInterval(checkMove, timeInterval);
  };
  function checkForHits(squares) {                               // controlamos el movimiento de la serpiente para ayudar a 
    if (                                                         // la funcion checkMove a lanzar un mensaje de colision
      (Snake[0] + width >= (width * width) && direction === width) ||
      (Snake[0] % width === width - 1 && direction === 1) ||
      (Snake[0] % width === 0 && direction === -1) ||
      (Snake[0] - width <= 0 && direction === -width)
    ) {
      return true;
    } else {
      return false;
    };
  };
  function eatApple(squares, tail) {   //comprobamos si la serpiente come la manzana para aumentar la serpiente y reubicar la manzana
    if (squares[Snake[0]].classList.contains("apple")) {
      squares[Snake[0]].classList.remove("apple");
      squares[Snake[Snake.length - 1]].style.backgroundColor = "";
      squares[tail].style.backgroundColor = '#00740c';
      squares[tail].classList.add("snake");
      Snake.push(tail);
      randomApple(squares);
      score++;
      scoreDisplay.textContent = `Puntiacion: ${score}`;
      clearInterval(interval);
      timeInterval = timeInterval * speed;
      interval = setInterval(checkMove, timeInterval);
    };
  };
  function moveSnake(squares) {  //movemos la serpiente y actualizamos su posicion en el tablero
    const tail = Snake.pop();
    let posicion = 0;
    squares[tail].classList.remove("snake");
    if (Snake.length > 1) {
      squares[tail].style.backgroundColor = "";// Restablecer el color anterior
      squares[Snake[0]].style.backgroundColor = "";
      squares[Snake[0]].innerHTML = "";
    };
    // Aplicar imagen y color verde solo a la nueva cabeza y cola de la serpiente
    Snake.unshift(Snake[0] + direction);
    squares[Snake[Snake.length - 1]].style.backgroundColor = '#00740c';
    squares[Snake[0]].classList.add("snake");
    squares[Snake[0]].innerHTML = `<img src="assets/cabeza.svg" class="cabeza" alt="cabeza">`;
    // El movimiento termina aquí
    eatApple(squares, tail);
  };
  function control(e) {        //controlamos el movimiento de la serpiente
    //movimientos en teclado
    if (e.keyCode === 39) {
      direction = 1; // right 
    } else if (e.keyCode === 38) {
      direction = -width //if we press the up arrow, the snake will go ten divs up
    } else if (e.keyCode === 37) {
      direction = -1 // left, the snake will go left one div
    } else if (e.keyCode === 40) {
      direction = +width // down the snake head will instantly appear 10 divs below from the current div 
    };
    //movimientos en movil
  };
  up.addEventListener("click", () => direction = -width);
  bottom.addEventListener("click", () => direction = +width);
  left.addEventListener("click", () => direction = -1);
  right.addEventListener("click", () => direction = 1);
  function replay() {                   // reiniciamos el juego
    table.innerHTML = "";
    createTable();
    startGame();
    newGame.style.display = "none";
  };
  const restart = () => {
    table.innerHTML = "";
    createTable();
    btnStart.style.display = "none";
    newGame.style.display = "flex";
    return clearInterval(interval);
  };
  document.getElementById("back").addEventListener("click", () => {
    const body = document.querySelector("body");
    body.style.backgroundImage = "url('/assets/back.png')";
    restart();
    pf();
  });
};