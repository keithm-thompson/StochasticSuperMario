import Character from './character';

class Goomba extends Character{
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
      {src: "NES-SuperMarioBros-Enemies.png", id: "goomba"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  handleTick(){
    if (this.goomba.x > 300) {
      this.intervalTreeX.removeInterval(this.goomba.x, this.goomba.x + this.goomba.width, "goomba");
      this.goomba.gotoAndStop("move");
      this.goomba.gotoAndPlay("squashed");
    } else {
      this.intervalTreeX.removeInterval(this.goomba.x, this.goomba.x + this.goomba.width, "goomba");
      this.goomba.x += 1;
      this.intervalTreeX.insertInterval(this.goomba.x, this.goomba.x + this.goomba.width, "goomba");
      this.stage.update();
    }

  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("goomba")],
      frames: [
        [0, 15, 23, 31],
        [24, 15, 22, 31],
        [47, 15, 22, 31]
      ],
      animations: {
        stand: 0,
        move: [0,1, "move", .05],
        squashed: 2
      }
    };
    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.goomba =  new createjs.Sprite(spriteSheet);
    this.goomba.y = this.pos[1] - 31;
    this.goomba.x = 100;
    this.goomba.width = 22;
    createjs.Ticker.framerate = 25;
    this.stage.addChild(this.goomba);
    this.goomba.gotoAndPlay("move");
    this.stage.update();
  }

}
export default Goomba;
