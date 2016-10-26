import Character from './character';

class Goomba extends Character{
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
  }


  loadImage() {
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.imageLoaded);
    const manifest = [
      {src: "NES-SuperMarioBros-Enemies.png", id: "goomba"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  handleTick(){
    if( Date.now() - this.tick > window.tickDelay ) {
      if(this.active && !this.isMarioMoving) {
        this.intervalTreeX.removeInterval(this.goomba.x, this.goomba.x + this.goomba.width, "goomba", this.id);
        this.intervalTreeY.removeInterval(this.goomba.y, this.goomba.y + this.goomba.height, "goomba", this.id);
        this.goomba.x += this.goomba.direction * 1;
        this.intervalTreeX.insertInterval(this.goomba.x, this.goomba.x + this.goomba.width, "goomba", this.id);
        this.intervalTreeY.insertInterval(this.goomba.y, this.goomba.y + this.goomba.height, "goomba", this.id);
        this.detectObjectCollision();
      } else {
        this.isMarioMoving = false;
        this.horVel = null;
      }
      this.tick = Date.now();
    }
  }

  handleCharacterCollision() {
    this.active = false;
    this.intervalTreeX.removeInterval(this.goomba.x, this.goomba.x + this.goomba.width, "goomba", this.id);
    this.intervalTreeY.removeInterval(this.goomba.y, this.goomba.y + this.goomba.height, "goomba", this.id);
    this.squashedAnimation();
  }

  squashedAnimation() {
    this.goomba.gotoAndStop("move");
    this.goomba.gotoAndPlay("squashed");
    window.setTimeout(() => {
      this.stage.removeChild(this.goomba);
    }, 1000);
  }

  detectObjectCollision() {
    let objectCollisionX, objectCollisionY;
    objectCollisionX = this.objectIntervalTreeX.query(this.goomba.x, this.goomba.x + this.goomba.width);
    objectCollisionY = this.objectIntervalTreeY.query(this.goomba.y, this.goomba.y + this.goomba.height );

    if(objectCollisionX && objectCollisionY) {
      Object.keys(objectCollisionX).forEach((object) => {
        if (objectCollisionY[object]) {
          this.goomba.direction = -1 * this.goomba.direction;
          if (this.horVel) {
            this.intervalTreeX.removeInterval(this.goomba.x, this.goomba.x + this.goomba.width, "goomba", this.id);
            this.goomba.x += this.goomba.direction * (this.horVel + 15);
            this.intervalTreeX.insertInterval(this.goomba.x, this.goomba.x + this.goomba.width, "goomba", this.id);
          }
        }
      });
    }
  }

  handleMovingThroughLevel(horVel) {
    if (this.active) {
      this.horVel = horVel;
      this.detectObjectCollision();
      this.intervalTreeX.removeInterval(this.goomba.x, this.goomba.x + this.goomba.width, "goomba", this.id);
      this.intervalTreeY.removeInterval(this.goomba.y, this.goomba.y + this.goomba.height, "goomba", this.id);
      this.goomba.x -= this.goomba.direction * horVel - this.goomba.direction ;
      this.intervalTreeX.insertInterval(this.goomba.x, this.goomba.x + this.goomba.width, "goomba", this.id);
      this.intervalTreeY.insertInterval(this.goomba.y, this.goomba.y + this.goomba.height, "goomba", this.id);
      this.isMarioMoving = true;
    }
  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("goomba")],
      frames: [
        [0, 15, 22, 31],
        [24, 15, 22, 31],
        [47, 15, 22, 31],
        [0, 0, 0, 0]
      ],
      animations: {
        stand: 0,
        move: [0,1, "move", .05],
        squashed: [2,3, "squashed"]
      }
    };
    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.goomba =  new createjs.Sprite(spriteSheet);
    this.goomba.y = this.pos[1] - 31;
    this.goomba.x = this.pos[0];
    this.goomba.width = 22;
    this.goomba.height = 31;
    this.goomba.direction = this.scaleX;
    createjs.Ticker.framerate = 25;
    this.stage.addChild(this.goomba);
    this.active = true;
    this.goomba.gotoAndPlay("move");
  }

}
export default Goomba;