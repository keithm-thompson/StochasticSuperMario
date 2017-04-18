class Cloud {
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
      {src: "NES-SuperMarioBros-Tileset.png", id: "cloud"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("cloud")],
      frames: [
        [0, 322, 45, 28]
      ],
      animations: {
        object: 0
      }
    };

    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.cloud =  new createjs.Sprite(spriteSheet);
    this.addFloorToScreen();
  }

  handleMovingThroughLevel(horVel) {
    if (this.active) {
      this.cloud.x -= horVel;
    }
      if (this.cloud.x < -100) {
        this.active = false;
        this.objectsStage.deleteObjects(this.id);
        this.stage.removeChild(this.cloud);
      }
  }
  addFloorToScreen() {
    this.cloud.x = this.pos[0];
    this.cloud.y = this.pos[1];
    this.cloud.width = 45;
    this.cloud.height = 28;
    this.active = true;
    this.stage.addChild(this.cloud);
    this.cloud.gotoAndPlay("object");
  }
}
export default Cloud;
