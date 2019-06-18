angleMode = "radians";

var Ship = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(0, -1);
    this.acceleration = new PVector(0, 0);
    this.topspeed = 10;
    //this.xoff = 1000;
    //this.yoff = 0;
    //this.r = 16;
};

Ship.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

Ship.prototype.applyForce = function(force) {
    this.acceleration.add(force);
};

Ship.prototype.turnLeft = function() {
    var left = PVector.get(this.velocity);
    left.rotate(-PI/2);
    this.applyForce(left);
};

Ship.prototype.turnRight = function() {
    var right = PVector.get(this.velocity);
    right.rotate(PI/2);
    this.applyForce(right);
};

Ship.prototype.speedUp = function(){
    var force = this.velocity.get();
    force.normalize();
    force.mult(2);
    this.applyForce(force);
};

Ship.prototype.display = function () {
    // Step 3:
    var angle = this.velocity.heading()+1.55;
    
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(127, 127, 127);
    pushMatrix();
    translate(this.position.x, this.position.y);
    // Step 3:
    rotate(angle);
    //thrusters
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(94, 8, 8);
    ellipse(-5, 0, 7, 10);
    ellipse(5, 0, 7, 10);
    //ship body
    fill(128, 120, 120);
    stroke(0, 0, 0);
    strokeWeight(3);
    triangle(0, -20, 10, 0, -10, 0);
    popMatrix();
};

Ship.prototype.checkEdges = function () {
    if (this.position.x > width) {
        this.position.x = 0;
    } else if (this.position.x < 0) {
        this.position.x = width;
    }
    
    if (this.position.y > height) {
        this.position.y = 0;
    } else if (this.position.y < 0) {
        this.position.y = height;
    }
};
/***********STARS*************/
var Star = function(x,y, mass)
{
    this.position = new PVector (x,y);
    this.mass = mass;
};
Star.prototype.display = function(){
    fill(255, 255, 255);
    noStroke();
    ellipse(this.position.x, this.position.y, this.mass, this.mass);
};
/******DECLARING*********/
var stars = [];
for(var i = 0; i < 30; i++){
    stars[i] = new Star(random(width), random(height), random(5,10));
}
var ship = new Ship();
keyPressed = function(){
    if (keyCode === LEFT){
        ship.turnLeft();
    }
    else if (keyCode === RIGHT){
        ship.turnRight();
    }
    else if (keyCode === 90)
    {
        ship.speedUp();
    }
};
/******MAIN*********/
draw = function() {
    background(12, 16, 66);
    for(var i = 0; i < stars.length; i++)
    {
        stars[i].display();
    }
    ship.update();
    ship.checkEdges();
    ship.display();
};
