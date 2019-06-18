/************BUBBLE****************/
var Bubble = function() {
    this.position = new PVector(random(0,width), (height+random(20,250)));
    this.bubSize = random(5,20);
    this.velocity = new PVector(0,0);
    this.acceleration = new PVector(0, 0);
};
Bubble.prototype.update = function() {
    this.velocity.set(random(-1,1), random(0,-1));
    this.acceleration.set(random(-1,1), -1/(this.bubSize/10));
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
};
Bubble.prototype.display = function() {
    strokeWeight(0.7);
    fill(161, 196, 237);
    ellipse(this.position.x,this.position.y, this.bubSize, this.bubSize);
};
Bubble.prototype.checkEdges = function() {
    if(this.position.y < this.bubSize-20){
        this.position.set(random(0,400), height);
    }
};
var bubbles = [];
for(var i = 0; i < 20; i++){
    bubbles.push(new Bubble());
}
/************FOOD****************/
var Food = function() {
    this.position = new PVector(random(width), -1);
    this.foodSize = random(5,20);
    this.G = 1;
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};
Food.prototype.calculateAttraction = function(fish) {
    var force = PVector.sub(this.position, fish.position);
    var distance = force.mag();
    distance = constrain(distance, 25, 10);
    force.normalize();
    var strength = (this.G * this.foodSize * fish.fishSize) / (distance*distance);
    force.mult(strength);
    return force;
};
Food.prototype.update = function() {
    this.velocity.set(random(-1,1), random(0,-1));
    this.acceleration.set(random(-1,1), -1/(this.foodSize/10));
    this.velocity.add(this.acceleration);
    this.position.sub(this.velocity);
};
Food.prototype.display = function() {
    strokeWeight(0.7);
    fill(242, 161, 9);
    ellipse(this.position.x,this.position.y, this.foodSize, this.foodSize);
};
Food.prototype.checkEdges = function() {
    if(this.position.y > height){
        this.position.set(random(0,400), 0);
    }
};
/*************FISH****************/
var Fish = function(){
    this.position = new PVector(random(0,width), random(100,200));
    this.fishSize = random(5,20);
    this.velocity = new PVector(1,0);
    this.acceleration = new PVector(0, 0);
};
Fish.prototype.applyForce = function(force)
{
    var f = PVector.div(force, this.fishSize);
    this.acceleration.add(f);
};
Fish.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};
Fish.prototype.display = function() {
  noStroke();
  fill(this.position.x, this.position.y, this.velocity*10);
  ellipse(this.position.x, this.position.y, 30, 30);
  //eye
  fill(153, 64, 64);
  ellipse(this.position.x +6, this.position.y-1, 7, 7);
  //mouth
  line(this.position.x, this.position.y+4, this.position.x +10, this.position.y +5);
  //tail
  triangle(this.position.x -20,this.position.y + 20,this.position.x -7,this.position.y + 3,this.position.x - 20,this.position.y + 2);
};
/*Fish.prototype.checkEdges = function() {
    if(this.position.y > height){
        this.position.set(random(0,400), 0);
    }
};*/
var fishes = [];
for(var i = 0; i < 3; i++){
    fishes.push(new Fish());
}
/************PARTICLES************/
var Particle = function(position){
    this.acceleration = new PVector(0, 0);
    this.velocity = new PVector(random(-10, 1), random(-1, 1));
    this.position = position.get();
    this.timeToLive = 250;
};

Particle.prototype.run = function() {
    this.update();
    this.display();
};

Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.timeToLive -= 3;
};

Particle.prototype.display = function() {
    noStroke();
    fill(156, 237, 255, this.timeToLive);
    ellipse(this.position.x, this.position.y, 12, 12);
};

Particle.prototype.isDead = function() {
    if (this.timeToLive < 0) {
        return true;
    } else {
        return false;
    }
};

var WaterCurrent = function(position){
    Particle.call(this, position);
};

WaterCurrent.prototype = Object.create(Particle.prototype);
WaterCurrent.constructor = WaterCurrent;

WaterCurrent.prototype.display = function(){
    noStroke();
    fill(82, 85, 168);
    ellipse(this.position.x, this.position.y, 10, 5);
};
var ParticleSystem = function(position) {
    this.origin = position.get();
    this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new WaterCurrent(this.origin));
};

ParticleSystem.prototype.run = function() 
{
    for (var i = this.particles.length-1; i >= 0; i--)
    {
        for (var i = this.particles.length-1; i >= 0; i--)
        {
            var p = this.particles[i];
            p.run();
            if (p.isDead()) 
            {
                this.particles.splice(i, 1);
            }
        }   
    }
};
var particleSystem  = [];
var pos = 50;
for (var i = 0; i < 4; i++){
        particleSystem.push(new ParticleSystem (new PVector(width+50, pos)));
        pos = pos+100;
    }
/************DRAW****************/
var food = new Food();
draw = function() {
    background(58, 60, 128);
    
    for (var i = 0; i < particleSystem.length; i++){
        particleSystem[i].addParticle();
        particleSystem[i].run();
    }
    food.update();
    food.checkEdges();
    food.display(); 
    for(var i = 0; i < bubbles.length; i++){
        bubbles[i].update();
        bubbles[i].checkEdges();
        bubbles[i].display(); 
    }
    for(var i = 0; i < fishes.length; i++){
        var force = food.calculateAttraction(fishes[i]);
        fishes[i].applyForce(force);
        fishes[i].update();
        //fishes[i].checkEdges();
        fishes[i].display(); 
    }
};
