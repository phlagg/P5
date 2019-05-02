var font;
var easycam;


var vehicles = [];
function preload() {
  font = loadFont('Anonymous Pro B.ttf');
  // font = 'Georgia';
  // var points = font.textToPoints('meow', 50, 500, 500);
}

function setup(){
  pixelDensity(1);
  var canvas = createCanvas(1500, 800);
  // easycam = createEasyCam(); 
  background(0);
  textFont(font);
  
  var points = font.textToPoints('huzzah', 50, 400, 400);
  noStroke();
  
  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    
    
  }
  

}

function draw(){
  background (0);

  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviours();
    v.update();
    v.show();

  }


}

