class Koopa {
  constructor(stage){
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
      {src: "NES-SuperMarioBros-Enemies.png", id: "koopa"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  handleTick(){
    if (this.koopa.x > 350) {
      this.koopa.gotoAndStop("move");
      this.koopa.gotoAndPlay("squashed");
    } else {
      this.koopa.x += 1;
      this.stage.update();
    }

  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("koopa")],
      frames: [
        [137, 0, 22, 46],
        [160, 0, 22, 46],
        [229, 0, 22, 46]
      ],
      animations: {
        stand: 1,
        move: [0,1, "move", .05],
        squashed: 2
      }
    };
    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.koopa =  new createjs.Sprite(spriteSheet);
    this.koopa.y = this.pos[1] - 46;
    this.koopa.x = 150;
    createjs.Ticker.framerate = 25;
    this.stage.addChild(this.koopa);
    this.koopa.gotoAndPlay("move");
    this.stage.update();
  }

}
export default Koopa;
