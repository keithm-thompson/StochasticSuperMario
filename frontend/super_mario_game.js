import Background from './background';
import TextCanvas from './text_canvas';
import CharactersStage from './characters_stage';
import ObjectsStage from './objects_stage';
import { recordHighscore }from '../util/util';


function startGame() {
  const backgroundCanvas = document.getElementById("background-canvas");
  let textCanvas = document.getElementById("text-canvas");
  const charactersCanvas = document.getElementById("characters-canvas");
  const objectsCanvas = document.getElementById("objects-canvas");

  initializeCanvasObjects(backgroundCanvas, textCanvas, charactersCanvas, objectsCanvas);

  const backgroundCtx = backgroundCanvas.getContext("2d");
  const charactersCtx = charactersCanvas.getContext("2d");
  const objectsCtx = objectsCanvas.getContext("2d");
  textCanvas = new TextCanvas(textCanvas);

  let objectsStage = new createjs.Stage("objects-canvas");
  objectsStage = new ObjectsStage(objectsStage);

  let charactersStage = new createjs.Stage("characters-canvas");
  charactersStage = new CharactersStage(charactersStage, objectsStage, textCanvas);

  let background = new Background(backgroundCtx);

  window.tickDelay = -1;
}

export function menu(){
  const menuEl = document.getElementById("menu");
  const startButton = document.getElementById("start-game");
  startButton.addEventListener("click", () => {
    menuEl.className = "hidden";
    startGame();
  });
}

export function gameEnded(score) {
  const backgroundCanvas = document.getElementById("background-canvas");
  let textCanvas = document.getElementById("text-canvas");
  const charactersCanvas = document.getElementById("characters-canvas");
  const objectsCanvas = document.getElementById("objects-canvas");

  hideCanvasObjects(backgroundCanvas, textCanvas, charactersCanvas, objectsCanvas);

  const high_scores = document.getElementById("high-scores");
  const highScoreDiv = document.getElementById("high-score");
  const inputInitials = document.getElementById("input-initials");
  const submitScore = document.getElementById("submit-score");

  submitScore.addEventListener("click", handleSubmit(score));
  inputInitials.addEventListener("submit", handleSubmit(score));

  if (high_scores.dataset.length < 10) {
    highScoreDiv.className = "menu";
  } else if (score > parseInt(high_scores.lastChild.previousSibling.innerHTML.split(':')[1])) {
    highScoreDiv.className = "menu";
  }
}

function initializeCanvasObjects(...canvasObjects) {
  for(let i = 0; i < canvasObjects.length; i++) {
    canvasObjects[i].className = "";
    canvasObjects[i].width = Background.WIDTH;
    canvasObjects[i].width = Background.HEIGHT;
  }
}

function hideCanvasObjects(...canvasObjects) {
  for(let i = 0; i < canvasObjects.length; i++){
    canvasObjects[i].className = "hidden";
  }
}

function handleSubmit(score) {
  return (e) => {
    const success = () => {
      location.reload();
    };
    const error = () => alert("an error has occurred");

    e.preventDefault();
    if (document.getElementById("input-initials").value.length > 0) {
      recordHighscore(document.getElementById("input-initials").value, score, success, error);
    }
  };
}
