import GameView from './game_view';
import Background from './background';

document.addEventListener("DOMContentLoaded", function(){
  const backgroundCanvas = document.getElementById("background-canvas");
  const objectsCanvas = document.getElementById("objects-canvas");
  const charactersCanvas = document.getElementById("characters-canvas");

  backgroundCanvas.width = Background.WIDTH;
  objectsCanvas.width = Background.WIDTH;
  charactersCanvas.width = Background.WIDTH;

  backgroundCanvas.height = Background.HEIGHT;
  objectsCanvas.height = Background.HEIGHT;
  charactersCanvas.height = Background.HEIGHT;

  const backgroundCtx = backgroundCanvas.getContext("2d");
  const objectsCtx = objectsCanvas.getContext("2d");
  const charactersCtx = charactersCanvas.getContext("2d");

  // const game = new Game();
  const background = new Background(backgroundCtx);
  // background.render();
});
