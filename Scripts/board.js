/**
 * Created by William on 18/01 2017.
 * Online White Board
 */
var mouseX, mouseY, pmouseX, pmouseY;
var windowWidth, windowHeight, w, createCanvas;

//noinspection JSUnresolvedFunction
function setup() {
  /**creates canvas with white background color*/
  createCanvas(windowWidth - 100, windowHeight - 70).parent('canvas');
  //cnv.parent('canvas');
  background(240);
}

//noinspection JSUnusedGlobalSymbols
function draw() {
  /**Runs automatically by p5.js at each frame.
   * Sets stroke weight according to slider at the bottom, draws line between
   * current mouse pos and previous mouse pos.*/
  if (onCanvas() && mouseIsPressed) {
    w = document.forms[0][0].value;
    strokeWeight(w);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
//noinspection JSUnusedGlobalSymbols
function mousePressed() {
  /**if mouse pressed outside canvas stop draw loop*/
  if (!onCanvas()) {
    noLoop()
  }
}

function mouseReleased() {
  /**When mouse released resume draw loop*/
  loop()
}

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