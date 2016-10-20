class Mario {
  constructor(stage){
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
    this.decelerate(e.keyCode);
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
      this.mario.y += 2 ;
    } else if (this.mario.y > 331) {
      this.mario.y = 331;
    }
    this.mario.y -= this.verVel;
    this.mario.x += this.mario.scaleX * this.horVel;

    if( this.horVel === 0 && this.mario.y === 331) {
      this.mario.gotoAndStop("jump");
      this.mario.gotoAndStop("run");
      this.mario.gotoAndPlay("stand");
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
        run: [1,3, "run"],
        jump: [4, 4, "jump"]
      },
    };
    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.mario =  new createjs.Sprite(spriteSheet);
    this.mario.y = 331;
    this.mario.x = 50;
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
    else if (this.horVel > 0 || this.keys[key] === "right" || this.keys[key] === "left") {
      this.mario.gotoAndStop("stand");
      this.mario.gotoAndPlay("run");
    }

    if (this.keys[key] === "right") {
      if (this.mario.scaleX === -1) {
        this.mario.scaleX = 1;
        this.mario.x -= 20;
      } else {
        this.horVel += 1;
      }
    }
    else if (this.keys[key] === "left") {
      if (this.mario.scaleX === 1) {
        this.mario.scaleX = -1;
        this.mario.x += 20;
      } else {
      this.horVel += 1;
      }
    } else if (this.keys[key] === "jump") {
      this.verVel += 15;
    }
  }
  decelerate(key) {
    this.shouldDecelerate = true;
  }
}

Mario.MOVES = {
  "a": [1,  0],
  "d": [-1,  0],
  "right": [ 1,  0],
  "left": [ -1,  0],
  "space": [-1,  -1]
};
export default Mario;
