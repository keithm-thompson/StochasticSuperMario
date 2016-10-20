import Background from './background';
import CharactersStage from './characters_stage';
import ObjectsStage from './objects_stage';

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

  let objectsStage = new createjs.Stage("objects-canvas");
  objectsStage = new ObjectsStage(objectsStage);

  const background = new Background(backgroundCtx);

  let charactersStage = new createjs.Stage("characters-canvas");
  charactersStage = new CharactersStage(charactersStage);
});
