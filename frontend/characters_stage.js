import Mario from './characters/mario';
import Goomba from './characters/goomba';
import Koopa from './characters/koopa';
import Bullet from './characters/bullet';
import PiranhaPlant from './characters/piranha_plant';
import ObjectsStage from './objects_stage';

class CharactersStage {
  constructor(stage, objectsStage) {
    this.stage = stage;
    this.goomba = new Goomba(stage, objectsStage, 1);
    this.koopa = new Koopa(stage, objectsStage, 2);
    this.bullet = new Bullet(stage, objectsStage, 3);
    this.piranhaPlant = new PiranhaPlant(stage, objectsStage, 4);
    this.mario = new Mario(stage, objectsStage, this);
    this.handleCharacterCollision = this.handleCharacterCollision.bind(this);
  }

  handleCharacterCollision(character){
    switch (character) {
      case "goomba":
        this.goomba.handleCharacterCollision();
        break;
      case "koopa":
        this.koopa.handleCharacterCollision();
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
