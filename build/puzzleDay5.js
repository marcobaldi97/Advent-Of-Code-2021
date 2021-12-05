"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var imports_1 = require("./imports");
var Puzzle5 = /** @class */ (function () {
    function Puzzle5() {
    }
    Puzzle5.getSquaredMatrix = function (maxLengthTable, filler) {
        if (filler === void 0) { filler = 0; }
        var matrix = new Array(maxLengthTable);
        for (var i = 0; i < maxLengthTable; i++) {
            matrix[i] = new Array(maxLengthTable);
            for (var j = 0; j < maxLengthTable; j++) {
                matrix[i][j] = filler;
            }
        }
        return matrix;
    };
    Puzzle5.partOne = function () {
        var maxLengthTable = 1000;
        var paths = imports_1.fs.readFileSync('./input/day5Ex.txt', 'utf8').split('\r\n');
        var ground = Puzzle5.getSquaredMatrix(maxLengthTable);
        paths.forEach(function (path) {
            var numbers = path.split(/,| -> /);
            var x1 = parseInt(numbers[0]);
            var y1 = parseInt(numbers[1]);
            var x2 = parseInt(numbers[2]);
            var y2 = parseInt(numbers[3]);
            if (x1 === x2 || y1 === y2) {
                var initx = x1;
                var endx = x2;
                if (x1 > x2) {
                    initx = x2;
                    endx = x1;
                }
                for (var i = initx; i <= endx; i++) {
                    var inity = y1;
                    var endy = y2;
                    if (y1 > y2) {
                        inity = y2;
                        endy = y1;
                    }
                    for (var j = inity; j <= endy; j++) {
                        ground[j][i] += 1;
                    }
                }
            }
        });
        var result = 0;
        ground.forEach(function (row) {
            row.forEach(function (value) {
                if (value > 1) {
                    result += 1;
                }
            });
        });
        return result;
    };
    Puzzle5.partTwo = function (test) {
        if (test === void 0) { test = false; }
        var maxLengthTable = test ? 10 : 1000;
        var paths = imports_1.fs.readFileSync("./input/day5" + (test ? "Ex" : "") + ".txt", 'utf8').split('\r\n');
        var ground = Puzzle5.getSquaredMatrix(maxLengthTable);
        paths.forEach(function (path) {
            var numbers = path.split(/,| -> /);
            var x1 = parseInt(numbers[0]);
            var y1 = parseInt(numbers[1]);
            var x2 = parseInt(numbers[2]);
            var y2 = parseInt(numbers[3]);
            if (x1 === x2 || y1 === y2) {
                var initx = x1;
                var endx = x2;
                if (x1 > x2) {
                    initx = x2;
                    endx = x1;
                }
                for (var i = initx; i <= endx; i++) {
                    var inity = y1;
                    var endy = y2;
                    if (y1 > y2) {
                        inity = y2;
                        endy = y1;
                    }
                    for (var j = inity; j <= endy; j++) {
                        ground[j][i] += 1;
                    }
                }
            }
            else {
                if (x1 <= x2) {
                    if (y1 <= y2) {
                        while (x1 <= x2 && y1 <= y2) {
                            ground[y1][x1] += 1;
                            x1++;
                            y1++;
                        }
                    }
                    else {
                        while (x1 <= x2 && y1 >= y2) {
                            ground[y1][x1] += 1;
                            x1++;
                            y1--;
                        }
                    }
                }
                else {
                    if (y1 <= y2) {
                        while (x1 >= x2 && y1 <= y2) {
                            ground[y1][x1] += 1;
                            x1--;
                            y1++;
                        }
                    }
                    else {
                        while (x1 >= x2 && y1 >= y2) {
                            ground[y1][x1] += 1;
                            x1--;
                            y1--;
                        }
                    }
                }
            }
        });
        var result = 0;
        ground.forEach(function (row) {
            row.forEach(function (value) {
                if (value > 1) {
                    result += 1;
                }
            });
        });
        test && console.table(ground);
        return result;
    };
    return Puzzle5;
}());
console.log("//////////////////////////////");
//console.log(Puzzle5.partOne());
console.log(Puzzle5.partTwo());
console.log(Puzzle5.partTwo(true));
