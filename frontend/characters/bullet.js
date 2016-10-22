import Character from './character';

class Bullet extends Character {
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
      {src: "NES-SuperMarioBros-Enemies.png", id: "bullet"}
    ];
    this.loader.loadManifest(manifest, true, "./app/assets/images/");
  }

  handleTick(){
    this.intervalTreeX.removeInterval(this.bullet.x, this.bullet.x + this.bullet.width, "bullet");
    this.intervalTreeY.removeInterval(this.bullet.y, this.bullet.y + this.bullet.height, "bullet");
    this.bullet.x += 4;
    this.intervalTreeX.insertInterval(this.bullet.x, this.bullet.x + this.bullet.width, "bullet");
    this.intervalTreeY.insertInterval(this.bullet.y, this.bullet.y + this.bullet.height, "bullet");
    this.stage.update();
  }

  imageLoaded() {
    const { loader } = this;
    let spriteData = {
      images: [loader.getResult("bullet")],
      frames: [
        [798, 25, 25, 20]
      ],
      animations: {
        stand: 0,
        move: [0,1, "move", .05],
        squashed: 2
      }
    };
    let spriteSheet = new createjs.SpriteSheet(spriteData);
    this.bullet =  new createjs.Sprite(spriteSheet);
    this.bullet.y = this.pos[1] - 100;
    this.bullet.x = -25;
    this.bullet.width = 25;
    this.bullet.height = 20;
    this.bullet.scaleX = -1;
    createjs.Ticker.framerate = 25;

    this.stage.addChild(this.bullet);
    this.bullet.gotoAndPlay("stand");
    this.stage.update();
  }

}
export default Bullet;
