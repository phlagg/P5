let angle = 0;
let w = 10;
let ma;
let maxD;

function setup() {
  createCanvas(900,900, WEBGL);

  //ma = PI/4;
  maxD = dist(0,0,200,200);

  wSlider = createSlider(2, 100, 10);
  wSlider.position(20, 700);

  maSlider = createSlider(0, 500, 100);
  maSlider.position(20, 730);

  oSlider = createSlider(0, 80, 25);
  oSlider.position(20, 760);

  hSlider = createSlider(0, 800, 25);
  hSlider.position(20, 790);

  xSlider = createSlider(0, 500, 100);
  xSlider.position(20, 820);
}

function draw() {
  console.log(frameRate());


  var w = wSlider.value();
  var ma = maSlider.value();
  var mult = oSlider.value();
  var ha = hSlider.value();
  var xa = xSlider.value();

  background(0);
  ortho(-800,800,-900,900, 0, 2000);
  directionalLight(255,255,255,0,-1,0);


  rotateX(xa/100);
  rotateY(ma/100);
  //rotateX(-PI/8);
  //translate(width/2,height/2);
  rectMode(CENTER);
  //rotateX(angle*.25)


  for (let z = 0; z < height; z+=w){
    for (let x = 0; x < width; x+= w){
      push();
      let d = dist(x, z, width/2, height/2);
      let offset = map(d, 0, maxD, -PI, PI);
      let a = angle+offset;
      // let h = map(sin(a*sin(a/3)),-1,1,0,ha);
      let h = map(sin(a)*sin(exp^(2*a)),-1,1,0,ha);
      
      normalMaterial();
      
      translate(x-width/2,0,z-height/2);
      // box(w-2,h, w-2);
      //sphere(10, h, w-2);
    
     
      translate(w-2,h,w-2,);
      sphere(w);
      // cone(w,w);
    
      pop();
  }

}
  angle -= 0.004*mult;

}
