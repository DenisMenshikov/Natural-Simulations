var drawRange1 = function() {
    var incAmount = 0.01;
    for (var i = 0; i < incAmount*width; i += incAmount) {
        var n = noise(i);
        var y = map(n, 0, 1, 0, height/2.5);
        strokeWeight(0.6);
        fill(204, 6, 6);
        rect(i*100, height-y, 26, y);
    }
};
var drawRange2 = function() {
    var incAmount = 0.01;
    for (var i = 0; i < incAmount*width; i += incAmount) {
        var n = noise(i);
        var y = map(n, 0, 1, 0, height/1.5);
        strokeWeight(0.6);
        fill(128, 5, 5);
        rect(i*100+60, height-y, -60, y);
    }
};
var drawRange3 = function() {
    var incAmount = 0.01;
    for (var i = 0; i < incAmount*width; i += incAmount) {
        var n = noise(i);
        var y = map(n, 0, 1, 0, height);
        strokeWeight(0.7);
        fill(66, 0, 0);
        rect(i*100, height-y, 89, y);
    }
};
var drawCloud = function() {
    var xOff = 0;
    for (var x = 0; x < width; x+= 2) {
        var yOff = 0.0;
        for (var y = 0; y < 180; y+=2) {
            var bright = map(noise(xOff, yOff), 0, 1, -200, 283);
            stroke(255, 255, 255, bright);
            point(x, y);
            
            yOff += 0.1;
        }
        xOff += 0.01;
    }

};
background(23, 8, 94);
fill(255, 255, 255);
for (var i = 0; i < 40; i++) {
    noStroke();
    ellipse(random(0,400), random(0, 300), random(1,3), random(0,5));
}

fill(0, 0, 0);
quad(162, 37, 119, 13, 159, 42, 205, 28);
quad(162+66, 37+50, 119+50, 13+60, 159+72, 42+51, 205+50, 28+35);
quad(162+142, 37+15, 119+139, 13+29, 159+144, 42+17, 205+151, 28+4);
drawCloud();
stroke(0, 0, 0);
var draw = function() {

    drawRange3();
    drawRange2();
    drawRange1();
};
