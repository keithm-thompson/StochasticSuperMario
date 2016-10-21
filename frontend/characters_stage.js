import Mario from './characters/mario';
import Goomba from './characters/goomba';
import Koopa from './characters/koopa';
import Bullet from './characters/bullet';
import PiranhaPlant from './characters/piranha_plant';
import ObjectsStage from './objects_stage';

class CharactersStage {
  constructor(stage, objectsStage) {
    this.stage = stage;
    this.goomba = new Goomba(stage, objectsStage);
    this.koopa = new Koopa(stage, objectsStage);
    this.bullet = new Bullet(stage, objectsStage);
    this.piranhaPlant = new PiranhaPlant(stage, objectsStage);
    this.mario = new Mario(stage, objectsStage);
  }

}
export default CharactersStage;
