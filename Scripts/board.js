/**
 * Created by William on 18/01 2017.
 */
var mouseX, mouseY, pmouseX, pmouseY;
var windowWidth, windowHeight, w, createCanvas;

//noinspection JSUnresolvedFunction

function setup(){
  createCanvas(windowWidth-100, windowHeight-40).parent('canvas');
  //cnv.parent('canvas');
  background(240);
}


//noinspection JSUnusedGlobalSymbols
function draw() {
  w = document.forms[0][0].value;
  strokeWeight(w)
}

//noinspection JSUnusedGlobalSymbols
function touchStarted() {
  line(mouseX, mouseY, pmouseX, pmouseY);
}
//noinspection JSUnusedGlobalSymbols
function touchMoved() {
  line(mouseX, mouseY, pmouseX, pmouseY);
  // prevent default
  return false;
}
