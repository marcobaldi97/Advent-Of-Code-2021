var fs = require('fs');
function partOne() {
    var previousLine = 0;
    var increases = 0;
    var lines = fs.readFileSync('./input/day1.txt', 'utf8').split('\n').forEach(function (line, index) {
        if (index === 0) {
            previousLine = parseInt(line);
            return;
        }
        if (parseInt(line) > previousLine)
            increases++;
        previousLine = parseInt(line);
    });
    return increases;
}
function partTwo() {
    function sumAllElementsArray(array) {
        return array.length === 0 ? 0 : array.reduce(function (a, b) { return a + b; });
    }
    //read lines and save them as numbers:
    var l = [];
    fs.readFileSync('./input/day1.txt', 'utf8').split('\n').forEach(function (line, index) { return l.push(parseInt(line)); });
    var sums = [l[0] + l[1] + l[2]];
    for (var i = 3; i < l.length; i++) {
        sums.push(l[i] + l[i - 1] + l[i - 2]);
    }
    var increases = 0;
    var previousVal = sums[0];
    sums.forEach(function (sum, index) {
        if (index !== 0 && sum > previousVal)
            increases++;
        previousVal = sum;
    });
    return increases;
}
console.log(partOne());
console.log(partTwo());
