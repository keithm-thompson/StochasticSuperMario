import Mario from './mario';

class Characters {
  constructor(stage) {
    this.stage = stage;
    this.mario = new Mario(stage);
  }

}
export default Characters;
