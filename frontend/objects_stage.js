import WarpPipe from './objects/warp_pipe';
import Block from './objects/block';

class ObjectsStage {
  constructor(stage){
    this.warp_pipe = new WarpPipe(stage);
    this.block = new Block(stage, 300, 270);
    this.block = new Block(stage, 315, 270);
    this.block = new Block(stage, 315, 270);
    this.block = new Block(stage, 330, 270);
    this.block = new Block(stage, 345, 270);
  }
}

export default ObjectsStage;
