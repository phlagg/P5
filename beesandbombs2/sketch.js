var img;
let angle = 0;
let windowHeight = 900;
let windowWidth = 900;

var cols, rows;
var scl = 2000;
var w = 900;
var h = 900;

var flying = 0;

var terrain = [];

function setup() {
  pixelDensity(1);
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);

  easycam = new Dw.EasyCam(this._renderer, {distance : 900}); 
  // img = loadImage("dog.jpg");
  // setAttributes('antialias', true);


    
  wSlider = createSlider(2, 100, 10);
  wSlider.position(20, 730);
  oSlider = createSlider(0, 80, 25);
  oSlider.position(20, 760);
  scl = wSlider.value();
  hSlider = createSlider(0, 20, 3);
  hSlider.position(20, 790);
  cols = w / scl;
  rows = h/ scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
  push();
  scl = wSlider.value();
// orbitControl();
var maxD = dist(0,0,10,10);
var mult = oSlider.value();
  // flying -= 0.1;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      let d = dist(x, y, cols/2, rows/2);
      let offset = map(d, 0, maxD, -PI, PI);
      let a = angle+offset;
      let ha = map(sin(a),-1,1,-10,50);
      terrain[x][y] = ha;
      // xoff += 0.2;
    }
    // yoff += 0.2;
  }
  let locX = mouseX ;
  let locY = mouseY ;

  ambientLight(50);
  // directionalLight(255, 0, 0, 0.25, 0.25, 0);
  pointLight(255, 255, 255, locX, locY, 2);

  background(0);
  // ambientMaterial(255);
  // normalMaterial(0);
  // fill(0,0,255,90);
  specularMaterial(250);
  
  translate(0, 50);
  rotateX(PI/3);
  // noFill();
  // noStroke();
  strokeWeight(0)
  // stroke(175);
  
  translate(-w/2, -h/2);
  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
      
    }
    endShape();
    
  }
  pop();
  angle -=0.01*mult;
}

function keyReleased(){
  if(key == '1') state = easycam.getState();
  if(key == '2') easycam.setState(state, 2000);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
}
var state;