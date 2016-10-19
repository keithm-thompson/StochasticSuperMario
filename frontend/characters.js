import Mario from './mario';

class Characters {
  constructor(ctx) {
    this.ctx = ctx;
    this.mario = new Mario(ctx);
    // this.mario.renderStanding();
    let i = 0;
    // while(i < 100) {
      this.mario.renderMovingRightOne();
      setTimeout(1000, () => {
        this.mario.renderMovingRightTwo();
      });
      // i++;
    // }
  }

}
export default Characters;
