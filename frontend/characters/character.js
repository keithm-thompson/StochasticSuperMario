import { characterIntervalTreeX, objectIntervalTreeX } from '../interval_tree';
class Character {
  constructor(objectsStage) {
    this.objectsStage = objectsStage;
    this.intervalTreeX = characterIntervalTreeX;
    this.objectIntervalTreeX = objectIntervalTreeX;
  }
}

export default Character;
