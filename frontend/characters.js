import Mario from './mario';
import Goomba from './goomba';
import Koopa from './koopa';
import Bullet from './bullet';
import PiranhaPlant from './piranha_plant';

class Characters {
  constructor(stage) {
    this.stage = stage;
    this.mario = new Mario(stage);
    this.goomba = new Goomba(stage);
    this.koopa = new Koopa(stage);
    this.bullet = new Bullet(stage);
    this.piranhaPlant = new PiranhaPlant(stage);
  }

}
export default Characters;
