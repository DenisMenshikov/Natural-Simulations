angleMode = "radians";
/***********BLACK HOLE****************/
var Hole = function(){
    this.position = new PVector(width/2, height/2);
    this.mass = 10;
};

Hole.prototype.display = function(){
    fill(255, 119, 0);
    ellipse(this.position.x, this.position.y, 100, 100);
    noStroke();
    fill(0, 0, 0);
    ellipse(this.position.x, this.position.y, 90, 90);
    
};

//defining the properties of the ladybug
var Bug = function() {
    this.a = 0;
    this.angVelocity = 0;
    this.angle = new PVector();
    this.velocity = new PVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amplitude = new PVector(random(20, width/2), random(20, width/2));
    this.position = new PVector(0, 0);
};

//oscillating the ladybugs
Bug.prototype.oscillate = function() {
    this.angle.add(this.velocity);
    this.position.set(
                sin(this.angle.x) * this.amplitude.x,
                sin(this.angle.y) * this.amplitude.y);
    var distance = this.position.mag();
    this.angVelocity += distance / 1000000;
    this.angVelocity = constrain(this.angVelocity, 0, 0.1);
    this.a += this.angVelocity;
};

//displaying the ladybugs
Bug.prototype.display = function() {
    pushMatrix();
    translate(width/2, height/2);
    stroke(20, 1, 1);
    strokeWeight(4);
    imageMode(CENTER);
    translate(this.position.x, this.position.y);
    rotate(this.a);
    //thrusters
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(94, 8, 8);
    ellipse(-10, 0, 14, 20);
    ellipse(10, 0, 14, 20);
    //ship body
    fill(128, 120, 120);
    stroke(0, 0, 0);
    strokeWeight(3);
    triangle(0, -40, 20, 0, -20, 0);
    popMatrix();
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
var hole = new Hole();

var bug = [];
for (var i = 0; i < 2; i++) {
    bug[i] = new Bug(random(0.1, 2), random(width), random(height));
}

draw = function() {
    background(12, 16, 66);
    
    for(var i = 0; i < stars.length; i++)
    {
        stars[i].display();
    }
    hole.display();
    for (var i = 0; i < bug.length; i++){
        bug[i].display();
        bug[i].oscillate();
    }
};
