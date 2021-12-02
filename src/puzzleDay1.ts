import { fs } from "./imports";

class Puzzle1 {
    static partOne() {
        let previousLine: number = 0;
        let increases: number = 0;
        const lines = fs.readFileSync('./input/day1.txt', 'utf8').split('\n').forEach((line: string, index: number) => {
            if (index === 0) {
                previousLine = parseInt(line);
                return;
            }

            if (parseInt(line) > previousLine) increases++;

            previousLine = parseInt(line);
        });

        return increases;
    }

    static partTwo() {
        function sumAllElementsArray(array: number[]) {
            return array.length === 0 ? 0 : array.reduce((a, b) => a + b);
        }

        //read lines and save them as numbers:
        const l: number[] = [];
        fs.readFileSync('./input/day1.txt', 'utf8').split('\n').forEach((line: string, index: number) => l.push(parseInt(line)));

        const sums = [l[0] + l[1] + l[2]];

        for (let i = 3; i < l.length; i++) {
            sums.push(l[i] + l[i - 1] + l[i - 2]);
        }

        let increases = 0;

        let previousVal = sums[0];
        sums.forEach((sum: number, index: number) => {
            if (index !== 0 && sum > previousVal) increases++;

            previousVal = sum;
        });

        return increases;
    }
}

console.log(Puzzle1.partOne());

console.log(Puzzle1.partTwo());

