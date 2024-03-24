import { tresEnRaya } from "./src/tresEnRaya/tr.js";
import { snake } from "./src/snakeGame/sg.js";
import { memoryGame } from "./src/juegoMemoria/jm.js";

const btnNav = document.querySelector('.btnNav');
const closeBtn = document.querySelector('.closeBtn');
const menu = document.querySelector('.menu');
const navL = document.querySelector('.nav-links');

btnNav.addEventListener('click', function () {
  menu.classList.toggle('active');
  navL.classList.toggle('acti');

});
closeBtn.addEventListener('click', function () {
  menu.classList.remove('active');
  navL.classList.remove('acti');
});
const principal = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <section id="hero">
    <article id="tresEnRaya">
      <h2>Tres En Raya</h2>
      <img src="/assets/tresEnRaya.jpg" class="tres"alt="tresEnRaya">
    </article>
    <article id="memory">
      <h2>Memory Game</h2>
      <img src="/assets/memoryGameDBZ.jpg" class="memory" alt="memory">
    </article>
    <article id="snake">
      <h2>Snake</h2>
      <img src="/assets/snakeGame.jpg" class="snakeImg" alt="snake">
    </article>
  </section>
  `;
  document.getElementById('tresEnRaya').addEventListener('click', () => {
    tresEnRaya(principal);
  });
  document.querySelector(".ter").addEventListener("click", () => {
    tresEnRaya(principal);
    menu.classList.remove('active');
    navL.classList.remove('acti');
  })
  document.getElementById('snake').addEventListener('click', () => {
    snake(principal);
  });
  document.querySelector('.snak').addEventListener('click', () => {
    snake(principal);
    menu.classList.remove('active');
    navL.classList.remove('acti');
  })
  document.getElementById('memory').addEventListener('click', () => {
    memoryGame(principal);
  });
  document.querySelector('.memg').addEventListener('click', () => {
    memoryGame(principal);
    menu.classList.remove('active');
    navL.classList.remove('acti');
  })
  document.querySelector(".logo").addEventListener("click", () => {
    const body = document.querySelector("body");
    body.style.backgroundImage = "url('/assets/back.png')";
    principal();
  })
};
principal();