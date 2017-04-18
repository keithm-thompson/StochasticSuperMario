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
        this.updateIntervalTrees(0);
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
    this.addBulletToScreen();
  }

  handleMovingThroughLevel(horVel) {
    if (this.active) {
      this.updateIntervalTrees(horVel);
      this.isMarioMoving = true;
    }
  }

  addBulletToScreen() {
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

  updateIntervalTrees(horVel) {
    let sign, orientationForward, orientationBackward;
    if (this.bullet.scaleX === 1) {
      sign = 1;
      orientationForward = 0;
      orientationBackward = this.bullet.width;
    } else {
      sign = -1;
      orientationForward = this.bullet.width;
      orientationBackward = 0;
    }

    this.intervalTreeX.removeInterval(this.bullet.x - orientationForward, this.bullet.x + orientationBackward, "bullet", this.id);
    this.intervalTreeY.removeInterval(this.bullet.y, this.bullet.y + this.bullet.height, "bullet", this.id);
    this.bullet.x -= horVel + (sign * 5);
    this.intervalTreeX.insertInterval(this.bullet.x - orientationForward, this.bullet.x + orientationBackward, "bullet", this.id);
    this.intervalTreeY.insertInterval(this.bullet.y, this.bullet.y + this.bullet.height, "bullet", this.id);
  }
}
export default Bullet;
