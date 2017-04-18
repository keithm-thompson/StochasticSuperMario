import merge from 'lodash/merge';

class IntervalTree {
  constructor(min, max, character, id, parent){
    this.min = min;
    this.max = max;
    this.lowerTree = null;
    this.higherTree = null;
    this.overlappingIntervals = {};
    this.overlappingIntervals[id] = [min, max, character];
    this.parent = parent;
  }

  reset() {
    this.min = -1000;
    this.max = -1000;
    this.lowerTree = null;
    this.higherTree = null;
    this.overlappingIntervals = {};
    this.overlappingIntervals[0] = [-1000, -1000, "canvas"];
    this.parent = null;
  }

  query(min, max){
    if(max < this.min) {
        return this.lowerTree ?  this.lowerTree.query(min, max) : null;
    } else if (min > this.max) {
        return this.higherTree ?  this.higherTree.query(min, max) : null;
    } else {
        if (this.overlappingIntervals && Object.keys(this.overlappingIntervals).length === 1 && this.overlappingIntervals[0]) {
          let lowerTreeIntervals, higherTreeIntervals;
          if (this.lowerTree) {
            lowerTreeIntervals = this.lowerTree.query(min, max);
          }
          if (this.higherTree) {
            higherTreeIntervals = this.higherTree.query(min, max);
          }
          if (lowerTreeIntervals && higherTreeIntervals) {
              return Object.assign(lowerTreeIntervals, higherTreeIntervals);
          } else if (lowerTreeIntervals) {
              return lowerTreeIntervals;
          } else if (higherTreeIntervals) {
              return higherTreeIntervals;
          } else {
              return null;
          }
      }
        if (min < this.min && max > this.max && this.lowerTree && this.higherTree) {
          return merge({}, this.overlappingIntervals, this.lowerTree.query(min, max), this.higherTree.query(min, max));
      } else if (min < this.min && this.lowerTree) {
          return merge({}, this.overlappingIntervals, this.lowerTree.query(min, max));
      } else if (max > this.max && this.higherTree) {
          return merge({}, this.overlappingIntervals, this.higherTree.query(min, max));
      } else {
          return this.overlappingIntervals;
      }
    }
  }

  insertInterval(min, max, character, id){
        if (max < this.min) {
            if (this.lowerTree) {
                this.lowerTree.insertInterval(min, max, character, id);
            } else {
                this.lowerTree = new IntervalTree(min, max, character, id, this);
            }
        } else if (min > this.max) {
            if (this.higherTree) {
                this.higherTree.insertInterval(min, max, character, id);
            } else {
                this.higherTree = new IntervalTree(min, max, character, id, this);
            }
        } else {
          this.overlappingIntervals[id] = [min, max, character];
          if (max > this.max ) {
            if (this.higherTree) {
              this.higherTree.insertInterval(min, max, character, id);
            } else {
              this.higherTree = new IntervalTree(min, max, character, id, this);
            }
          }
          if (min < this.min)
            if (this.lowerTree) {
              this.lowerTree.insertInterval(min, max, character, id);
            } else {
              this.lowerTree = new IntervalTree(min, max, character, id, this);
            }
        }
    // }
  }

  removeInterval(min, max, character, id){
    if (max < this.min) {
      if (this.lowerTree && this.lowerTree.min) {
        this.lowerTree.removeInterval(min, max, character, id);
      } else {
        return null;
      }
    } else if ( min > this.max) {
      if (this.higherTree && this.higherTree.min) {
        this.higherTree.removeInterval(min, max, character, id);
      } else {
        return null;
      }
    } else {
       delete this.overlappingIntervals[id];
       if (Object.keys(this.overlappingIntervals).length === 0) {
          if (this.lowerTree && this.lowerTree.min && this.higherTree && this.higherTree.min) {
            let replacementNode = this.removeTwoChildrenNode(this.higherTree, this);
            replacementNode.removeInterval(min, max, character, id)
            if (replacementNode) {
              if (this.higherTree) {
                this.higherTree.removeInterval(min, max, character, id);
              }
              if (this.lowerTree) {
                this.lowerTree.removeInterval(min, max, character, id);
              }
              this.replaceNode(replacementNode);
            } else {
              if (this.parent.lowerTree == this) {
                this.parent.lowerTree = null;
              } else if (this.parent.higherTree == this){
                this.parent.higherTree = null;
              }
            }
          } else if (this.lowerTree && this.lowerTree.min) {
            this.lowerTree.removeInterval(min, max, character, id);
            if (this.lowerTree) {
              this.replaceNode(this.lowerTree)
              this.higherTree = this.lowerTree.higherTree;
              this.lowerTree = this.lowerTree.lowerTree;
            } else {
                if (this.parent.lowerTree == this) {
                  this.parent.lowerTree = null;
                } else if (this.parent.higherTree == this){
                  this.parent.higherTree = null;
                }
            }
          } else if (this.higherTree && this.higherTree.min) {
              this.higherTree.removeInterval(min, max, character, id);
             if (this.higherTree) {
                this.replaceNode(this.higherTree)
                this.lowerTree = this.higherTree.lowerTree;
                this.higherTree = this.higherTree.higherTree;
             } else {
               if (this.parent.lowerTree == this) {
                 this.parent.lowerTree = null;
               } else if (this.parent.higherTree == this){
                 this.parent.higherTree = null;
               }
             }
         } else {
           if (this.parent.lowerTree == this) {
             this.parent.lowerTree = null;
           } else if (this.parent.higherTree == this){
             this.parent.higherTree = null;
           }
         }
       } else {
        if (this.higherTree) {
          this.higherTree.removeInterval(min, max, character, id);
        }
        if (this.lowerTree) {
          this.lowerTree.removeInterval(min, max, character, id);
        }
       }
     }
  }

  replaceNode(otherNode) {
    this.min = otherNode.min;
    this.max = otherNode.max;
    this.overlappingIntervals = otherNode.overlappingIntervals;
  }

  removeTwoChildrenNode(node, parent) {
    if (node.lowerTree && node.lowerTree.min && node.higherTree && node.higherTree.min) {
      return this.removeTwoChildrenNode(node.lowerTree, node);
    } else if (node.lowerTree && node.lowerTree.min) {
      return this.removeTwoChildrenNode(node.lowerTree, node);
    } else if (node.higherTree && node.higherTree.min){
      if(parent) {
        if (parent.lowerTree == node) {
          parent.lowerTree = node.higherTree;
        } else if (parent.higherTree == node){
          parent.higherTree = node.higherTree;
        }
      }
      return node;
    } else {
      if(parent) {
        if (parent.lowerTree == node) {
          parent.lowerTree = null;
        } else if (parent.higherTree == node){
          parent.higherTree = null;
        }
      }
      return node;
    }
  }
}

export const characterIntervalTreeX = new IntervalTree(-1000, -1000,"canvas", 0);
export const characterIntervalTreeY = new IntervalTree(1200,1200,"canvas", 0);
export const objectIntervalTreeX = new IntervalTree(-1000, -1000, "canvas", 0);
export const objectIntervalTreeY = new IntervalTree(1200, 1200, "canvas", 0);
