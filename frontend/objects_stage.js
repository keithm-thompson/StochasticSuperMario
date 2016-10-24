import WarpPipe from './objects/warp_pipe';
import Block from './objects/block';

class ObjectsStage {
  constructor(stage){
    this.stage = stage;
    this.objects = {};
    this.objects[2] = new Block(stage, 2,  200, 270);
    this.objects[3] = new Block(stage, 3, 217, 270);
    this.objects[5] = new Block(stage, 5, 234, 270);
    this.objects[6] = new Block(stage, 6, 251, 270);
    this.objects[1] = new WarpPipe(stage, 1);
  }

  addChild(child) {
    this.stage.addChild(child);
    this.stage.setChildIndex(child, 0);
  }

  handleObjectCollision(id, object) {
    if (object === "block") {
      this.objects[id].handleObjectCollision();
    }
  }

  handleMovingThroughLevel(horVel) {
    Object.keys(this.objects).forEach((object) => {
      this.objects[object].handleMovingThroughLevel(horVel);
    });
    this.stage.update();
  }
}


export default ObjectsStage;
