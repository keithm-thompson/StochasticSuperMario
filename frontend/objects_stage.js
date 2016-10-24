import WarpPipe from './objects/warp_pipe';
import Block from './objects/block';

class ObjectsStage {
  constructor(stage){
    this.stage = stage;
    this.objects = {};
    this.objects[1] = new WarpPipe(stage, 1, 230, 370, this);
    this.objects[2] = new Block(stage, 2,  200, 270, this);
    this.objects[3] = new Block(stage, 3, 217, 270, this);
    this.objects[5] = new Block(stage, 5, 234, 270, this);
    this.objects[6] = new Block(stage, 6, 251, 270, this);
    this.currentId = 7;
    this.lastItemAdded  = null;
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

  addObjects() {
    let height  = Math.floor(Math.random() * (270 - 220)) + 220;
    if (Math.random() < .2) {
      for (let i = 0; i < 5; i++) {
        this.objects[this.currentId] = new Block(this.stage,
                                                 this.currentId,
                                                 1100 + (i * 16),
                                                 height,
                                                 this);
      this.currentId++;
      }
    } else if (Math.random() < .45) {
      for (let i = 0; i < 4; i++) {
        this.objects[this.currentId] = new Block(this.stage,
          this.currentId,
          1100 + (i * 16),
          height,
          this);
          this.currentId++;
      }
      this.lastItemAdded = "block";
    } else if(Math.random() < .75) {
      for (var i = 0; i < 3; i++) {
        this.objects[this.currentId] = new Block(this.stage,
          this.currentId,
          1100 + (i * 16),
          height,
          this);
          this.currentId++;
      }
    } else {
    this.objects[this.currentId] = new WarpPipe(this.stage,
                                             this.currentId,
                                             1100,
                                             370,
                                             this);
    this.lastItemAdded = "warp_pipe";
  }
    this.currentId++;
  }

  deleteObjects(id) {
    delete this.objects[id];
  }

  handleMovingThroughLevel(horVel) {
    Object.keys(this.objects).forEach((object) => {
      this.objects[object].handleMovingThroughLevel(horVel);
    });
     ;
  }
}


export default ObjectsStage;
