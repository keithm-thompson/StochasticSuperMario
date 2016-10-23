class IntervalTree {
  constructor(min, max, character, id){
    this.min = min;
    this.max = max;
    this.center = (max + min) / 2;
    this.lowerTree = null;
    this.higherTree = null;
    this.overlappingIntervals = {};
    this.overlappingIntervals[id] = [min, max, character] ;
  }

  query(min, max){
    if(max < this.min) {
      return this.lowerTree ?  this.lowerTree.query(min, max) : null;
    } else if (min > this.max) {
      return this.higherTree ?  this.higherTree.query(min, max) : null;
    } else {
      if (Object.keys(this.overlappingIntervals).length === 1 && this.overlappingIntervals['canvas']) {
        return null;
      }
      return this.overlappingIntervals;
    }
  }

  insertInterval(min, max, character, id){
    if(!this.min && !this.max) {
      this.min = min;
      this.max = max;
      this.center = (min + max) / 2;

      this.lowerTree = null;
      this.higherTree = null;
      this.overlappingIntervals = {};
      this.overlappingIntervals[id] = [min, max, character];
    } else {
        if (max < this.min) {
            if (this.lowerTree) {
                this.lowerTree.insertInterval(min, max, character, id);
            } else {
                this.lowerTree = new IntervalTree(min, max, character, id);
            }
        } else if (min > this.max) {
            if (this.higherTree) {
                this.higherTree.insertInterval(min, max, character, id);
            } else {
                this.higherTree = new IntervalTree(min, max, character, id);
            }
        } else {
          this.overlappingIntervals[id] = [min, max, character];
        }
    }
  }

  removeInterval(min, max, character, id){
    if (max < this.min) {
      if (this.lowerTree) {
        this.lowerTree.removeInterval(min, max, character, id);
      } else {
        return null;
      }
    } else if ( min > this.max) {
      if (this.higherTree) {
        this.higherTree.removeInterval(min, max, character, id);
      } else {
        return null;
      }
    } else {
       delete this.overlappingIntervals[id];
       if (Object.keys(this.overlappingIntervals).length === 0) {
           if (this.lowerTree) {
             this.min = this.lowerTree.min;
             this.max = this.lowerTree.max;
             this.center = this.lowerTree.center;


             this.overlappingIntervals = this.lowerTree.overlappingIntervals;
             const tempTree = this.higherTree;
             this.higherTree = this.lowerTree.higherTree;
             this.lowerTree.higherTree = tempTree;
             this.lowerTree = this.lowerTree.lowerTree;

         } else if (this.higherTree) {
             this.min = this.higherTree.min;
             this.max = this.higherTree.max;
             this.center = this.higherTree.center;

             this.overlappingIntervals = this.higherTree.overlappingIntervals;
             this.lowerTree = this.higherTree.lowerTree;
             this.higherTree = this.higherTree.higherTree;

         } else {
            this.min = null;
            this.max = null;
            this.center = null;

            this.overlappingIntervals = null;
            this.lowerTree = null;
            this.higherTree = null;
         }
       }
    }
  }
}

export const characterIntervalTreeX = new IntervalTree(350,350,"canvas");
export const characterIntervalTreeY = new IntervalTree(200,200,"canvas");
export const objectIntervalTreeX = new IntervalTree(350, 250, "canvas");
export const objectIntervalTreeY = new IntervalTree(200, 200, "canvas");
