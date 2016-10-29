class Grass {
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
      {src: "NES-SuperMarioBros-Tileset.png", id: "grass"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("grass")],
      frames: [
        [185, 145, 38, 15]
      ],
      animations: {
        object: 0
      }
    };

    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.grass =  new createjs.Sprite(spriteSheet);
    this.grass.x = this.pos[0];
    this.grass.y = this.pos[1];
    this.grass.width = 38;
    this.grass.height = 15;
    this.active = true;
    this.stage.addChild(this.grass);
    this.grass.gotoAndPlay("object");
  }

  handleMovingThroughLevel(horVel) {
    if (this.active) {
      this.grass.x -= horVel;
    }
      if (this.grass.x < -100) {
        this.active = false;
        this.objectsStage.deleteObjects(this.id);
        this.stage.removeChild(this.grass);

      }
  }
}
export default Grass;
