import { fs } from "./imports";

class Puzzle2 {
    static partOne() {
        let horizontal = 0;
        let depth = 0;

        const intructions = fs.readFileSync('./input/day2.txt', 'utf8').split("\n");

        intructions.forEach((instruction: string) => {
            const instructionSplit = instruction.split(" ");
            const direction = instructionSplit[0];
            const amount = Number(instructionSplit[1]);

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
    }

    static partTwo() {
        let horizontal = 0;
        let depth = 0;
        let aim = 0;

        const intructions = fs.readFileSync('./input/day2.txt', 'utf8').split("\n");

        intructions.forEach((instruction: string) => {
            const instructionSplit = instruction.split(" ");
            const direction = instructionSplit[0];
            const amount = Number(instructionSplit[1]);

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
    }
}

console.log(Puzzle2.partOne());

console.log(Puzzle2.partTwo());

