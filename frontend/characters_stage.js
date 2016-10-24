import Mario from './characters/mario';
import Goomba from './characters/goomba';
import Koopa from './characters/koopa';
import Bullet from './characters/bullet';
import PiranhaPlant from './characters/piranha_plant';
import ObjectsStage from './objects_stage';

class CharactersStage {
  constructor(stage, objectsStage) {
    this.stage = stage;
    this.characters = {};
    this.characters[1] = new Goomba(stage, objectsStage, 1);
    this.characters[2] = new Koopa(stage, objectsStage, 2);
    this.characters[3] = new Bullet(stage, objectsStage, 3);
    this.characters[4] = new PiranhaPlant(objectsStage, objectsStage, 4);
    this.mario = new Mario(stage, objectsStage, this);
    this.handleCharacterCollision = this.handleCharacterCollision.bind(this);
  }
  handleMovingThroughLevel(horVel) {
    Object.keys(this.characters).forEach((character) => {
      this.characters[character].handleMovingThroughLevel(horVel);
    });
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

}
export default CharactersStage;
