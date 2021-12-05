import { fs } from "./imports"

class Puzzle5 {
    static getSquaredMatrix(maxLengthTable: number, filler = 0): number[][] {
        let matrix = new Array(maxLengthTable);
        for (let i = 0; i < maxLengthTable; i++) {
            matrix[i] = new Array(maxLengthTable);
            for (let j = 0; j < maxLengthTable; j++) {
                matrix[i][j] = filler;
            }
        }

        return matrix;
    }

    static partOne() {
        const maxLengthTable = 1000;

        const paths = fs.readFileSync('./input/day5Ex.txt', 'utf8').split('\r\n');

        const ground = Puzzle5.getSquaredMatrix(maxLengthTable);

        paths.forEach((path: string) => {
            let numbers = path.split(/,| -> /);

            const x1 = parseInt(numbers[0]);
            const y1 = parseInt(numbers[1]);
            const x2 = parseInt(numbers[2]);
            const y2 = parseInt(numbers[3]);

            if (x1 === x2 || y1 === y2) {
                let initx = x1;
                let endx = x2;
                if (x1 > x2) {
                    initx = x2;
                    endx = x1;
                }
                for (let i = initx; i <= endx; i++) {
                    let inity = y1;
                    let endy = y2;
                    if (y1 > y2) {
                        inity = y2;
                        endy = y1;
                    }
                    for (let j = inity; j <= endy; j++) {
                        ground[j][i] += 1;
                    }
                }
            }

        });

        let result = 0;
        ground.forEach((row: number[]) => {
            row.forEach((value: number) => {
                if (value > 1) {
                    result += 1;
                }
            });
        });

        return result;

    }

    static partTwo(test: boolean = false) {
        const maxLengthTable = test ? 10 : 1000;

        const paths = fs.readFileSync(`./input/day5${test ? "Ex" : ""}.txt`, 'utf8').split('\r\n');

        const ground = Puzzle5.getSquaredMatrix(maxLengthTable);

        paths.forEach((path: string) => {
            let numbers = path.split(/,| -> /);

            let x1 = parseInt(numbers[0]);
            let y1 = parseInt(numbers[1]);
            const x2 = parseInt(numbers[2]);
            const y2 = parseInt(numbers[3]);

            if (x1 === x2 || y1 === y2) {
                let initx = x1;
                let endx = x2;
                if (x1 > x2) {
                    initx = x2;
                    endx = x1;
                }
                for (let i = initx; i <= endx; i++) {
                    let inity = y1;
                    let endy = y2;
                    if (y1 > y2) {
                        inity = y2;
                        endy = y1;
                    }
                    for (let j = inity; j <= endy; j++) {
                        ground[j][i] += 1;
                    }
                }
            } else {
                if (x1 <= x2) {
                    if (y1 <= y2) {
                        while (x1 <= x2 && y1 <= y2) {
                            ground[y1][x1] += 1;
                            x1++;
                            y1++;
                        }
                    } else {
                        while (x1 <= x2 && y1 >= y2) {
                            ground[y1][x1] += 1;
                            x1++;
                            y1--;
                        }
                    }
                } else {
                    if (y1 <= y2) {
                        while (x1 >= x2 && y1 <= y2) {
                            ground[y1][x1] += 1;
                            x1--;
                            y1++;
                        }
                    } else {
                        while (x1 >= x2 && y1 >= y2) {
                            ground[y1][x1] += 1;
                            x1--;
                            y1--;
                        }
                    }
                }


            }

        });

        let result = 0;
        ground.forEach((row: number[]) => {
            row.forEach((value: number) => {
                if (value > 1) {
                    result += 1;
                }
            });
        });

        test && console.table(ground);

        return result;
    }
}

console.log("//////////////////////////////");
//console.log(Puzzle5.partOne());
console.log(Puzzle5.partTwo());
console.log(Puzzle5.partTwo(true));
