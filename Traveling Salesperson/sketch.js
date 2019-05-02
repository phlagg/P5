var cities = [];
var totalCities = 5;
var recordDistance;
var bestEver;
var totalPermutations;
var count = 0;

var order = [];

function setup(){
  createCanvas(400, 600);
  for (var i = 0; i < totalCities; i++){
    var v = createVector(random(width), random(height/2));
    cities[i] = v;
    order[i] = i;

  }
  var d = calcDistance(cities, order);
  recordDistance = d;
  bestEver = order.slice();
  totalPermutations = sFact(totalCities);
  // console.log(totalPermutations);
  

}

function draw(){
  background(0);
  fill(255);
  for (var i = 0; i < cities.length; i++){
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < order.length; i++){
    var n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  stroke(0,175,255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < bestEver.length; i++){
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();



  var d = calcDistance(cities, order);
  if ( d < recordDistance) {
    recordDistance = d;
    bestEver = order.slice();
    
  }
  textSize(20);
  noStroke();
  // var s = '';
  // for (var i = 0; i < order.length; i++) {
  //   s += order[i];
  // }
  fill(255);
  var percent = 100 * (count / totalPermutations);
  text(nf(percent,0,2) + "% completed", 20, height-50);
  
  nextOrder();
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;

}

function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < order.length-1; i++) {
    var cityA = points[order[i]];
    var cityB = points[order[i+1]];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum +=d;

  }
  return sum;


}

function nextOrder() {

  // STEP 1 of the algorithm
  // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
  var largestI = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    console.log('finished');
  }

  // STEP 2
  var largestJ = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  // STEP 3
  swap(order, largestI, largestJ);

  // STEP 4: reverse from largestI + 1 to the end
  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
  count ++;

}

function sFact(num)
{
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}