urlParams = new URLSearchParams(window.location.search);
const WIDTH = urlParams.get('width');
const HEIGHT = urlParams.get('height');
const SCL = urlParams.get('scale');
const BOMBS = urlParams.get('bombs');
urlParams = [WIDTH, HEIGHT, SCL, BOMBS];

var showBombs = false;
var gameOver = false;
var paused = false;
var freeBlocks = (WIDTH * HEIGHT) - BOMBS;
var clock;
var count = 0;
let data = [];
let clearingStack = [];
if (urlParams.includes(null)) {
  settings('open');
  paused = true;
}
delete urlParams;

function setup() {
  /**Creates p5 canvas, empty data array, draws grid, drops bombs and
   * calculates how many neighbouring bombs each cell has.
   * Setup is run automatically by p5.js at program start. Creates Timer.*/
  let div = document.getElementById('canvasDiv');
  createCanvas(WIDTH * SCL, HEIGHT * SCL).parent('canvasDiv');
  div.style.width = WIDTH * SCL + "px";
  // create the grid data
  for (let x = 0; x < WIDTH; x++) {
    data.push([]);
    for (let y = 0; y < HEIGHT; y++) {
      data[x].push(new Block(x, y));
    }
  }
  textAlign(CENTER, CENTER);
  textSize(SCL * 0.75);
  drawGrid();
  dropBombs(BOMBS);
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      data[x][y].checkNeighbors();
    }
  }
  clock = createP(time("digital")).parent('canvasDiv');
}

function draw() {
  /**Ran automatically by p5.js at each frame. Draws a new grid, if there is
   * something in clearingStack it clears a 3x3 grid at that pos.
   * If player has cleared as many blocks as there is free blocks, it displays
   * a victory message, shows bombs and stops the game.
   * It draws a darker block at the cell mouse hovers over. Updates timer*/
  background(255); //reset frame
  drawGrid();
  if (clearingStack.length > 0) {
    let pos = clearingStack.pop();
    data[pos.x][pos.y].clearNeighbours();
  } else if (!gameOver && !paused) {
    let x = Math.floor(map(mouseX, 0, width, 0, WIDTH));
    let y = Math.floor(map(mouseY, 0, height, 0, HEIGHT));
    if (count === freeBlocks) {
      gameOver = true;
      showBombs = true;
      x = undefined;
      y = undefined;
      alert("you win after " + time());
    }
    fill(100);
    rect(x * SCL, y * SCL, SCL, SCL);
    clock.html(time("digital"));
  }
}

//noinspection JSUnusedGlobalSymbols
function mousePressed() {
  /**Run by p5.js each time the mouse is pressed. If not game over or paused
   * clear block at left mouse button, game over if block has a bomb.
   * Marks yellow if middle mouse button.*/
  if (!gameOver && !paused) {
    let x = Math.floor(map(mouseX, 0, width, 0, WIDTH));
    let y = Math.floor(map(mouseY, 0, height, 0, HEIGHT));
    try {
      if (mouseButton === LEFT) {
        data[x][y].checked = true;
        count++;
        if (data[x][y].bomb) {
          showBombs = true;
          alert("Game Over after " + time());
          gameOver = true;
        } else if (data[x][y].neighbors.length === 8) {
          data[x][y].clearNeighbours();
        }
      } else if (mouseButton === CENTER) {
        data[x][y].mark ^= true
      }
    } catch (error) {
      console.log(error);
      if (error instanceof TypeError) {
        //throw error
      }
    }
  }
}

function drawGrid() {
  /**Draws a grid by iterating through the data array.
   * Block with bomb is red if displaying bombs.
   * Block is white if block is cleared, displays number of neighbours if block
   * has less than 8 neighbouring bombs.
   * Block is yellow if marked. Block is dark if none of the above.*/
  for (let x = 0; x < WIDTH; x++) {
    let xPos = x * SCL;
    for (let y = 0; y < HEIGHT; y++) {
      let yPos = y * SCL;
      if (data[x][y].bomb && showBombs) {
        fill(200, 20, 20);
        rect(xPos, yPos, SCL, SCL);
      } else if (data[x][y].checked) {
        fill(245);
        rect(xPos, yPos, SCL, SCL);
        if (data[x][y].neighbors.length !== 8) {
          fill(10);
          text(8 - data[x][y].neighbors.length, xPos, yPos, SCL, SCL);
        }
      } else if (data[x][y].mark) {
        fill(250, 235, 20);
        rect(xPos, yPos, SCL, SCL);
      } else {
        fill(51);
        rect(xPos, yPos, SCL, SCL);
      }
    }
  }
}

function dropBombs(n) {
  /**Drop n bombs at random locations.*/
  let count = n, x, y;
  while (count) {
    x = Math.floor(random(WIDTH - 1));
    y = Math.floor(random(HEIGHT - 1));
    if (!data[x][y].bomb) {
      data[x][y].bomb = true;
      count--;
    }
  }
}

function time(format) {
  /**Checks time and formats it. Takes time in milliseconds and calculates
   * minutes and seconds, then formats as digital if specified else with words*/
  let milli = millis();
  let minutes = Math.floor(milli / 60000);
  let seconds = Math.floor((milli - minutes * 60000) / 1000);
  if (format === "digital") {
    return nf(minutes, 2) + ":" + nf(seconds, 2);
  } else if (minutes > 0) {
    return minutes + " minutes and " + seconds + " seconds";
  } else {
    return seconds + " seconds";
  }
}

function settings(opt) {
  /**Opens or closes settings dialog as specified by opt parameter.*/
  if (opt === 'open') {
    document.getElementById('settings').style.display = 'block';
    paused = true;
  } else if (opt === 'close') {
    document.getElementById('settings').style.display = 'none';
    paused = false;
  }
}