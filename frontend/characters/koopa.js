import Character from './character';

class Koopa extends Character{
  constructor(stage, objectsStage, id){
    super(objectsStage);
    this.stage = stage;
    this.id = id;
    this.pos = [50,370];
    this.horVel = 0;
    this.verVel = 0;
    this.imageLoaded  = this.imageLoaded.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.loadImage();
    createjs.Ticker.addEventListener("tick", this.handleTick);
    this.shouldDecelerate = true;
  }

  loadImage() {
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.imageLoaded);
    const manifest = [
      {src: "NES-SuperMarioBros-Enemies.png", id: "koopa"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  handleTick(){
    if(this.active && !this.isMarioMoving) {
      if (this.koopa.scaleX === 1) {
        this.intervalTreeX.removeInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id);
        this.intervalTreeY.removeInterval(this.koopa.y + 5, this.koopa.y + this.koopa.height, "koopa", this.id);
        this.koopa.x -= 1;
        this.intervalTreeX.insertInterval(this.koopa.x, this.koopa.x +  + this.koopa.width, "koopa", this.id);
        this.intervalTreeY.insertInterval(this.koopa.y + 5, this.koopa.y + this.koopa.height, "koopa", this.id);
      } else {
        this.intervalTreeX.removeInterval(this.koopa.x - this.koopa.width, this.koopa.x, "koopa", this.id);
        this.intervalTreeY.removeInterval(this.koopa.y + 5, this.koopa.y + this.koopa.height, "koopa", this.id);
        this.koopa.x += 1;
        this.intervalTreeX.insertInterval(this.koopa.x - this.koopa.width, this.koopa.x, "koopa", this.id);
        this.intervalTreeY.insertInterval(this.koopa.y + 5, this.koopa.y + this.koopa.height, "koopa", this.id);
      }
        this.stage.update();
        this.detectObjectCollision();
      } else {
        this.isMarioMoving = false;
        this.horVel = null;
      }
  }

  handleCharacterCollision() {
    this.active = false;
    if(this.koopa.scaleX === 1) {
      this.intervalTreeX.removeInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id);
      this.intervalTreeY.removeInterval(this.koopa.y, this.koopa.y + this.koopa.height, "koopa", this.id);
    } else {
      this.intervalTreeX.removeInterval(this.koopa.x - this.koopa.width, this.koopa.x, "koopa", this.id);
      this.intervalTreeY.removeInterval(this.koopa.y, this.koopa.y + this.koopa.height, "koopa", this.id);
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
      objectCollisionX = this.objectIntervalTreeX.query(this.koopa.x - this.koopa.width, this.koopa.x);
      objectCollisionY = this.objectIntervalTreeY.query(this.koopa.y, this.koopa.y + this.koopa.height);
    } else {
      objectCollisionX = this.objectIntervalTreeX.query(this.koopa.x, this.koopa.x + this.koopa.width);
      objectCollisionY = this.objectIntervalTreeY.query(this.koopa.y, this.koopa.y + this.koopa.height);
    }

    if(objectCollisionX && objectCollisionY) {
      Object.keys(objectCollisionX).forEach((object) => {
        if (objectCollisionY[object]) {
          this.koopa.scaleX = -1 * this.koopa.scaleX;
          if (this.horVel) {
            this.intervalTreeX.removeInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id)
            this.koopa.x += this.koopa.scaleX * (this.horVel + 15);
            this.intervalTreeX.insertInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id)
          }
        }
      });
    }
  }

  handleMovingThroughLevel(horVel) {
    if (this.active) {
      this.horVel = horVel;
      this.intervalTreeX.removeInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id)
      this.intervalTreeY.removeInterval(this.koopa.y, this.koopa.y + this.koopa.height, "koopa", this.id);
      this.koopa.x -= this.koopa.scaleX * (horVel - this.koopa.scaleX);
      this.intervalTreeX.insertInterval(this.koopa.x, this.koopa.x + this.koopa.width, "koopa", this.id)
      this.intervalTreeY.insertInterval(this.koopa.y, this.koopa.y + this.koopa.height, "koopa", this.id);
      this.isMarioMoving = true
      this.stage.update();
      this.detectObjectCollision();
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
    this.koopa.y = this.pos[1] - 34;
    this.koopa.x = 150;
    this.koopa.width = 22;
    this.koopa.height = 34;
    this.koopa.scaleX = -1;
    createjs.Ticker.framerate = 25;
    this.stage.addChild(this.koopa);
    this.active = true;
    this.koopa.gotoAndPlay("move");
    this.stage.update();
  }

}
export default Koopa;
