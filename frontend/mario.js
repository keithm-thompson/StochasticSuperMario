class Mario {
  constructor(ctx){
    this.ctx = ctx;
    this.pos = [20,370];
  }

  move(direction) {

  }

  renderStanding(){
    let mario = {};
    const marioImage = new Image();
    mario.width = 27;
    mario.height = 39;
    marioImage.onload = () => {
      this.movingRightImage(mario);
    };
    marioImage.src = "app/assets/images/NES-SuperMarioBros-Mario&Luigi.png";
    mario.image = marioImage;
  }

  renderMovingRightOne(){
    let mario = {};
    const marioImage = new Image();
    mario.width = 24;
    mario.height = 39;
    marioImage.onload = () => {
      this.movingRightImage(mario, 412, 0);
    };
    marioImage.src = "app/assets/images/NES-SuperMarioBros-Mario&Luigi.png";
    mario.image = marioImage;
  }

  renderMovingRightTwo(){
    let mario = {};
    const marioImage = new Image();
    mario.width = 24;
    mario.height = 39;
    marioImage.onload = () => {
      this.movingRightImage(mario, 436, 0);
    };
    marioImage.src = "app/assets/images/NES-SuperMarioBros-Mario&Luigi.png";
    mario.image = marioImage;
  }



  movingLeftImage(){}

  jumpingImage(){}

  standingImage(mario){
    this.ctx.drawImage(
      mario.image,
      0,
      0,
      mario.width,
      mario.height,
      this.pos[0],
      this.pos[1] - mario.height,
      mario.width,
      mario.height
    );
  }

  movingRightImage(mario, spriteWidth, spriteHeight){
    this.ctx.drawImage(
      mario.image,
      spriteWidth,
      spriteHeight,
      mario.width,
      mario.height,
      this.pos[0],
      this.pos[1] - mario.height,
      mario.width,
      mario.height
    );
    this.pos[0] += mario.width;
  }

  renderMovingLeft(){}

  renderJumping(){}


}
export default Mario;
