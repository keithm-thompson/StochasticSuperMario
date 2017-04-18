class Floor {
    constructor(stage, id, x, y, objectsStage) {
    this.stage = stage;
    this.objectsStage = objectsStage;
    this.pos = [x, y];
    this.imageLoaded  = this.imageLoaded.bind(this);
    this.loadImage();
    this.id = id;
  }

  loadImage() {
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.imageLoaded);
    const manifest = [
      {src: "NES-SuperMarioBros-Tileset.png", id: "floor"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("floor")],
      frames: [
        [0, 0, 32, 15],
      ],
      animations: {
        object: 0
      }
    };

    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.floor =  new createjs.Sprite(spriteSheet);
    this.addFloorToScreen();
  }

  handleMovingThroughLevel(horVel) {
    if (this.active) {
      this.floor.x -= horVel;
    }
      if (this.floor.x < -100) {
        this.active = false;
        this.objectsStage.deleteObjects(this.id);
      }
  }
  addFloorToScreen() {
    this.floor.x = this.pos[0];
    this.floor.y = this.pos[1];
    this.floor.width = 32;
    this.floor.height = 15;
    this.active = true;
    this.stage.addChild(this.floor);
    this.floor.gotoAndPlay("object");
  }
}
export default Floor;
