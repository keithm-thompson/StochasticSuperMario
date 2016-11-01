import Character from './character';
import { gameEnded } from '../super_mario_game';

class Mario extends Character {
  constructor(stage, objectsStage, textCanvas, charactersStage){
    super(objectsStage);
    this.charactersStage = charactersStage;
    this.textCanvas = textCanvas;
    this.score = 0;
    this.stage = stage;
    this.pos = [20,370];
    this.horVel = 0;
    this.verVel = 0;
    this.lives = 3;
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
    this.now = Date.now();
    this.tick = Date.now();
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
    this.shouldDecelerateVertically = false;
  }

  handleKeyUp(e){
    if (e.code === "Space" || e.code === "KeyW" || e.code === "ArrowUp") {
      this.shouldDecelerateVertically = true;
    } else {
      this.shouldDecelerateHorizontally = true;
    }
  }

  handleTick(){
    // if( Date.now() - this.tick > window.tickDelay) {
      if(this.active) {
        if (this.shouldDecelerateHorizontally && this.horVel > 0) {
          this.horVel -= 3;
        } else if (this.horVel < 0) {
          this.horVel = 0;
        }
        if (this.shouldDecelerateVertically && this.verVel > 0) {
          this.verVel -= 1;
        } else if (this.verVel < 0) {
          this.verVel = 0;
        }
        if(this.mario.y < 331) {
          this.verVel -= 8;
        } else if (this.mario.y > 331) {
          this.mario.y = 331;
          this.verVel = 0;
        }

        let objectCollisionX, objectCollisionY, characterCollisionX, characterCollisionY;

        if (this.mario.scaleX === 1) {
          objectCollisionX = this.objectIntervalTreeX.query(this.mario.x, this.mario.x + this.mario.width);
          objectCollisionY = this.objectIntervalTreeY.query(this.mario.y, this.mario.y + this.mario.height);

          characterCollisionX = this.intervalTreeX.query(this.mario.x, this.mario.x + this.mario.width);
          characterCollisionY = this.intervalTreeY.query(this.mario.y, this.mario.y + this.mario.height);
        } else {
          objectCollisionX = this.objectIntervalTreeX.query(this.mario.x - this.mario.width, this.mario.x);
          objectCollisionY = this.objectIntervalTreeY.query(this.mario.y, this.mario.y + this.mario.height);

          characterCollisionX = this.intervalTreeX.query(this.mario.x - this.mario.width, this.mario.x);
          characterCollisionY = this.intervalTreeY.query(this.mario.y, this.mario.y + this.mario.height);
        }



        if(objectCollisionX && objectCollisionY) {
          Object.keys(objectCollisionX).forEach((id) => {
            if (objectCollisionY[id]) {
              if (this.distanceBetween(objectCollisionX[id], objectCollisionY[id])) {
                if (this.mario.y + this.mario.height <= objectCollisionY[id][0] - this.verVel) {
                  if (this.verVel < 0 ) {
                    this.verVel = 0;
                    this.mario.y = objectCollisionY[id][0] - this.mario.height;
                  }
                } else if (this.mario.y + this.mario.height >= objectCollisionY[id][1]) {
                  if(this.verVel > 0) {
                    this.verVel -= 12;
                    this.objectsStage.handleObjectCollision(id, objectCollisionY[id][2]);
                  }
                } else if (this.mario.x <= objectCollisionX[id][1]) {
                  this.objectConst = 0;
                  this.mario.x -= 4;
                } else if (this.mario.x >= objectCollisionX[id][0]){
                  this.objectConst = 0;
                  this.mario.x += 4;
                }
              }
            }
          });
        }

        if(characterCollisionX && characterCollisionY) {
          Object.keys(characterCollisionX).forEach((id) => {
            if (characterCollisionY[id]) {
              if (this.distanceBetween(characterCollisionX[id], characterCollisionY[id])) {
                if (characterCollisionY[id][2] == "koopa" || characterCollisionY[id][2] == "goomba") {
                  if (this.mario.y + this.mario.height <= characterCollisionY[id][0] - this.verVel) {
                    this.charactersStage.handleCharacterCollision(id, characterCollisionY[id][2]);
                    this.score = this.textCanvas.renderText(this.lives, this.score, 500);
                    this.mario.y -= 40;
                  } else {
                    this.lives -= 1;
                    this.score = this.textCanvas.renderText(this.lives, this.score, 0);
                    this.handleCharacterCollision();
                  }
                }
                else if (this.mario.y + this.mario.height <= characterCollisionY[id][0]) {
                  this.lives -= 1;
                  this.score = this.textCanvas.renderText(this.lives, this.score, 0);
                  this.charactersStage.handleCharacterCollision(id, characterCollisionY[id][2]);
                } else {
                  this.lives -= 1;
                  this.score = this.textCanvas.renderText(this.lives, this.score, 0);
                  this.handleCharacterCollision();
                }
              }
            }
          });
        }

        if (this.verVel === 0 && this.mario.currentAnimation === "jump") {
          this.mario.gotoAndStop("jump");
          this.mario.gotoAndPlay("stand");
          this.numJumps = 0;
        } else if (this.horVel === 0 && this.mario.currentAnimation === "run") {
          this.mario.gotoAndStop("run");
          this.mario.gotoAndPlay("stand");
        } else if (this.horVel !== 0 && this.mario.currentAnimation === "stand") {
          this.mario.gotoAndStop("stand");
          this.mario.gotoAndPlay("run");
        }

        if(Date.now() - this.now > 15) {
          if (this.horVel !== 0 && this.mario.scaleX === 1 && this.mario.x >= 400) {
              this.charactersStage.handleMovingThroughLevel(this.horVel);
              this.objectsStage.handleMovingThroughLevel(this.horVel);
              let objectRand = Math.random();
              if (objectRand < .015) {
                this.objectsStage.addObjects();
              } else if (objectRand < .023) {
                if (objectRand < .018) {
                  this.charactersStage.addPirahnaPlant();
                }
                this.objectsStage.addWarpPipe();
              }
              if (Math.random() < .023) {
                this.objectsStage.addBackground();
              }
              if (Math.random() < .03) {
                this.charactersStage.addCharacters();
              }
            }
            this.now = Date.now();
          }

        if (((this.mario.x < 400) || this.mario.scaleX === -1) && (this.mario.x > 24 || this.mario.scaleX === 1)) {
          this.mario.x += this.mario.scaleX * this.horVel * this.objectConst;
          this.objectConst = 1;
        }

        this.mario.y - this.verVel > 331 ? this.mario.y = 332 : this.mario.y -= this.verVel;
        this.stage.update();
        this.objectsStage.stage.update();
      }
      this.tick = Date.now();
  }

