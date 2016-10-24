import MarioObject from './object';

export default class Block extends MarioObject {
  constructor(stage, id, x, y, objectsStage) {
    super();
    this.stage = stage;
    this.objectsStage = objectsStage;
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
    this.active = true;
    this.stage.addChild(this.block);
    this.block.gotoAndPlay("objectLight");
     ;
  }

  handleMovingThroughLevel(horVel) {
    if(this.active) {
      this.intervalTreeX.removeInterval(this.block.x, this.block.x + this.block.width, "block", this.id)
      this.block.x -= horVel;
      this.intervalTreeX.insertInterval(this.block.x, this.block.x + this.block.width, "block", this.id)
    }
    if (this.block.x < -100) {
      this.active = false;
      this.objectsStage.deleteObjects(this.id);
      this.intervalTreeY.removeInterval(this.block.y, this.block.y + this.block.height, "block", this.id);
      this.intervalTreeX.removeInterval(this.block.x, this.block.x + this.block.width, "block", this.id)
    }
  }

  handleObjectCollision() {
    this.block.y -= 5;
     ;
    window.setTimeout(() => {
      this.block.y += 5;
       ;
    }, 250);
  }
}
