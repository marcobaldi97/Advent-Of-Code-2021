"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var imports_1 = require("./imports");
var Puzzle2 = /** @class */ (function () {
    function Puzzle2() {
    }
    Puzzle2.partOne = function () {
        var horizontal = 0;
        var depth = 0;
        var intructions = imports_1.fs.readFileSync('./input/day2.txt', 'utf8').split("\n");
        intructions.forEach(function (instruction) {
            var instructionSplit = instruction.split(" ");
            var direction = instructionSplit[0];
            var amount = Number(instructionSplit[1]);
            switch (direction) {
                case "forward":
                    horizontal += amount;
                    break;
                case "up":
                    depth -= amount;
                    break;
                case "down":
                    depth += amount;
                    break;
                default:
                    break;
            }
        });
        return horizontal * depth;
    };
    Puzzle2.partTwo = function () {
        var horizontal = 0;
        var depth = 0;
        var aim = 0;
        var intructions = imports_1.fs.readFileSync('./input/day2.txt', 'utf8').split("\n");
        intructions.forEach(function (instruction) {
            var instructionSplit = instruction.split(" ");
            var direction = instructionSplit[0];
            var amount = Number(instructionSplit[1]);
            switch (direction) {
                case "forward":
                    horizontal += amount;
                    depth += (aim * amount);
                    break;
                case "up":
                    aim -= amount;
                    break;
                case "down":
                    aim += amount;
                    break;
                default:
                    break;
            }
        });
        return horizontal * depth;
    };
    return Puzzle2;
}());
console.log(Puzzle2.partOne());
console.log(Puzzle2.partTwo());
