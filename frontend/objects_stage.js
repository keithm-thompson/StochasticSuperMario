import WarpPipe from './objects/warp_pipe';

class ObjectsStage {
  constructor(stage){
    this.warp_pipe = new WarpPipe(stage);
  }
}

export default ObjectsStage;
