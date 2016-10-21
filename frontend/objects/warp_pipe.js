import MarioObject from './object';

class WarpPipe extends MarioObject {
  constructor(stage) {
    super();
    this.stage = stage;
    this.pos = [50,370];
    this.imageLoaded  = this.imageLoaded.bind(this);
    this.loadImage();
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
      [0, 130, 32, 35]
    ],
    animations: {
      object: 0
    }
  };

  let spriteSheet = new createjs.SpriteSheet(spriteData);
  this.warp_pipe =  new createjs.Sprite(spriteSheet);
  this.warp_pipe.y = this.pos[1] - 35;
  this.warp_pipe.x = 460;
  this.warp_pipe.width = 32;
  this.intervalTreeX.insertInterval(this.warp_pipe.x, this.warp_pipe.x + this.warp_pipe.width, "warp_pipe");
  this.stage.addChild(this.warp_pipe);
  this.warp_pipe.gotoAndPlay("object");
  this.stage.update();
  }

  }
  export default WarpPipe;
