import Mario from './characters/mario';
import Goomba from './characters/goomba';
import Koopa from './characters/koopa';
import Bullet from './characters/bullet';
import PiranhaPlant from './characters/piranha_plant';
import ObjectsStage from './objects_stage';

class CharactersStage {
  constructor(stage, objectsStage) {
    this.stage = stage;
    this.mario = new Mario(stage, objectsStage);
    this.goomba = new Goomba(stage);
    this.koopa = new Koopa(stage);
    this.bullet = new Bullet(stage);
    this.piranhaPlant = new PiranhaPlant(stage);
  }

}
export default CharactersStage;
