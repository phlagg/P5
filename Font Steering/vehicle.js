
function Vehicle(x,y) {
    this.pos = createVector(random(width),random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.target = createVector(x,y);
    this.r = 8;
    this.maxSpeed = 19;
    this.maxForce = 1

}

Vehicle.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

Vehicle.prototype.show = function() {
    stroke(255);
    strokeWeight(8);
    point(this.pos.x, this.pos.y);
    // rect(this.pos.x, this.pos.y,0.5,0.5);
    // ellipse(this.pos.x, this.pos.y,15,0.5);
    
   
    
    
    }

Vehicle.prototype.behaviours = function() {
    var arrive = this.arrive(this.target);
    arrive.mult(1.5);
    this.applyForce(arrive);

    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);
    flee.mult(20);
    this.applyForce(flee);

}

Vehicle.prototype.applyForce = function(f) {
    this.acc.add(f);

} 

Vehicle.prototype.flee = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if ( d< 50) {
    
    desired.setMag(this.maxSpeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    
    return steer;
    } else {
        return createVector(0,0);
    }
  } 

Vehicle.prototype.arrive = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxSpeed;
    if( d< 100) {
        var speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
} 