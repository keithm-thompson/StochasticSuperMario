import Character from './character';

class PiranhaPlant extends Character {
  constructor(stage, objectsStage){
    super(objectsStage);
    this.stage = stage;
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
      {src: "NES-SuperMarioBros-Enemies.png", id: "piranhaPlant"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  handleTick() {
    if(this.active) {
      this.intervalTreeY.removeInterval(this.piranhaPlant.y, this.piranhaPlant.y + this.piranhaPlant.height, "piranhaPlant");
      if(this.piranhaPlant.y <= this.pos[1] - 90) {
        this.direction = 1;
      } else if (this.piranhaPlant.y >= this.pos[1] - 45) {
        this.direction = -1;
      }
      this.piranhaPlant.y += this.direction * 1;
      this.intervalTreeY.insertInterval(this.piranhaPlant.y, this.piranhaPlant.y + this.piranhaPlant.height, "piranhaPlant");
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
    this.piranhaPlant.x = 466;
    this.piranhaPlant.width = 22;
    this.piranhaPlant.height = 46;
    this.active = true;
    this.intervalTreeX.insertInterval(this.piranhaPlant.x, this.piranhaPlant.x + this.piranhaPlant.width, "piranhaPlant");
    createjs.Ticker.framerate = 25;
    this.stage.addChild(this.piranhaPlant);
    this.piranhaPlant.gotoAndPlay("move");
    this.stage.update();
  }

}
export default PiranhaPlant;
