export function memoryGame(pf) {
  const body = document.querySelector("body");
  body.style.backgroundImage = "url('/assets/back.png')";
  const arrayCartas = [
    {
      id: 1,
      color: "red",
      imagen: "https://i.pinimg.com/564x/37/8c/d1/378cd197abe24cb7bc051e7c9bfdf78b.jpg"
    },
    {
      id: 2,
      color: "pink",
      imagen: "https://i.pinimg.com/564x/37/8c/d1/378cd197abe24cb7bc051e7c9bfdf78b.jpg"
    },
    {
      id: 3,
      color: "orange",
      imagen: "https://i.pinimg.com/736x/bc/6e/c2/bc6ec226a3cddda674e122b550b289d7.jpg"
    },
    {
      id: 4,
      color: "blue",
      imagen: "https://i.pinimg.com/736x/bc/6e/c2/bc6ec226a3cddda674e122b550b289d7.jpg"
    },
    {
      id: 5,
      color: "black",
      imagen: "https://i.pinimg.com/736x/fb/d3/e8/fbd3e89a1422cd87986c0ca8193f474c.jpg"
    },
    {
      id: 6,
      color: "green",
      imagen: "https://i.pinimg.com/736x/fb/d3/e8/fbd3e89a1422cd87986c0ca8193f474c.jpg"
    },
    {
      id: 7,
      color: "yellow",
      imagen: "https://i.pinimg.com/736x/d8/f7/d8/d8f7d8040de7f979609923fee535c359.jpg"
    },
    {
      id: 8,
      color: "turquoise",
      imagen: "https://i.pinimg.com/736x/d8/f7/d8/d8f7d8040de7f979609923fee535c359.jpg"
    },
    {
      id: 9,
      color: "red",
      imagen: "https://i.pinimg.com/736x/1a/91/2e/1a912ee6496adf72a468cad7a903d39d.jpg"
    },
    {
      id: 10,
      color: "pink",
      imagen: "https://i.pinimg.com/736x/1a/91/2e/1a912ee6496adf72a468cad7a903d39d.jpg"
    },
    {
      id: 11,
      color: "orange",
      imagen: "https://i.pinimg.com/736x/7e/3a/5a/7e3a5af6baa666820b7f32f04227cfa1.jpg"
    },
    {
      id: 12,
      color: "blue",
      imagen: "https://i.pinimg.com/736x/7e/3a/5a/7e3a5af6baa666820b7f32f04227cfa1.jpg"
    },
    {
      id: 13,
      color: "black",
      imagen: "https://i.pinimg.com/736x/2c/1b/c9/2c1bc9d4d6815fa25ace493e807c9849.jpg"
    },
    {
      id: 14,
      color: "green",
      imagen: "https://i.pinimg.com/736x/2c/1b/c9/2c1bc9d4d6815fa25ace493e807c9849.jpg"
    },
    {
      id: 15,
      color: "yellow",
      imagen: "https://i.pinimg.com/736x/1b/bb/65/1bbb65048971002f81257cd20de9c70b.jpg"
    },
    {
      id: 16,
      color: "turquoise",
      imagen: "https://i.pinimg.com/736x/1b/bb/65/1bbb65048971002f81257cd20de9c70b.jpg"
    },
    {
      id: 17,
      color: "brown",
      imagen: "https://i.pinimg.com/736x/da/21/12/da21120ad8a8718924bee8986239da5d.jpg"
    },
    {
      id: 18,
      color: "gold",
      imagen: "https://i.pinimg.com/736x/da/21/12/da21120ad8a8718924bee8986239da5d.jpg"
    },

  ];                                                   //1.1 saber cuando se seleciona una carta
  let numCartas = 0;
  let carta1;
  let carta2;
  let puntuacion = JSON.parse(localStorage.getItem("puntos")) || 0;
  arrayCartas.sort(() => Math.random() - Math.random());

  const main = document.querySelector('main');
  main.innerHTML = `
  <div id="app"></div>`;

  const divApp = document.querySelector('#app');                 //crear h3
  const puntuacionHTML = document.createElement("h3");           //agregarte texto
  puntuacionHTML.textContent = `Puntuacion: ${puntuacion}`;
  main.appendChild(puntuacionHTML);                           //insertarlo dentro del body antes del divApp
  main.appendChild(divApp);

  const resetValores = () => {                 // se resetean todos los valores necesarios
    numCartas = 0;
    carta1 = undefined;
    carta2 = undefined;
  }
  const setImageBackground = (cartaGenerica) => {  //asignamos la imagen de fondo
    cartaGenerica.nodoHTML.style.backgroundImage = 'url(https://img2.rtve.es/i/?w=1600&i=1657019154219.jpg)';
    cartaGenerica.nodoHTML.style.backgroundSize = 'revert-layer';
  }
  const checkCart = () => {                 //se verifica si las cartas son iguales
    console.log(carta1);
    if (carta1.datosCarta.imagen == carta2.datosCarta.imagen) {
      puntuacion++;
      puntuacionHTML.textContent = `Puntuacion: ${puntuacion}`;
      saveLocalStorage();
      console.log(carta1);
      carta1.nodoHTML.classList.add("seleccionada");
      carta2.nodoHTML.classList.add("seleccionada");
      resetValores();
    } else {
      setTimeout(() => {
        setImageBackground(carta1);
        setImageBackground(carta2);
        resetValores();
      }, 1000);
    }
    if (puntuacion == 9) {
      setTimeout(() => {
        alert("Ganaste");
      }, 250);
    };
  };
  const manageSelectionCart = (divCartaNodoHTML, datosDeCadaCarta) => { //saber cuando se selecciona una carta
    if (divCartaNodoHTML.classList.contains('seleccionada')) return;
    if (numCartas < 2) {
      //se selecciona una carta solo si el contador es menos que 2
      //y se le deja ver su color y se qyuta el backgroundImage. 
      numCartas++;
      /* divCartaNodoHTML.style.backgroundColor = datosDeCadaCarta.color; */
      divCartaNodoHTML.style.backgroundImage = `url('${datosDeCadaCarta.imagen}')`;
      divCartaNodoHTML.style.backgroundSize = `cover`;
    }
    //se selecciona la 1º carta
    if (numCartas == 1) {
      carta1 = {
        nodoHTML: divCartaNodoHTML,
        datosCarta: datosDeCadaCarta
      };
    }
    //se selecciona la 2ª carta
    if (numCartas == 2) {
      carta2 = {
        nodoHTML: divCartaNodoHTML,
        datosCarta: datosDeCadaCarta
      };
      checkCart();
    }
  };
  for (const datosDeCadaCarta of arrayCartas) {
    const divCartaNodoHTML = document.createElement('div');
    divCartaNodoHTML.classList.add('carta');
    divCartaNodoHTML.addEventListener('click', () => {
      manageSelectionCart(divCartaNodoHTML, datosDeCadaCarta)
    });
    divApp.appendChild(divCartaNodoHTML);
  };
  const divButton = document.createElement('div');
  const button = document.createElement('button');
  divButton.className = 'divButton';
  button.textContent = 'RESET';
  button.className = "boton";
  main.appendChild(divButton);
  divButton.appendChild(button);
  const back = document.createElement('button');
  button.addEventListener('click', () => {
    for (const elemento of document.querySelectorAll(".seleccionada")) {
      elemento.classList.remove("seleccionada");
    };
    const cartas = document.querySelectorAll('.carta');
    for (const carta of cartas) {
      setImageBackground({ nodoHTML: carta });
    };
    arrayCartas.sort(() => Math.random() - Math.random());
    puntuacion = 0;
    localStorage.clear()
    puntuacionHTML.textContent = `Puntuacion: ${puntuacion}`;
    resetValores();
  });
  back.textContent = "Volver";
  back.id = "back";
  main.appendChild(back);
  document.getElementById("back").addEventListener("click", () => {
    localStorage.clear()
    pf();
  });
  const saveLocalStorage = () => {
    localStorage.setItem("puntos", JSON.stringify(puntuacion));
  };
};
