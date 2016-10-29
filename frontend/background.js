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
  // renderClouds() {
  //   for(let i = 0; i < 6; i++) {
  //     this.ctx.drawImage(
  //       this.cloud.image,
  //       0,
  //       322,
  //       this.cloud.width,
  //       this.cloud.height,
  //       Math.random() * Background.WIDTH,
  //       Math.random() * (Background.HEIGHT - (10 * this.cloud.height)),
  //       this.cloud.width,
  //       this.cloud.height
  //     );
  //   }
  // }
  // renderGrass() {
  //   for(let i = 0; i < 4; i++) {
  //     this.ctx.drawImage(
  //       this.grass.image,
  //       185,
  //       145,
  //       this.grass.width,
  //       this.grass.height,
  //       Math.random() * Background.WIDTH ,
  //       Background.HEIGHT - (2 * this.floor.height) - this.grass.height,
  //       this.grass.width,
  //       this.grass.height
  //     );
  //   }
  // }
}

Background.WIDTH = 700;
Background.HEIGHT = 400;
export default Background;
