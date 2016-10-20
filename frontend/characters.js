import Mario from './mario';
import Goomba from './goomba';

class Characters {
  constructor(stage) {
    this.stage = stage;
    this.mario = new Mario(stage);
    this.goomba = new Goomba(stage);
  }

}
export default Characters;
