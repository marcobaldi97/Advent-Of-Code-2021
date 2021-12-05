"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var imports_1 = require("./imports");
var Puzzle4 = /** @class */ (function () {
    function Puzzle4() {
    }
    //given a matrix, returns an array of all the values.
    Puzzle4.getValues = function (matrix) {
        var values = [];
        matrix.forEach(function (row) {
            row.forEach(function (value) {
                values.push(value);
            });
        });
        return values;
    };
    //function that given a matrix, returns the transposed matrix
    Puzzle4.transpose = function (matrix) {
        return matrix[0].map(function (col, i) { return matrix.map(function (row) { return row[i]; }); });
    };
    Puzzle4.processTable = function (table) {
        var tableToReturn = new Array(table.length);
        table.forEach(function (row, i) {
            tableToReturn[i] = row.split(/\s+/).filter(function (x) { return x !== ""; });
        });
        return tableToReturn;
    };
    //given a table and numbers, check wheter the numbers complete a row or a column and return all the numbers that are not in said row or column
    Puzzle4.checkRowOrColumn = function (table, numbers) {
        if (numbers < table[0])
            return [];
        var winnerValues = [];
        function verifyRows(table, numbers) {
            var winnerRow = -1;
            table.forEach(function (row, rowNumber) {
                if (row.every(function (number) { return numbers.includes(number); })) {
                    winnerRow = rowNumber;
                }
            });
            if (winnerRow !== -1) {
                winnerValues = Puzzle4.getValues(table).filter(function (number) { return !numbers.includes(number); });
                winnerValues = imports_1._.uniq(winnerValues);
                return winnerValues;
            }
            else
                return [];
        }
        winnerValues.push.apply(winnerValues, verifyRows(table, numbers));
        if (winnerValues.length === 0) {
            var transposedTable = Puzzle4.transpose(table);
            winnerValues.push.apply(winnerValues, verifyRows(transposedTable, numbers));
        }
        return winnerValues;
    };
    Puzzle4.partOne = function () {
        var _a, _b;
        var log = console.log;
        var lines = imports_1.fs.readFileSync("./input/day4.txt", "utf8").split("\r\n");
        var bingoNumbers = (_a = lines.shift()) === null || _a === void 0 ? void 0 : _a.split(",");
        lines.shift();
        var tablesPreRefined = [[]];
        var i = 0;
        lines.forEach(function (line) {
            if (line === "") {
                i++;
                tablesPreRefined.push([]);
                return;
            }
            tablesPreRefined[i].push(line);
        });
        var tables = [];
        tablesPreRefined.forEach(function (table) {
            tables.push(Puzzle4.processTable(table));
        });
        var lineLength = tables[0][0].length;
        var winningTables = [];
        for (var tableNumber = 0; tableNumber < tables.length; tableNumber++) {
            var aux = imports_1._.clone(bingoNumbers);
            var table = tables[tableNumber];
            var toProcessNumbers = [(_b = bingoNumbers === null || bingoNumbers === void 0 ? void 0 : bingoNumbers.shift()) !== null && _b !== void 0 ? _b : "0"];
            var iterations = 0;
            var currentNumber = toProcessNumbers === null || toProcessNumbers === void 0 ? void 0 : toProcessNumbers[toProcessNumbers.length - 1];
            for (var i_1 = 0; i_1 < bingoNumbers.length; i_1++, iterations++) {
                var winnerValues = Puzzle4.checkRowOrColumn(table, toProcessNumbers);
                if (winnerValues.length > 0) {
                    var value = imports_1._.sum(winnerValues.map(function (val) { return parseInt(val); })) * parseInt(currentNumber !== null && currentNumber !== void 0 ? currentNumber : "0");
                    winningTables.push({ difference: imports_1._.difference(table, toProcessNumbers), winningNumbers: toProcessNumbers, table: table, value: value, iteration: iterations });
                    break;
                }
                else {
                    toProcessNumbers.push(bingoNumbers === null || bingoNumbers === void 0 ? void 0 : bingoNumbers.shift());
                    currentNumber = toProcessNumbers === null || toProcessNumbers === void 0 ? void 0 : toProcessNumbers[toProcessNumbers.length - 1];
                }
            }
            bingoNumbers = aux;
        }
        var min = 9999;
        var minIndex = 9999;
        for (var index = 0; index < winningTables.length; index++) {
            var element = winningTables[index];
            if (element.iteration < min) {
                min = element.iteration;
                minIndex = index;
            }
        }
        return winningTables[minIndex];
    };
    Puzzle4.partTwo = function () {
        return 0;
    };
    return Puzzle4;
}());
console.log("////////////////////////");
console.dir(Puzzle4.partOne());
console.log(Puzzle4.partTwo());
//25083
