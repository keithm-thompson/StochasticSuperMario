import MarioObject from './object';

export default class Block extends MarioObject {
  constructor(stage, id, x, y) {
    super();
    this.stage = stage;
    this.id = id;
    this.pos = [x, y];
    this.imageLoaded = this.imageLoaded.bind(this);
    this.loadImage();
  }

  loadImage() {
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.imageLoaded);
    const manifest = [
      { src: "NES-SuperMarioBros-ItemandBrickBlocks.png", id: "block" }
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("block")],
      frames: [
        [177, 113, 15, 15],
        [193, 113, 15, 15],
        [209, 113, 15, 15],
        [0, 0, 0, 0],
      ],
      animations: {
        objectLight: 0,
        objectMedium: 1,
        objectDark: 2,
      },
    };

    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.block = new createjs.Sprite(spriteSheet);
    this.block.x = this.pos[0];
    this.block.y = this.pos[1];
    this.block.width = 15;
    this.block.height = 15;
    this.intervalTreeX.insertInterval(this.block.x, this.block.x + this.block.width, "block", this.id);
    this.intervalTreeY.insertInterval(this.block.y, this.block.y + this.block.height, "block", this.id);
    this.stage.addChild(this.block);
    this.block.gotoAndPlay("objectLight");
    this.stage.update();
  }
}
