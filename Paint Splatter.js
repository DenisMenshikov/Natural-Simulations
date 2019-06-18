var generator = new Random(1);
var generator1 = new Random(2);
var generator2 = new Random(3);
var generator3 = new Random(4);
var generator4 = new Random(4);
 
var draw = function() {
    var num = generator.nextGaussian();
    var num2 = generator1.nextGaussian();
        var num3 = generator2.nextGaussian();
    var num4 = generator3.nextGaussian();
        var num5 = generator4.nextGaussian();
 
    var standardDeviation = 60;
    var mean = 200;
    var mean1 = 200;
    var x = standardDeviation * num + mean;
    var y = standardDeviation * num2 + mean1;
    noStroke();
    fill(standardDeviation * num3 * mean1, standardDeviation * num4 + mean1, standardDeviation * num5 * mean1);
    ellipse(x, y, 16, 16);
};
