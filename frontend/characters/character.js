import {
    characterIntervalTreeX,
    characterIntervalTreeY,
    objectIntervalTreeX,
    objectIntervalTreeY
  } from '../interval_tree';
class Character {
  constructor(objectsStage) {
    this.objectsStage = objectsStage;
    this.intervalTreeX = characterIntervalTreeX;
    this.intervalTreeY = characterIntervalTreeY;
    this.objectIntervalTreeX = objectIntervalTreeX;
    this.objectIntervalTreeY = objectIntervalTreeY;
  }
}

export default Character;
