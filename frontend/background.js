class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.floor = this.renderFloorFromSprite();
    this.cloud = this.renderCloudFromSprite();
    this.grass = this.renderGrassFromSprite();
  }

  renderFloorFromSprite() {
    let floor = {};
    const floorImage = new Image();

    floor.context = this.ctx;
    floor.width = 32;
    floor.height = 15;
    floorImage.onload = () => {
      this.renderFloor();
    };
    floorImage.src = "app/assets/images/NES-SuperMarioBros-Tileset.png";
    floor.image = floorImage;

    return floor;
  }

  renderCloudFromSprite() {
    let cloud = {};
    const cloudImage = new Image();

    cloud.context = this.ctx;
    cloud.width = 45;
    cloud.height = 28;

    cloudImage.onload = () => {
      this.renderClouds();
    };

    cloudImage.src = "app/assets/images/NES-SuperMarioBros-Tileset.png";
    cloud.image = cloudImage;

    return cloud;
  }

  renderGrassFromSprite() {
    let grass = {};
    const grassImage = new Image();

    grass.context = this.ctx;
    grass.width = 38;
    grass.height = 15;

    grassImage.onload = () => {
      this.renderGrass();
    };

    grassImage.src = "app/assets/images/NES-SuperMarioBros-Tileset.png";
    grass.image = grassImage;

    return grass;
  }

  renderFloor(){
    for (let i = 0; i < Background.WIDTH; i+= 32) {
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

  renderClouds() {
    for(let i = 0; i < 6; i++) {
      this.ctx.drawImage(
        this.cloud.image,
        0,
        322,
        this.cloud.width,
        this.cloud.height,
        Math.random() * Background.WIDTH,
        Math.random() * (Background.HEIGHT - (10 * this.cloud.height)),
        this.cloud.width,
        this.cloud.height
      );
    }
  }
  renderGrass() {
    for(let i = 0; i < 4; i++) {
      this.ctx.drawImage(
        this.grass.image,
        185,
        145,
        this.grass.width,
        this.grass.height,
        Math.random() * Background.WIDTH ,
        Background.HEIGHT - (2 * this.floor.height) - this.grass.height,
        this.grass.width,
        this.grass.height
      );
    }
  }
}

Background.WIDTH = 700;
Background.HEIGHT = 400;
export default Background;
