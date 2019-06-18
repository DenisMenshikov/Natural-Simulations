var Bubble = function() {
    this.position = new PVector(random(0,width), (height+random(100,200)));
    this.bubSize = random(0,20);
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
draw = function() {

    background(58, 60, 128);
    for(var i = 0; i < bubbles.length; i++){
        bubbles[i].update();
        bubbles[i].checkEdges();
        bubbles[i].display(); 
    }
};
