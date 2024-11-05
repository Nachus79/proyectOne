const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const game = new Game(ctx);

const buttonStart = document.getElementById("start");

const buttonRestart = document.getElementById("restart")

buttonStart.addEventListener("click", () => {

  if (game.started === false) {
    game.start();
   } 
   else {
     game.pause();
   }
  
});

//DESPLEGABLE CON LA INFORMACIÓN DE LAS TECLAS: 

const howToPlay = document.getElementById("how");
const keysMenu = document.getElementById("keys");


howToPlay.addEventListener("click", () => {
  keysMenu.style.display = 
  keysMenu.style.display === "block" ? "none" : "block";
});


window.addEventListener("click", (event) => {
  if (event.target !== howToPlay && !keysMenu.contains(event.target)) {
    keysMenu.style.display = "none";
  }
});


