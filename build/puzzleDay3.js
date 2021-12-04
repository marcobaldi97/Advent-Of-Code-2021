"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var imports_1 = require("./imports");
var Puzzle3 = /** @class */ (function () {
    function Puzzle3() {
    }
    //function that given a string representing a binary, returns same string but with the last bit with the character passed as parameter
    Puzzle3.changeLastBit = function (binary, bit) {
        return binary.substring(0, binary.length - 1) + bit;
    };
    //function that given a string representing a binary, returns the complement
    Puzzle3.getComplement = function (binary) {
        var complement = "";
        for (var i = 0; i < binary.length; i++) {
            if (binary[i] == "0") {
                complement += "1";
            }
            else {
                complement += "0";
            }
        }
        return complement;
    };
    //function that given a string representing a binary, returns the most common bit
    Puzzle3.getMostCommonBit = function (binary) {
        var bitCounts = {};
        for (var i = 0; i < binary.length; i++) {
            var bit = binary[i];
            if (bitCounts[bit]) {
                bitCounts[bit]++;
            }
            else {
                bitCounts[bit] = 1;
            }
        }
        var max = 0;
        var maxBit = "";
        for (var bit in bitCounts) {
            if (bitCounts[bit] > max) {
                max = bitCounts[bit];
                maxBit = bit;
            }
        }
        return maxBit;
    };
    Puzzle3.binaryToDecimal = function (binary) {
        var decimal = 0;
        for (var i = 0; i < binary.length; i++) {
            var bit = binary[i];
            if (bit == "1") {
                decimal += Math.pow(2, binary.length - i - 1);
            }
        }
        return decimal;
    };
    //decimal to binary
    Puzzle3.decimalToBinary = function (decimal) {
        var binary = "";
        while (decimal > 0) {
            binary = (decimal % 2) + binary;
            decimal = Math.floor(decimal / 2);
        }
        return binary;
    };
    Puzzle3.partOne = function (vector) {
        var readings = vector !== null && vector !== void 0 ? vector : imports_1.fs.readFileSync('./input/day3.txt', 'utf8').split("\r\n");
        var readingLength = readings[0].length;
        var bitPerPositions = new Array(readingLength).fill('');
        readings.forEach(function (reading) {
            for (var i = 0; i < readingLength; i++) {
                bitPerPositions[i] += reading[i];
            }
        });
        var gamma = "";
        var epsilon = "";
        bitPerPositions.forEach(function (bitPerPosition) {
            var getMostCommonBit = Puzzle3.getMostCommonBit(bitPerPosition);
            if (getMostCommonBit === "1") {
                gamma += "1";
                epsilon += "0";
            }
            else {
                gamma += "0";
                epsilon += "1";
            }
        });
        return { common: gamma, opposite: epsilon };
    };
    Puzzle3.partTwo = function () {
        var _a, _b;
        var readings = imports_1.fs.readFileSync('./input/day3.txt', 'utf8').split("\r\n");
        var oxyRating = 0;
        var co2Rating = 0;
        var posibleNumbers = readings;
        var _c = Puzzle3.partOne(readings), common = _c.common, opposite = _c.opposite;
        function recursiveSearch(posibleSolutions, getMostCommonBit, position, bitWanted) {
            if (posibleSolutions.length === 2) {
                var valToReturn = posibleSolutions[0].charAt(position) === bitWanted ? posibleSolutions[0] : posibleSolutions[1];
                console.log(posibleSolutions[0] + " " + posibleSolutions[1]);
                console.log("valToReturn: " + valToReturn);
                return valToReturn;
            }
            else {
                posibleSolutions = posibleSolutions.filter(function (posibleSolution) {
                    return posibleSolution.charAt(position) === getMostCommonBit;
                });
                return recursiveSearch(posibleSolutions, bitWanted === "1" ? Puzzle3.partOne(posibleSolutions).common.charAt(position + 1) : Puzzle3.partOne(posibleSolutions).opposite.charAt(position + 1), position + 1, bitWanted);
            }
        }
        oxyRating = this.binaryToDecimal((_a = recursiveSearch(posibleNumbers, common.charAt(0), 0, "1")) !== null && _a !== void 0 ? _a : "0");
        co2Rating = this.binaryToDecimal((_b = recursiveSearch(posibleNumbers, opposite.charAt(0), 0, "0")) !== null && _b !== void 0 ? _b : "0");
        console.log("Oxygen rating: " + oxyRating);
        console.log("Co2 rating: " + co2Rating);
        return oxyRating * co2Rating;
    };
    return Puzzle3;
}());
var _a = Puzzle3.partOne(), common = _a.common, opposite = _a.opposite;
//console.log(this.numberToBinary(this.binaryToDecimal(common)) * this.numberToBinary(this.binaryToDecimal(opposite)));
console.log("///////////////////////////////////////");
console.log(Puzzle3.partTwo());
//984567, 983796, 790275
