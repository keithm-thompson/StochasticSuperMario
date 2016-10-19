import GameView from './game_view';

document.addEventListener("DOMContentLoaded", function(){
  const backgroundCanvas = document.getElementById("background-canvas");
  const objectsCanvas = document.getElementById("objects-canvas");
  const charactersCanvas = document.getElementById("characters-canvas");

  backgroundCanvas.width = 800;
  objectsCanvas.width = 800;
  charactersCanvas.width = 800;

  backgroundCanvas.height = 600;
  objectsCanvas.height = 600;
  charactersCanvas.height = 600;

  const backgroundCtx = backgroundCanvas.getContext("2d");
  const objectsCtx = objectsCanvas.getContext("2d");
  const charactersCtx = charactersCanvas.getContext("2d");

  // backgroundCtx.fillStyle = "lightblue";
  // backgroundCtx.fillRect(10, 10, 800, 600);
  // const game = new Game();

});
