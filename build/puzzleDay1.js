"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var imports_1 = require("./imports");
var Puzzle1 = /** @class */ (function () {
    function Puzzle1() {
    }
    Puzzle1.partOne = function () {
        var previousLine = 0;
        var increases = 0;
        var lines = imports_1.fs.readFileSync('./input/day1.txt', 'utf8').split('\n').forEach(function (line, index) {
            if (index === 0) {
                previousLine = parseInt(line);
                return;
            }
            if (parseInt(line) > previousLine)
                increases++;
            previousLine = parseInt(line);
        });
        return increases;
    };
    Puzzle1.partTwo = function () {
        function sumAllElementsArray(array) {
            return array.length === 0 ? 0 : array.reduce(function (a, b) { return a + b; });
        }
        //read lines and save them as numbers:
        var l = [];
        imports_1.fs.readFileSync('./input/day1.txt', 'utf8').split('\n').forEach(function (line, index) { return l.push(parseInt(line)); });
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
    };
    return Puzzle1;
}());
console.log(Puzzle1.partOne());
console.log(Puzzle1.partTwo());
