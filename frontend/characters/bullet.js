import Character from './character';

class Bullet extends Character {
  constructor(stage, objectsStage, id, x, y, scaleX){
    super(objectsStage);
    this.stage = stage;
    this.id = id;
    this.pos = [x, y];
    this.horVel = 0;
    this.verVel = 0;
    this.imageLoaded  = this.imageLoaded.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.scaleX = scaleX;
    this.loadImage();
    createjs.Ticker.addEventListener("tick", this.handleTick);
    this.shouldDecelerate = true;
    this.tick = Date.now();
  }

  loadImage() {
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.imageLoaded);
    const manifest = [
      {src: "NES-SuperMarioBros-Enemies.png", id: "bullet"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  handleTick(){
    if( Date.now() - this.tick > window.tickDelay ) {
      if (this.active && !this.isMarioMoving) {
        if (this.bullet.scaleX === 1) {
          this.intervalTreeX.removeInterval(this.bullet.x, this.bullet.x + this.bullet.width, "bullet", this.id);
          this.intervalTreeY.removeInterval(this.bullet.y, this.bullet.y + this.bullet.height, "bullet", this.id);
          this.bullet.x -= 5;
          this.intervalTreeX.insertInterval(this.bullet.x, this.bullet.x + this.bullet.width, "bullet", this.id);
          this.intervalTreeY.insertInterval(this.bullet.y, this.bullet.y + this.bullet.height, "bullet", this.id);
        } else {
          this.intervalTreeX.removeInterval(this.bullet.x - this.bullet.width, this.bullet.x, "bullet", this.id);
          this.intervalTreeY.removeInterval(this.bullet.y, this.bullet.y + this.bullet.height, "bullet", this.id);
          this.bullet.x += 5;
          this.intervalTreeX.insertInterval(this.bullet.x - this.bullet.width, this.bullet.x, "bullet", this.id);
          this.intervalTreeY.insertInterval(this.bullet.y, this.bullet.y + this.bullet.height, "bullet", this.id);
        }
      } else {
        this.isMarioMoving = false;
      }
      this.tick = Date.now();
    }
  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("bullet")],
      frames: [
        [798, 25, 23, 20]
      ],
      animations: {
        stand: 0,
        move: [0,1, "move", .05],
        squashed: 2
      }
    };
    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.bullet =  new createjs.Sprite(spriteSheet);
    this.bullet.y = this.pos[1] - 100;
    this.bullet.x = this.pos[0];
    this.bullet.width = 23;
    this.bullet.height = 20;
    this.bullet.scaleX = this.scaleX;
    this.active = true;
    createjs.Ticker.framerate = 25;

    this.stage.addChild(this.bullet);
    this.bullet.gotoAndPlay("stand");
  }

  handleMovingThroughLevel(horVel) {
    if (this.active) {
      this.intervalTreeX.removeInterval(this.bullet.x, this.bullet.x + this.bullet.width, "bullet", this.id);
      this.intervalTreeY.removeInterval(this.bullet.y, this.bullet.y + this.bullet.height, "bullet", this.id);
      if (this.bullet.scaleX == 1) {
        this.bullet.x -= horVel + 5;
      } else {
        this.bullet.x -= horVel - 5;
      }
      this.intervalTreeX.insertInterval(this.bullet.x, this.bullet.x + this.bullet.width, "bullet", this.id);
      this.intervalTreeY.insertInterval(this.bullet.y, this.bullet.y + this.bullet.height, "bullet", this.id);
      this.isMarioMoving = true;
    }
  }

}
export default Bullet;
