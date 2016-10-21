import {
  objectIntervalTreeX,
  objectIntervalTreeY
} from '../interval_tree';

class MarioObject {
  constructor(stage) {
    this.intervalTreeX = objectIntervalTreeX;
    this.intervalTreeY = objectIntervalTreeY;
  }
}

export default MarioObject;
