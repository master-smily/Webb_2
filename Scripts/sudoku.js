/**
 * Created by master_smily on 2017-01-22.
 */

let data = [], cache = [], emptyI = [], stack = [], conflict = false;
//noinspection ES6ConvertVarToLetConst
var mouseX, mouseY, xId, yId, xCord, yCord, i, map, random, createCanvas;

//noinspection JSUnusedGlobalSymbols
function setup() {
  /**Run by p5.js at script start.
   * Creates canvas and creates 9x9 grid with null values in canvas,
   * separates grid into 9 3x3 grids.*/
  createCanvas(668, 668).parent('canvas');
  for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
      data.push({ //create data Object containing x, y and value
        x: i,
        y: j,
        value: null
      });
      let
        xCord = map(i, 1, 9, 0, 600),
        yCord = map(j, 1, 9, 0, 600);
      rect(xCord, yCord, 600 / 9, 600 / 9);
    }
  }

  fill(10);
  rect(217, 0, 7, height);
  rect(442, 0, 7, height);
  rect(0, 217, width, 7);
  rect(0, 442, width, 7);
  data.forEach(sortData);
}
function getId(x, y) {
  /**Gets mouse coordinates mapped to a value between 1-9, rounded upwards.
   * If x and y specified uses that instead, then calculates screen coordinates
   * by mapping block pos to value between 0 and 600.*/
  xId = x || map(mouseX, 0, 600, 1, 9);
  yId = y || map(mouseY, 0, 600, 1, 9);
  xId = Math.floor(xId);
  yId = Math.floor(yId);
  xCord = map(xId, 1, 9, 0, 600);
  yCord = map(yId, 1, 9, 0, 600);
  data.forEach(getIndex); //run getIndex at each entry in data array
}

function displayText(background, foreground) {
  /**Displays text at screen pos if there is a value.*/
  fill(background);
  rect(xCord, yCord, 600 / 9, 600 / 9);
  if (data[i].value !== null) {
    textSize(50);
    fill(foreground);
    text(data[i].value, xCord, yCord, 70, 70);
  }
}

//noinspection JSUnusedGlobalSymbols
function onCanvas() {
  /**@returns true if mouse on canvas*/
  if (mouseX > 0 && mouseX < width) {
    if (mouseY > 0 && mouseY < height) {
      return true
    }
  }
  return false;
  //mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
}
//noinspection JSUnusedGlobalSymbols
function draw() {
  /**part of p5.js, loops continually. draws the block where mouse is on dark.*/
  if (onCanvas()) {
    getId();
    if (cache.indexOf(xId + 'x' + yId) === -1) {
      cache.push(xId + 'x' + yId);
      displayText(40, 240);
    }
  }
  if (cache.length > 1) {
    getId(parseInt(cache[0][0], 10), parseInt(cache[0][2], 10));
    // rect(map(xId, 1, 9, 0, 600), map(yId, 1, 9, 0, 600), 600 / 9, 600 / 9);
    displayText(255, 20);
    cache.splice(0, 1);
  }
}

//noinspection JSUnusedGlobalSymbols
function mouseClicked() {
  /**when mouse is clicked: update value in data*/
  if (onCanvas()) {
    getId();
    let newVal = Math.round(prompt("number between 1-9")); //Math.round so that nobody uses decimals
    if (Number.isInteger(newVal) && newVal < 10 && newVal > 0) { //if value is integer between 1-9.
      if (checkValid(data[i], newVal)) {
        data[i].value = newVal;
        displayText(40, 240)
      }else {
        alert("Invalid")
      }
    }
  }
}

function getIndex(element, index) {
  /**if id established getId matches x and y in Object, set i to index*/
  if (element.x === xId && element.y === yId) {
    i = index;
  }
}

function sortData(element, index, array) {
  /**loops through array and decide which group and index they have,
   * sets properties to that.*/
  if (element.x > 0 && element.x < 4) {
    if (element.y > 0 && element.y < 4) {
      array[index].block = 1;
    }else if (element.y > 3 && element.y < 7) {
      array[index].block = 2;
    }else {
      array[index].block = 3;
    }
  }else if (element.x > 3 && element.x < 7) {
    if (element.y > 0 && element.y < 4) {
      array[index].block = 4;
    }else if (element.y > 3 && element.y < 7) {
      array[index].block = 5;
    }else {
      array[index].block = 6;
    }
  }else {
    if (element.y > 0 && element.y < 4) {
      array[index].block = 7;
    }else if (element.y > 3 && element.y < 7) {
      array[index].block = 8;
    }else {
      array[index].block = 9;
    }
  }
  array[index].index = index; // to see what index a Object have in data,
}                  // even if it retrieved from somewhere else, (like stack)

function emptyValue(element, index) {
  /**checks which cells are empty and add their index to emptyI*/
  if (index === 0) {
    emptyI = []
  }
  if (element.value === null) {
    emptyI.push(index);
  }
}

function checkValid(cell, num) {
  /**@returns true if num is allowed at cell according to sudoku rules.*/
  let active = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].x !== cell.x || data[i].y !== cell.y) {
      if (data[i].x === cell.x) {
        active.push(data[i].value)
      }
      if (data[i].y === cell.y) {
        active.push(data[i].value);
      }
      if (data[i].block === cell.block) {
        active.push(data[i].value)
      }
    }
  }
  return !active.includes(num);
}

function createRaw() {
  /**Creates the sudoku data.
   * Selects a index, if selected cell has no value check if there are any
   * valid values. if there are repeat until there are no empty cells.
   * If there are none go back one step and try remaining numbers*/
  let count = 0;
  noLoop();
  let done = false;
  while (!done) {               //infinite loop
    count++;
    let [vals, i] = selectIndex();
    if (data[i].value === null) {
      while (vals.length > 0) {
        let val = random(vals);
        vals.splice(vals.indexOf(val), 1);
        // console.log(vals)
        if (checkValid(data[i], val)) {
          data[i].value = val;
          conflict = false;
          // console.log("conflict: " + conflict);
          data[i].vals = vals;
          stack.push(i);
          vals.splice(0, vals.length)
        }else if (vals.length === 0) {
          data[i].value = null;
          conflict = true;
          data[i].vals = [];
          // console.log("conflict: " + conflict);
        }
      }
    }else if (emptyI.length === 0) {
      done = true;
      loop();
      console.log("done:" + count);
      console.log(vals)
    }
  }
}

function selectIndex() {
  /**Select which cell to check and which numbers to check.
   * If last iteration found no valid number select last cell,
   * don't check the last number. Else select random empty cell and all numbers*/
  let vals, i;
  vals = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (conflict) {
    i = stack.pop();
    vals.splice(vals.indexOf(data[i].value));
    data[i].value = null;
  }else {
    data.forEach(emptyValue);
    i = random(emptyI);
  }
  // console.log(emptyI);
  return [vals, i];
}