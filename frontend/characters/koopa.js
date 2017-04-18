import Character from './character';

class Koopa extends Character{
  constructor(stage, objectsStage, id, x, y, scaleX){
    super(objectsStage);
    this.stage = stage;
    this.id = id;
    this.pos = [x, y];
    this.horVel = 0;
    this.verVel = 0;
    this.scaleX = scaleX;
    this.imageLoaded  = this.imageLoaded.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.loadImage();
    createjs.Ticker.addEventListener("tick", this.handleTick);
    this.shouldDecelerate = true;
    this.tick = Date.now();
    this.shell = false;
  }

  loadImage() {
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.imageLoaded);
    const manifest = [
      {src: "NES-SuperMarioBros-Enemies.png", id: "koopa"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  handleLevelClear() {
    this.active = false;
    this.shell = false;
  }
  handleTick(){
    if (this.shell) {
      this.shellConstant = 6;
    }
    if(Date.now() - this.tick > window.tickDelay ) {
      if((this.active || this.shell) && !this.isMarioMoving) {
        this.detectObjectCollision();
        if (this.koopa.scaleX === 1) {
          this.moveLeft();
        } else {
          this.moveRight();
        }
      } else {
        this.isMarioMoving = false;
        this.horVel = null;
      }
      this.tick = Date.now();
    }
  }

  handleCharacterCollision() {
    this.active = false;
    this.shell = !this.shell;
    if(!this.shell) {
      if(this.koopa.scaleX === 1) {
        this.intervalTreeX.removeInterval(this.koopa.x - this.koopa.width, this.koopa.x, "koopa", this.id);
        this.intervalTreeY.removeInterval(this.koopa.y, this.koopa.y + this.koopa.height, "koopa", this.id);
      } else {
        this.intervalTreeX.removeInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id);
        this.intervalTreeY.removeInterval(this.koopa.y, this.koopa.y + this.koopa.height, "koopa", this.id);
      }
      this.stage.removeChild(this.koopa);
    }
    this.squashedAnimation();
  }

  squashedAnimation() {
    this.koopa.gotoAndStop("move");
    this.koopa.gotoAndPlay("squashed");
  }

  detectObjectCollision() {
    let objectCollisionX, objectCollisionY;
    if (this.koopa.scaleX === 1) {
      objectCollisionX = this.objectIntervalTreeX.query(this.koopa.x, this.koopa.x + this.koopa.width);
      objectCollisionY = this.objectIntervalTreeY.query(this.koopa.y, this.koopa.y + this.koopa.height);
    } else {
      objectCollisionX = this.objectIntervalTreeX.query(this.koopa.x - this.koopa.width, this.koopa.x);
      objectCollisionY = this.objectIntervalTreeY.query(this.koopa.y, this.koopa.y + this.koopa.height);
    }

    if(objectCollisionX && objectCollisionY) {
      Object.keys(objectCollisionX).forEach((object) => {
        if (objectCollisionY[object]) {
          if (this.koopa.scaleX === 1) {
            this.handleObjectCollision(1);
          } else {
            this.handleObjectCollision(-1);
          }
        }
      });
    }
  }

  handleObjectCollision(sign) {
    if (this.horvel) {
      this.intervalTreeX.removeInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id)
      this.koopa.x += (sign * (this.horVel + this.koopa.width + 10));
      this.intervalTreeX.insertInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id)
    } else {
      this.intervalTreeX.removeInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id)
      this.koopa.x += (sign * (this.koopa.width + 10));
      this.intervalTreeX.insertInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id)
    }
    this.koopa.scaleX = -1 * this.koopa.scaleX;
  }

  handleMovingThroughLevel(horVel) {
    if (this.active || this.shell) {
      this.horVel = horVel;
      this.detectObjectCollision();
      this.intervalTreeX.removeInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id)
      this.intervalTreeY.removeInterval(this.koopa.y, this.koopa.y + this.koopa.height, "koopa", this.id);
      if (this.koopa.scaleX == 1) {
        this.koopa.x -= (horVel + 1 * this.shellConstant);
      } else {
        this.koopa.x -= (horVel - 1 * this.shellConstant);
      }
      this.intervalTreeX.insertInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id)
      this.intervalTreeY.insertInterval(this.koopa.y, this.koopa.y + this.koopa.height, "koopa", this.id);
      this.isMarioMoving = true
    }
  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("koopa")],
      frames: [
        [137, 12, 22, 34],
        [160, 12, 22, 34],
        [229, 10, 22, 35]
      ],
      animations: {
        stand: 1,
        move: [0,1, "move", .05],
        squashed: 2
      }
    };
    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.koopa =  new createjs.Sprite(spriteSheet);
    this.addKoopaToScreen();
  }

  addKoopaToScreen(){
    this.koopa.y = this.pos[1] - 34;
    this.koopa.x = this.pos[0];
    this.koopa.width = 22;
    this.koopa.height = 34;
    this.shellConstant = 1;
    this.koopa.scaleX = this.scaleX;
    createjs.Ticker.framerate = 25;
    this.stage.addChild(this.koopa);
    this.active = true;
    this.koopa.gotoAndPlay("move");
  }

  moveRight(){
    this.intervalTreeX.removeInterval(this.koopa.x - this.koopa.width, this.koopa.x, "koopa", this.id);
    this.intervalTreeY.removeInterval(this.koopa.y, this.koopa.y + this.koopa.height, "koopa", this.id);
    this.koopa.x += 1 * this.shellConstant;
    this.intervalTreeX.insertInterval(this.koopa.x - this.koopa.width, this.koopa.x, "koopa", this.id);
    this.intervalTreeY.insertInterval(this.koopa.y, this.koopa.y + this.koopa.height, "koopa", this.id);
  }

  moveLeft(){
    this.intervalTreeX.removeInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id);
    this.intervalTreeY.removeInterval(this.koopa.y, this.koopa.y + this.koopa.height, "koopa", this.id);
    this.koopa.x -= 1 * this.shellConstant;
    this.intervalTreeX.insertInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id);
    this.intervalTreeY.insertInterval(this.koopa.y, this.koopa.y + this.koopa.height, "koopa", this.id);
  }
}
export default Koopa;
