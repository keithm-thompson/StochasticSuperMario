import MarioObject from './object';

class WarpPipe extends MarioObject {
  constructor(stage, id, x ,y, objectsStage) {
    super();
    this.stage = stage;
    this.objectsStage = objectsStage;
    this.id = id;
    this.pos = [x, y];
    this.imageLoaded  = this.imageLoaded.bind(this);
    this.loadImage();
    this.handleTick = this.handleTick.bind(this);
    createjs.Ticker.addEventListener("tick", this.handleTick);
  }

  handleTick() {
    if(this.active) {
      this.intervalTreeX.removeInterval(this.warp_pipe.x, this.warp_pipe.x + this.warp_pipe.width , "warp_pipe", this.id);
      this.intervalTreeX.insertInterval(this.warp_pipe.x , this.warp_pipe.x + this.warp_pipe.width, "warp_pipe", this.id);
    }
  }


  loadImage() {
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.imageLoaded);
    const manifest = [
      {src: "NES-SuperMarioBros-Tileset.png", id: "warp_pipe"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("warp_pipe")],
      frames: [
        [0, 130, 32, 45]
      ],
      animations: {
        object: 0
      }
    };

    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.warp_pipe =  new createjs.Sprite(spriteSheet);
    this.addWarpPipeToScreen();
  }

  handleMovingThroughLevel(horVel) {
    if (this.active) {
      this.intervalTreeX.removeInterval(this.warp_pipe.x, this.warp_pipe.x + this.warp_pipe.width , "warp_pipe", this.id);
      this.warp_pipe.x -= horVel;
      this.intervalTreeX.insertInterval(this.warp_pipe.x , this.warp_pipe.x + this.warp_pipe.width, "warp_pipe", this.id);
    }
    if (this.warp_pipe.x < -100) {
      this.active = false;
      this.objectsStage.deleteObjects(this.id);
      this.intervalTreeX.removeInterval(this.warp_pipe.x, this.warp_pipe.x + this.warp_pipe.width , "warp_pipe", this.id);
      this.intervalTreeY.removeInterval(this.warp_pipe.y, this.warp_pipe.y + this.warp_pipe.height, "warp_pipe", this.id);
    }
  }

  addWarpPipeToScreen(){
    this.warp_pipe.y = this.pos[1] - 45;
    this.warp_pipe.x = this.pos[0];
    this.warp_pipe.width = 32;
    this.warp_pipe.height = 45;
    this.intervalTreeX.insertInterval(this.warp_pipe.x, this.warp_pipe.x + this.warp_pipe.width, "warp_pipe", this.id);
    this.intervalTreeY.insertInterval(this.warp_pipe.y, this.warp_pipe.y + this.warp_pipe.height, "warp_pipe", this.id);
    this.active = true;
    this.stage.addChild(this.warp_pipe);
    this.warp_pipe.gotoAndPlay("object");
    this.stage.setChildIndex(this.warp_pipe, 1);
  }
}
export default WarpPipe;
