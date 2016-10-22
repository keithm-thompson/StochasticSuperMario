import Character from './character';

class Mario extends Character {
  constructor(stage, objectsStage, charactersStage){
    super(objectsStage);
    this.charactersStage = charactersStage;
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
    if(this.active) {
      if (this.shouldDecelerate && this.horVel > 0) {
        this.horVel -= 3;
      } else if (this.horVel < 0) {
        this.horVel = 0;
      }
      if (this.shouldDecelerate && this.verVel > 0) {
        this.verVel -= 1;
      } else if (this.verVel < 0) {
        this.verVel = 0;
      }
      if(this.mario.y < 331) {
        this.verVel -= 3 ;
      } else if (this.mario.y > 331) {
        this.mario.y = 331;
        this.verVel = 0;
      }

      let objectConst = 1;
      let objectCollisionX, objectCollisionY, characterCollisionX, characterCollisionY;

      if (this.mario.scaleX === 1) {
        objectCollisionX = this.objectIntervalTreeX.query(this.mario.x, this.mario.x + this.mario.width);
        objectCollisionY = this.objectIntervalTreeY.query(this.mario.y, this.mario.y + this.mario.height );

        characterCollisionX = this.intervalTreeX.query(this.mario.x, this.mario.x + this.mario.width);
        characterCollisionY = this.intervalTreeY.query(this.mario.y, this.mario.y + this.mario.height);
      } else {
        objectCollisionX = this.objectIntervalTreeX.query(this.mario.x - this.mario.width, this.mario.x);
        objectCollisionY = this.objectIntervalTreeY.query(this.mario.y, this.mario.y + this.mario.height);

        characterCollisionX = this.intervalTreeX.query(this.mario.x - this.mario.width, this.mario.x);
        characterCollisionY = this.intervalTreeY.query(this.mario.y, this.mario.y + this.mario.height );
      }

      if(objectCollisionX && objectCollisionY) {
        Object.keys(objectCollisionX).forEach((object) => {
          if (objectCollisionY[object]) {
            if (this.mario.y + this.mario.height <= objectCollisionY[object][0] + 2) {
              if (this.verVel < 0 ) {
                this.verVel = 0;
              }
            } else if (this.mario.x + this.mario.width <= objectCollisionX[object][1]) {
              objectConst = 0;
              this.mario.x -= 2;
            } else {
              objectConst = 0;
              this.mario.x += 2;
            }
          }
        });
      }

      if(characterCollisionX && characterCollisionY) {
        Object.keys(characterCollisionX).forEach((character) => {
          if (characterCollisionY[character]) {
            if (this.mario.y + this.mario.height <= characterCollisionY[character][0] + 5) {
              this.charactersStage.handleCharacterCollision(character);
            } else {
              this.handleCharacterCollision();
            }
          }
        });
      }

        this.mario.y - this.verVel > 331 ? this.mario.y = 332 : this.mario.y -= this.verVel;
        this.mario.x += this.mario.scaleX * this.horVel * objectConst;

      if( this.horVel === 0 && this.verVel === 0) {
        this.mario.gotoAndStop("jump");
        this.mario.gotoAndStop("run");
        this.mario.gotoAndPlay("stand");
        this.numJumps = 0;
      }
      this.stage.update();
    }
  }

  handleCharacterCollision() {
    this.mario.gotoAndStop("jump");
    this.mario.gotoAndStop("run");
    this.mario.gotoAndStop("stand");
    this.mario.gotoAndPlay("dead");
    this.active = false;
    this.mario.y -= 40;
    window.setTimeout(() => {
      this.stage.removeChild(this.mario);
    }, 1500);
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
        [127, 0, 21, 40],
        [0, 0, 0, 0],
        [350, 0, 21, 39],
        [371, 0, 21, 39],
        [392, 0, 20, 39]
      ],
      animations: {
        stand: 0,
        run: [1,3, "run", .1],
        jump: [4, 4, "jump"],
        dead: [5, 6, "dead"]
      },
    };
    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.mario =  new createjs.Sprite(spriteSheet);
    this.mario.y = 331;
    this.mario.x = 50;
    this.mario.height = 39;
    this.mario.width = 24;
    this.active = true;
    this.stage.addChild(this.mario);
    this.mario.gotoAndPlay("stand");
    // this.stage.update();
  }

  move(key) {
    if(this.active) {
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
          this.horVel = 3;
        } else if (this.horVel < 9) {
          this.horVel += Mario.HORVEL;
        }
      }
      else if (this.keys[key] === "left") {
        if (this.mario.scaleX === 1) {
          this.mario.scaleX = -1;
          this.mario.x += 24;
          this.horVel = 3;
        } else if (this.horVel < 9){
        this.horVel += Mario.HORVEL;
        }
      } else if (this.keys[key] === "jump" && this.numJumps < 2) {
        this.verVel += 25;
        this.numJumps += 1;
      }
    }
  }
}

Mario.HORVEL = 3;
export default Mario;
