import Character from './character';

class PiranhaPlant extends Character {
  constructor(stage, objectsStage, id, x, y){
    super(objectsStage);
    this.stage = stage.stage;
    this.id = id;
    this.pos = [x, y];
    this.horVel = 0;
    this.verVel = 0;
    this.imageLoaded  = this.imageLoaded.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.loadImage();
    createjs.Ticker.addEventListener("tick", this.handleTick);
  }


  loadImage() {
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.imageLoaded);
    const manifest = [
      {src: "NES-SuperMarioBros-Enemies.png", id: "piranhaPlant"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  handleTick() {
    if(this.active) {
      this.intervalTreeY.removeInterval(this.piranhaPlant.y + 10, this.piranhaPlant.y + this.piranhaPlant.height, "piranhaPlant", this.id);
      if(this.piranhaPlant.y <= this.pos[1] - 90) {
        this.move = false;
        this.piranhaPlant.y += 1;
        window.setTimeout(() => {
          this.direction = 1;
          this.move = true;
        }, 750);
      } else if (this.piranhaPlant.y >= this.pos[1] - 45) {
        this.move = false;
        this.piranhaPlant.y -= 1;
        window.setTimeout(() => {
          this.direction = -1;
          this.move = true;
        }, 1000);
      }
      if (this.move) {
        this.piranhaPlant.y += Number(this.direction) * 1;
      }
      this.intervalTreeY.insertInterval(this.piranhaPlant.y + 10, this.piranhaPlant.y + this.piranhaPlant.height, "piranhaPlant", this.id);
    }
  }

  handleMovingThroughLevel(horVel) {
    if (this.active) {
      this.intervalTreeX.removeInterval(this.piranhaPlant.x + 3, this.piranhaPlant.x + this.piranhaPlant.width - 3, "piranhaPlant", this.id);
      this.piranhaPlant.x -= horVel;
      this.intervalTreeX.insertInterval(this.piranhaPlant.x + 3, this.piranhaPlant.x + this.piranhaPlant.width - 3, "piranhaPlant", this.id);
    }
    if (this.piranhaPlant.x < -100) {
      this.active = false;
      this.intervalTreeX.removeInterval(this.piranhaPlant.x + 3, this.piranhaPlant.x + this.piranhaPlant.width - 3, "piranhaPlant", this.id);
      this.intervalTreeY.removeInterval(this.piranhaPlant.y + 10, this.piranhaPlant.y + this.piranhaPlant.height, "piranhaPlant", this.id);
    }
  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("piranhaPlant")],
      frames: [
        [275, 0, 22, 46],
        [298, 0, 22, 46]
      ],
      animations: {
        stand: 0,
        move: [0,1, "move", .05],
        squashed: 2
      }
    };
    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.piranhaPlant =  new createjs.Sprite(spriteSheet);
    this.piranhaPlant.y = this.pos[1] - 90;
    this.piranhaPlant.x = this.pos[0];
    this.piranhaPlant.width = 20;
    this.piranhaPlant.height = 40;
    this.active = true;
    createjs.Ticker.framerate = 25;
    this.stage.addChild(this.piranhaPlant);
    this.piranhaPlant.gotoAndPlay("move");
    this.stage.setChildIndex(this.piranhaPlant, 0);
  }

}
export default PiranhaPlant;
