import Character from './character';

class Mario extends Character {
  constructor(stage, objectsStage){
    super(objectsStage)
    this.stage = stage;
    this.pos = [20,370];
    this.horVel = 0;
    this.verVel = 0;
    this.imageLoaded  = this.imageLoaded.bind(this);
    this.setKeys();
    this.move = this.move.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.bindKeyHandlers();
    this.loadImage();
    createjs.Ticker.addEventListener("tick", this.handleTick);
    this.shouldDecelerate = true;
    this.numJumps = 0;
  }

  setKeys(){
    this.keys = {
      // right arrow and 'd'
      68: "right",
      39: "right",

      //left arrow and 'a'
      65: "left",
      37: "left",

      //up arrow, space bar, and 'w'
      38: "jump",
      87: "jump",
      32: "jump"
    };
  }

  bindKeyHandlers() {
    document.addEventListener("keydown", this.handleKeyPressed);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  loadImage() {
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.imageLoaded);
    const manifest = [
      {src: "NES-SuperMarioBros-Mario&Luigi.png", id: "mario"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  handleKeyPressed(e){
    this.move(e.keyCode);
  }

  handleKeyUp(e){
    this.shouldDecelerate = true;
  }

  handleTick(){
    if (this.shouldDecelerate) {
      if (this.horVel > 0) {
       this.horVel -= 2;
     } else {
       this.horVel = 0;
     }
      if (this.verVel > 0){
       this.verVel -= 2;
     } else {
       this.verVel = 0;
     }
    }
    if(this.mario.y < 331) {
      this.mario.y += 4 ;
    } else if (this.mario.y > 331) {
      this.mario.y = 331;
    }
    this.mario.y -= this.verVel;
    this.mario.x += this.mario.scaleX * this.horVel;
    let collision, collision2;
    if (this.mario.scaleX === 1) {
      collision = this.intervalTreeX.query(this.mario.x, this.mario.x + this.mario.width);
      collision2 = this.objectIntervalTreeX.query(this.mario.x, this.mario.x + this.mario.width);
    } else {
      collision = this.intervalTreeX.query(this.mario.x , this.mario.x + this.mario.width );
      collision2 = this.objectIntervalTreeX.query(this.mario.x - this.mario.width, this.mario.x);

    }
    if (collision2) {
      console.log(collision2);
      console.log(this.mario.x);

      console.log(this.mario.x + this.mario.width);
    }
    if( this.horVel === 0 && this.mario.y <= 331) {
      this.mario.gotoAndStop("jump");
      this.mario.gotoAndStop("run");
      this.mario.gotoAndPlay("stand");
      this.numJumps = 0;
    }
    this.stage.update();
  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("mario")],
      frames: [
        [0, 0, 24, 39],
        [25, 0, 20, 39],
        [45, 0, 20, 39],
        [65, 0, 20, 40],
        [106, 0, 21,40],
        [350, 0, 21, 39],
        [371, 0, 21, 39],
        [392, 0, 20, 39]
      ],
      animations: {
        stand: 0,
        run: [1,3, "run", .1],
        jump: [4, 4, "jump"]
      },
    };
    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.mario =  new createjs.Sprite(spriteSheet);
    this.mario.y = 331;
    this.mario.x = 50;
    this.mario.height = 39;
    this.mario.width = 24;
    this.stage.addChild(this.mario);
    this.mario.gotoAndPlay("stand");
    // this.stage.update();
  }

  move(key) {
    this.shouldDecelerate = false;
    if (this.mario.y < 331 || this.keys[key] === "jump") {
      this.mario.gotoAndStop("stand");
      this.mario.gotoAndPlay("jump");
    }
    else if ((
      this.horVel > 0 ||
      this.keys[key] === "right" ||
      this.keys[key] === "left") &&
      this.mario.currentAnimation === "stand") {
        this.mario.gotoAndStop("stand");
        this.mario.gotoAndPlay("run");
      }

    if (this.keys[key] === "right") {
      if (this.mario.scaleX === -1) {
        this.mario.scaleX = 1;
        this.mario.x -= 24;
      } else {
        this.horVel += 1;
      }
    }
    else if (this.keys[key] === "left") {
      if (this.mario.scaleX === 1) {
        this.mario.scaleX = -1;
        this.mario.x += 24;
      } else {
      this.horVel += 1;
      }
    } else if (this.keys[key] === "jump" && this.numJumps < 2) {
      this.verVel += 15;
      this.numJumps += 1;
    }
  }
}
export default Mario;
