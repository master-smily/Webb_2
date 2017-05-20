/**
 * Created by master_smily on 2017-04-05.
 * Block constructor object used by mines.js,
 * a block refers to each block in the grid.
 */
function Block(x_, y_) {
  this.bomb = false;
  this.checked = false;
  this.mark = false;
  this.neighbors = [];
  this.x = x_;
  this.y = y_;

  this.bombAtPos = function (x, y) {
    /**
     * returns true if bomb proberty is true, else false
     */
    try {
      return data[x][y].bomb;
    } catch (e) {
      // returns false if Block doesn't exist
      return false;
    }
  };

  this.checkNeighbors = function () {
    /**
     * checks all neighbors for bombs and pushes a object with
     * x and y coordinates to neighbour array.
     * if Block out of bounds object is null.
     */
    const x = this.x;
    const y = this.y;
    if (!this.bombAtPos(x - 1, y - 1)) {
      this.neighbors.push({x: x - 1, y: y - 1});
    }
    if (!this.bombAtPos(x, y - 1)) {
      this.neighbors.push({x: x, y: y - 1});
    }
    if (!this.bombAtPos(x + 1, y - 1)) {
      this.neighbors.push({x: x + 1, y: y - 1});
    }
    if (!this.bombAtPos(x - 1, y)) {
      this.neighbors.push({x: x - 1, y: y});
    }
    if (!this.bombAtPos(x + 1, y)) {
      this.neighbors.push({x: x + 1, y: y});
    }
    if (!this.bombAtPos(x - 1, y + 1)) {
      this.neighbors.push({x: x - 1, y: y + 1});
    }
    if (!this.bombAtPos(x, y + 1)) {
      this.neighbors.push({x: x, y: y + 1});
    }
    if (!this.bombAtPos(x + 1, y + 1)) {
      this.neighbors.push({x: x + 1, y: y + 1});
    }

    // check if object should equall null
    for (let i = 0; i < this.neighbors.length; i++) {
      let pos = this.neighbors[i];
      if (pos.x < 0 || pos.x >= WIDTH || pos.y < 0 || pos.y >= HEIGHT) {
        this.neighbors[i] = null;
      }
    }
  };

  this.clearNeighbours = function () {
    /**
     * go thrugh neighbors array and clear all neighbours, add Neighbour to
     * clearingStack if it has 8 empty neightbours so that it's neigbours will be cleared.
     * Skip neighbour if it is null or already cleared.
     */
    this.neighbors.forEach(function (pos) {
      if (pos !== null && !data[pos.x][pos.y].checked) {
        if (data[pos.x][pos.y].neighbors.length === 8) {
          clearingStack.push(pos);
        }
        data[pos.x][pos.y].checked = true;
        count++;
      }
    });
  };
}