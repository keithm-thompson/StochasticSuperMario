import Background from './background';
import CharactersStage from './characters_stage';
import ObjectsStage from './objects_stage';

document.addEventListener("DOMContentLoaded", function(){
  const backgroundCanvas = document.getElementById("background-canvas");
  const charactersCanvas = document.getElementById("characters-canvas");
  const objectsCanvas = document.getElementById("objects-canvas");

  backgroundCanvas.width = Background.WIDTH;
  charactersCanvas.width = Background.WIDTH;
  objectsCanvas.width = Background.WIDTH;

  backgroundCanvas.height = Background.HEIGHT;
  charactersCanvas.height = Background.HEIGHT;
  objectsCanvas.height = Background.HEIGHT;

  const backgroundCtx = backgroundCanvas.getContext("2d");
  const charactersCtx = charactersCanvas.getContext("2d");
  const objectsCtx = objectsCanvas.getContext("2d");

  // let backgroundStage = new createjs.Stage("background-canvas");

  let objectsStage = new createjs.Stage("objects-canvas");
  objectsStage = new ObjectsStage(objectsStage);

  let charactersStage = new createjs.Stage("characters-canvas");
  charactersStage = new CharactersStage(charactersStage, objectsStage);

  let background = new Background(backgroundCtx);

  window.tickDelay = 2;
});
