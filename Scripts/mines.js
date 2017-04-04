const WIDTH = 10;
const HEIGHT = 10;
const SCL = 60;
const bombs = 10;
let data = [];


function setup() {
  createCanvas(WIDTH * SCL, HEIGHT * SCL).parent('canvas');
  // create the grid data
  for (let x = 0; x < WIDTH; x++) {
    data.push([]);
    for (let y = 0; y < HEIGHT; y++) {
      data[x].push(new Block())
    }
  }
  textAlign(CENTER, CENTER);
  textSize(SCL * 0.75);
  drawGrid();
  dropBombs(bombs);
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      checkNeighbors(x, y)
    }
  }
}

function drawGrid() {
  for (let x = 0; x < WIDTH; x++) {
    let xPos = x * SCL;
    for (let y = 0; y < HEIGHT; y++) {
      let yPos = y * SCL;
      if (data[x][y].bomb) {
        fill(200, 20, 20);
        rect(xPos, yPos, SCL, SCL);
      }else if (data[x][y].checked) {
        fill(245);
        rect(xPos, yPos, SCL, SCL);
        if (data[x][y].neighbors.length !== 0) {
          fill(10);
          text(data[x][y].neighbors.length, xPos, yPos, SCL, SCL)
        }
      }else {
        fill(51);
        rect(xPos, yPos, SCL, SCL);
      }
    }
  }
}

function Block() {
  this.bomb = false;
  this.checked = true;
  this.neighborsLeft = true;
  this.neighbors = []
}

function draw() {
  background(255); //reset frame
  drawGrid();
  let x = Math.floor(map(mouseX, 0, width, 0, WIDTH));
  let y = Math.floor(map(mouseY, 0, height, 0, HEIGHT));
  fill(100);
  rect(x * SCL, y * SCL, SCL, SCL)
}

function dropBombs(n) {
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

function bombAtPos(x, y) {
  try {
    return data[x][y].bomb;
  }catch (err) {
    return false
  }
}

function checkNeighbors(x, y) {
  if (bombAtPos(x - 1, y - 1)) {
    data[x][y].neighbors.push([x - 1, y - 1])
  }
  if (bombAtPos(x, y - 1)) {
    data[x][y].neighbors.push([x, y - 1])
  }
  if (bombAtPos(x + 1, y - 1)) {
    data[x][y].neighbors.push([x + 1, y - 1])
  }
  if (bombAtPos(x - 1, y)) {
    data[x][y].neighbors.push([x - 1, y])
  }
  if (bombAtPos(x + 1, y)) {
    data[x][y].neighbors.push([x + 1, y])
  }
  if (bombAtPos(x - 1, y + 1)) {
    data[x][y].neighbors.push([x - 1, y + 1])
  }
  if (bombAtPos(x, y + 1)) {
    data[x][y].neighbors.push([x, y + 1])
  }
  if (bombAtPos(x + 1, y + 1)) {
    data[x][y].neighbors.push([x + 1, y + 1])
  }
}

function mousePressed() {
  let x = Math.floor(map(mouseX, 0, width, 0, WIDTH));
  let y = Math.floor(map(mouseY, 0, height, 0, HEIGHT));
  try {
    data[x][y].checked = true;
    if (data[x][y].neighbors.length >= 8 && !data[x][y].neighborsLeft) {
      data[x][y].neighbors.forEach(function (pos) {
        data[pos[0]][pos[1]].checked = 1;
        data[x][y].neighborsLeft = false
      })
    }
  }
}