  distanceBetween(xCoords, yCoords) {
    if (this.mario.scaleX === 1) {
      if (((this.mario.x + this.horVel >= xCoords[0] && this.mario.x + this.horVel <= xCoords[1]) ||
      (this.mario.x + this.mario.width + this.horVel >= xCoords[0] && this.mario.x + this.mario.width + this.horVel <= xCoords[1])) &&
      ((this.mario.y >= yCoords[0]  && this.mario.y <= yCoords[1]) ||
      (this.mario.y + this.mario.height - this.verVel >= yCoords[0] && this.mario.y + this.mario.height <= yCoords[1]))) {
        return true;
      }
    } else {
      if (((this.mario.x - this.horVel >= xCoords[0] && this.mario.x - this.horVel <= xCoords[1]) ||
      (this.mario.x - this.mario.width - this.horVel >= xCoords[0] && this.mario.x - this.mario.width - this.horVel <= xCoords[1])) &&
      ((this.mario.y >= yCoords[0] && this.mario.y <= yCoords[1]) ||
      (this.mario.y + this.mario.height - this.verVel >= yCoords[0] && this.mario.y + this.mario.height <= yCoords[1]))) {
        return true;
      }
    }
    return false;
  }

  handleCharacterCollision() {
    this.mario.y -= 150;
    this.mario.gotoAndStop("jump");
    this.mario.gotoAndStop("run");
    this.mario.gotoAndStop("stand");
    this.mario.gotoAndPlay("dead");
    this.active = false;
    if (this.lives <= 0) {
      this.handleEndOfGame();
    } else {
      window.setTimeout(() => {
        this.stage.removeChild(this.mario);
        this.handleDeath();
      }, 350);
    }
  }
  handleDeath() {
    this.mario.gotoAndStop("dead");

    this.mario.x = 50;
    this.mario.y = 331;
    this.stage.removeAllChildren();
    this.mario.gotoAndPlay("revived");
    window.setTimeout(() => {
      this.stage.addChild(this.mario);
      this.mario.gotoAndStop("revived");
      this.mario.gotoAndPlay("stand");
    }, 500);
    this.charactersStage.handleLevelClear();
    this.intervalTreeX.reset();
    this.intervalTreeY.reset();
    this.active = true;
  }

  handleEndOfGame() {
    gameEnded(this.score);
  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("mario")],
      frames: [
        [4, 0, 20, 38],
        [25, 0, 20, 38],
        [45, 0, 20, 38],
        [65, 0, 20, 38],
        [106, 0, 21, 38],
        [127, 0, 21, 40],
        [0, 0, 0, 0],
        [350, 0, 21, 39],
        [371, 0, 21, 39],
        [392, 0, 20, 39]
      ],
      animations: {
        stand: 0,
        run: [1,3, "run", .2],
        jump: [4, 4, "jump"],
        dead: [5, 6, "dead", .5],
        revived: [0, 6, 0, "revived", .5]
      },
    };
    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.mario =  new createjs.Sprite(spriteSheet);
    this.mario.y = 331;
    this.mario.x = 50;
    this.mario.height = 38;
    this.mario.width = 20;
    this.objectConst = 1;
    this.active = true;
    this.stage.addChild(this.mario);
    this.mario.gotoAndPlay("stand");
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
        this.shouldDecelerateHorizontally = false;
        if (this.mario.scaleX === -1) {
          this.mario.scaleX = 1;
          this.mario.x -= this.mario.width;
          this.horVel = 3;
        } else if (this.horVel < 9) {
          this.horVel += Mario.HORVEL;
        }
      }
      else if (this.keys[key] === "left") {
        this.shouldDecelerateHorizontally = false;
        if (this.mario.scaleX === 1) {
          this.mario.scaleX = -1;
          this.mario.x += this.mario.width;
          this.horVel = 3;
        } else if (this.horVel < 6){
        this.horVel += Mario.HORVEL;
        }
      } else if (this.keys[key] === "jump" && this.numJumps < 2 && this.verVel <= 25) {
          this.verVel += 35;
          this.numJumps += 1;
          if (this.numJumps === 2) {
            this.shouldDecelerateVertically = true;
          }
      }
    }
  }
}

Mario.HORVEL = 3;
export default Mario;
