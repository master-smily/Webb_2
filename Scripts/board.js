/**
 * Created by William on 18/01 2017.
 */
var mouseX, mouseY, pmouseX, pmouseY;
var windowWidth, windowHeight, w, createCanvas;

//noinspection JSUnresolvedFunction

function setup(){
  /**creates canvas with white background color*/
  createCanvas(windowWidth-100, windowHeight-40).parent('canvas');
  //cnv.parent('canvas');
  background(240);
}

//noinspection JSUnusedGlobalSymbols
function touchStarted() {
  /**Run by p5.js when bord is touched(with mouse or touchscreen).
   * Sets stroke weight according to slider at the bottom, draws line from
   * current mouse pos to previous mouse pos.*/
  w = document.forms[0][0].value;
  strokeWeight(w)
  line(mouseX, mouseY, pmouseX, pmouseY);
}
//noinspection JSUnusedGlobalSymbols
function touchMoved() {
  /**Until not touching board, draw lines as in touchStarted()*/
  line(mouseX, mouseY, pmouseX, pmouseY);
  // prevent default
  return false;
}
