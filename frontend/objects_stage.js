import WarpPipe from './objects/warp_pipe';
import Block from './objects/block';
import Floor from './background/floor';
import Cloud from './background/cloud';
import Grass from './background/grass';

class ObjectsStage {
  constructor(stage){
    this.stage = stage;
    this.objects = {};
    this.objects[1] = new WarpPipe(stage, 1, 230, 370, this);
    this.objects[2] = new Block(stage, 2,  200, 250, this);
    this.objects[3] = new Block(stage, 3, 217, 250, this);
    this.objects[5] = new Block(stage, 5, 234, 250, this);
    this.objects[6] = new Block(stage, 6, 251, 250, this);
    this.currentId = 7;
    this.lastItemAdded  = null;
    this.initialBackground();
    this.addBackground();
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
    let height  = Math.floor(Math.random() * (250 - 220)) + 220;
    let randomNum = Math.random();
    if (randomNum < .2) {
      for (let i = 0; i < 5; i++) {
        this.objects[this.currentId] = new Block(this.stage,
                                                 this.currentId,
                                                 1100 + (i * 16),
                                                 height,
                                                 this);
      this.currentId++;
      }
    } else if (randomNum < .45) {
      for (let i = 0; i < 4; i++) {
        this.objects[this.currentId] = new Block(this.stage,
          this.currentId,
          1100 + (i * 16),
          height,
          this);
          this.currentId++;
      }
      this.lastItemAdded = "block";
    } else if(randomNum < .75) {
      for (var i = 0; i < 3; i++) {
        this.objects[this.currentId] = new Block(this.stage,
          this.currentId,
          1100 + (i * 16),
          height,
          this);
          this.currentId++;
      }
    }
    this.currentId++;
  }
  addWarpPipe() {
    this.objects[this.currentId] = new WarpPipe(this.stage,
                                             this.currentId,
                                             1100,
                                             370,
                                             this);
    this.lastItemAdded = "warp_pipe";
    this.currentId++;
  }
  addBackground() {
    for(let i = 0; i < 3; i++) {
      this.objects[this.currentId] = new Cloud(this.stage, this.currentId, 700 + (i * 32), (Math.random() * (170 - 50) + 50), this);
      this.currentId++;
      this.objects[this.currentId] = new Grass(this.stage, this.currentId, 700 + (i * (Math.random() * (200 - 120) + 120)), 355, this);
      this.currentId++;
    }
  }

  initialBackground() {
    for (let i = 0; i < 10; i++) {
      this.objects[this.currentId] = new Cloud(this.stage, this.currentId, 100 + (i * 50), (Math.random() * (170 - 50) + 50), this);
      this.currentId++;
      if (i < 4) {
        this.objects[this.currentId] = new Grass(this.stage, this.currentId, 100 + (i * (Math.random() * (200 - 120) + 120)), 355, this);
        this.currentId++;
      }
    }
  }

  deleteObjects(id) {
    delete this.objects[id];
  }

  handleMovingThroughLevel(horVel) {
    Object.keys(this.objects).forEach((object) => {
      this.objects[object].handleMovingThroughLevel(horVel);
    });
  }
}


export default ObjectsStage;
