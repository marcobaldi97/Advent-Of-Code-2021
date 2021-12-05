import { fs, _ } from "./imports";

class Puzzle4 {
    //given a matrix, returns an array of all the values.
    static getValues(matrix: string[][]): string[] {
        const values: string[] = [];
        matrix.forEach(row => {
            row.forEach(value => {
                values.push(value);
            });
        });

        return values;
    }

    //function that given a matrix, returns the transposed matrix
    static transpose(matrix: string[][]): string[][] { //Ok
        return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }

    static processTable(table: string[]): string[] {
        const tableToReturn = new Array(table.length);

        table.forEach((row, i) => {
            tableToReturn[i] = row.split(/\s+/).filter(x => x !== "");
        });

        return tableToReturn;
    }

    //given a table and numbers, check wheter the numbers complete a row or a column and return all the numbers that are not in said row or column
    static checkRowOrColumn(table: any, numbers: string[]): string[] {
        const { getValues, transpose } = Puzzle4;

        if (numbers < table[0]) return [];

        let winnerValues: string[] = [];

        function verifyRows(table: string[][], numbers: string[]): string[] {
            let winnerRow = -1;
            table.forEach((row, rowNumber) => {
                if (row.every(number => numbers.includes(number))) {
                    winnerRow = rowNumber;
                }
            });

            if (winnerRow !== -1) {
                winnerValues = Puzzle4.getValues(table).filter(number => !numbers.includes(number));

                winnerValues = _.uniq(winnerValues);

                return winnerValues
            } else return [];
        }

        if (verifyRows(table, numbers).length > 0 || verifyRows(transpose(table), numbers).length > 0) {//bingo!
            const values = getValues(table);

            winnerValues = _.uniq(_.difference(values, numbers));
        }

        return winnerValues;
    }

    static partOne() {
        const { log } = console;
        const lines: string[] = fs.readFileSync("./input/day4.txt", "utf8").split("\r\n");
        let bingoNumbers = lines.shift()?.split(",");

        lines.shift();

        const tablesPreRefined: string[][] = [[]];

        let i = 0;
        lines.forEach(line => {
            if (line === "") {
                i++;
                tablesPreRefined.push([]);
                return;
            }

            tablesPreRefined[i].push(line);
        });

        const tables: string[][] = [];

        tablesPreRefined.forEach(table => {
            tables.push(Puzzle4.processTable(table));
        });

        const winningTables: { winningNumbers: string[], table: string[], value: number, iteration: number }[] = [];


        for (let tableNumber = 0; tableNumber < tables.length; tableNumber++) {
            const aux = _.clone(bingoNumbers);

            const table = tables[tableNumber];

            const toProcessNumbers = [bingoNumbers?.shift() ?? "0"];

            let iterations = 0;
            let currentNumber = toProcessNumbers?.[toProcessNumbers.length - 1];
            for (let i = 0; i < bingoNumbers!.length; i++, iterations++) {
                const winnerValues = Puzzle4.checkRowOrColumn(table, toProcessNumbers!);

                if (winnerValues.length > 0) {
                    const value = _.sum(winnerValues.map((val) => { return parseInt(val) })) * parseInt(currentNumber ?? "0");

                    winningTables.push({ winningNumbers: toProcessNumbers, table: table, value: value, iteration: iterations });

                    break;
                } else {
                    toProcessNumbers!.push(bingoNumbers?.shift()!);
                    currentNumber = toProcessNumbers?.[toProcessNumbers.length - 1];
                }
            }

            bingoNumbers = aux;
        }
        let min = 9999;
        let minIndex = 9999;

        for (let index = 0; index < winningTables.length; index++) {
            const element = winningTables[index];

            if (element.iteration < min) {
                min = element.iteration;
                minIndex = index;
            }
        }

        return winningTables[minIndex];
    }

    static partTwo() {
        return 0;
    }
}

console.log("////////////////////////");

console.dir(Puzzle4.partOne());

console.log(Puzzle4.partTwo());

//25083