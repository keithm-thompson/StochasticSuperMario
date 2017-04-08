import Cloud from './background/cloud';
import Floor from './background/floor';

class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.floor = this.renderFloorFromSprite();
  }

  renderFloorFromSprite() {
    let floor = {};
    const floorImage = new Image();

    floor.width = 32;
    floor.height = 15;
    floorImage.onload = () => {
      this.renderFloor();
    };
    floorImage.src = "app/assets/images/NES-SuperMarioBros-Tileset.png";
    floor.image = floorImage;

    return floor;
  }

  renderFloor(){
    for (let i = 0; i < Background.WIDTH; i+= 31) {
      this.ctx.drawImage(
        this.floor.image,
        0,
        0,
        this.floor.width,
        this.floor.height,
        i,
        Background.HEIGHT - (2 * this.floor.height),
        this.floor.width,
        this.floor.height
      );

      this.ctx.drawImage(
        this.floor.image,
        0,
        0,
        this.floor.width,
        this.floor.height,
        i,
        Background.HEIGHT - this.floor.height,
        this.floor.width,
        this.floor.height
      );
    }
  }
}

Background.WIDTH = 700;
Background.HEIGHT = 400;
export default Background;
