import Mario from './characters/mario';
import Goomba from './characters/goomba';
import Koopa from './characters/koopa';
import Bullet from './characters/bullet';
import PiranhaPlant from './characters/piranha_plant';
import ObjectsStage from './objects_stage';

class CharactersStage {
  constructor(stage, objectsStage, textCanvas) {
    this.stage = stage;
    this.objectsStage = objectsStage;
    this.startPositions();
    this.mario = new Mario(stage, objectsStage, textCanvas, this);
    this.handleCharacterCollision = this.handleCharacterCollision.bind(this);
  }
  handleMovingThroughLevel(horVel) {
    Object.keys(this.characters).forEach((character) => {
      this.characters[character].handleMovingThroughLevel(horVel);
    });
  }

  handleLevelClear() {
    Object.keys(this.characters).forEach((character) => {
      if (typeof this.characters[character].handleLevelClear === "function" ) {
        this.characters[character].handleLevelClear();
      }
    });
  }
  addCharacters() {
    let randomNum = Math.random();
    let scaleX, x;

    if (randomNum < .2) {
      if (randomNum < .1) {
        scaleX = -1;
        x = -25;
      } else {
        scaleX = 1;
        x = 1130;
      }
      this.characters[this.currentId] = new Koopa(
        this.stage,
        this,
        this.currentId,
        1130,
        370,
        scaleX
        );
    } else if (randomNum < .45) {
      if (randomNum < .33) {
        scaleX = -1;
        x = -25;
      } else {
        scaleX = 1;
        x = 1130;
      }
        this.characters[this.currentId] = new Goomba(
          this.stage,
          this,
          this.currentId,
          1130,
          370,
          scaleX
          );
    } else if (randomNum < .5) {
      if (randomNum < .475) {
        scaleX = -1;
        x = -25;
      } else {
        scaleX = 1;
        x = 1130;
      }
      this.characters[this.currentId] = new Bullet(
        this.stage,
        this,
        this.currentId,
        x,
        Math.random() * (300 - 225) + 225,
        scaleX
      );
    }
    this.currentId++;
  }
  addPirahnaPlant() {
    this.characters[this.currentId] = new PiranhaPlant(
      this.objectsStage,
      this.objectsStage,
      this.currentId,
      1105,
      370
    );
    this.currentId++;
  }
  handleCharacterCollision(id, character){
    switch (character) {
      case "goomba":
        this.characters[id].handleCharacterCollision();
        break;
      case "koopa":
        this.characters[id].handleCharacterCollision();
        break;
      case "piranhaPlant":
        this.mario.handleCharacterCollision();
        break;
      case "bullet":
        this.mario.handleCharacterCollision();
        break;
      default:
        alert('error');
    }
  }
  startPositions() {
    this.characters = {};
    this.characters[1] = new Goomba(this.stage, this.objectsStage, 1, 350, 370, 1);
    this.characters[2] = new Koopa(this.stage, this.objectsStage, 2, 400, 370, -1);
    this.characters[3] = new Koopa(this.stage, this.objectsStage, 3, 200, 370, -1);
    this.characters[4] = new Koopa(this.stage, this.objectsStage, 4, 470, 370, 1);
    this.characters[5] = new Bullet(this.stage, this.objectsStage, 5, -25, 225, -1);
    this.characters[6] = new PiranhaPlant(this.objectsStage, this.objectsStage, 6, 236, 370);
    this.currentId = 7;
  }
}
export default CharactersStage;
