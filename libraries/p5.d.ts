declare const CENTER: string;
declare const LEFT: string;

declare var mouseButton: string | number;
declare var mouseIsPressed: boolean;

declare class canvas {
}

declare class p5 {
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;
  canvas: canvas;
}
declare class Params {
  width: number;
  height: number;
  scale: number;
  bombs: number;
}
declare function millis(): number;
declare function mousePressed(): void;
declare function textAlign(h: string, v: string): p5;
declare function nf(num: number, left?: number, right?: number): string;
declare function getURLParams(): Params;
declare function loop(): void;