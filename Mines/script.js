const WIDTH = 10;
const HEIGHT = 10;
const SCL = 60;
let data = {}

function setup(){
  createCanvas(WIDTH*SCL, HEIGHT*SCL)
  drawGrid(true)
}

function drawGrid(initial){
  for (let x = 0; x < WIDTH; x++){
    if (initial){data[x] = {}}
    for (let y = 0; y < HEIGHT; y++){
      // create the grid
      if (initial){
        data[x][y] = new Block()
      }
      if (data[x][y].checked){
        fill(255)
      }else{
        fill(200);
      }
      rect(x*SCL, y*SCL, SCL, SCL);
    }
  }
}

function Block(){
  this.bomb = false;
  this.checked = false;
}

function draw(){
  background(255) //reset frame
  drawGrid()
  let x = Math.floor(map(mouseX, 0, width, 0, WIDTH))
  let y = Math.floor(map(mouseY, 0, height, 0, HEIGHT))
  fill(100)
  rect(x*SCL, y*SCL, SCL, SCL)
}

function dropBombs(n) {
  count = n;
  while(count){
    x = Math.floor(random(WIDTH-1))
    y = Math.floor(random(HEIGHT-1))
    if (!data[x][y].bomb) {
      data[x][y].bomb = true
      count--
      console.log("Bomb!")
    }
  }
}