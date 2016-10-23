import WarpPipe from './objects/warp_pipe';
import Block from './objects/block';

class ObjectsStage {
  constructor(stage){
    this.warp_pipe = new WarpPipe(stage, 1);
    this.block = new Block(stage, 2,  300, 270);
    this.block = new Block(stage, 3, 315, 270);
    this.block = new Block(stage, 4, 315, 270);
    this.block = new Block(stage, 5, 330, 270);
    this.block = new Block(stage, 6, 345, 270);
  }

  handleObjectCollision(id, object) {

  }
}


export default ObjectsStage;
