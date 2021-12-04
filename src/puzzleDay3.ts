import { fs } from "./imports";
import { _ } from "./imports";

class Puzzle3 {
    //function that given a string representing a binary, returns same string but with the last bit with the character passed as parameter
    static changeLastBit(binary: string, bit: string) {
        return binary.substring(0, binary.length - 1) + bit;
    }

    //function that given a string representing a binary, returns the complement
    static getComplement(binary: string) {
        let complement = "";
        for (let i = 0; i < binary.length; i++) {
            if (binary[i] == "0") {
                complement += "1";
            } else {
                complement += "0";
            }
        }
        return complement;
    }

    //function that given a string representing a binary, returns the most common bit
    static getMostCommonBit(binary: string) {
        let bitCounts: { [key: string]: number } = {};
        for (let i = 0; i < binary.length; i++) {
            let bit = binary[i];
            if (bitCounts[bit]) {
                bitCounts[bit]++;
            } else {
                bitCounts[bit] = 1;
            }
        }
        let max = 0;
        let maxBit = "";
        for (let bit in bitCounts) {
            if (bitCounts[bit] > max) {
                max = bitCounts[bit];
                maxBit = bit;
            }
        }
        return maxBit;
    }

    static binaryToDecimal(binary: string) {
        let decimal = 0;
        for (let i = 0; i < binary.length; i++) {
            let bit = binary[i];
            if (bit == "1") {
                decimal += Math.pow(2, binary.length - i - 1);
            }
        }
        return decimal;
    }

    //decimal to binary
    static decimalToBinary(decimal: number) {
        let binary = "";
        while (decimal > 0) {
            binary = (decimal % 2) + binary;
            decimal = Math.floor(decimal / 2);
        }
        return binary;
    }

    static partOne(vector?: string[]) {
        const readings = vector ?? fs.readFileSync('./input/day3.txt', 'utf8').split("\r\n");
        const readingLength = readings[0].length;

        const bitPerPositions = new Array(readingLength).fill('');
        readings.forEach((reading: string) => {
            for (let i = 0; i < readingLength; i++) {
                bitPerPositions[i] += reading[i];
            }
        })

        let gamma = "";
        let epsilon = "";

        bitPerPositions.forEach((bitPerPosition: string) => {
            const getMostCommonBit = Puzzle3.getMostCommonBit(bitPerPosition);
            if (getMostCommonBit === "1") {
                gamma += "1";
                epsilon += "0";
            } else {
                gamma += "0";
                epsilon += "1";
            }
        })

        return { common: gamma, opposite: epsilon };

    }

    static partTwo() {
        const readings = fs.readFileSync('./input/day3.txt', 'utf8').split("\r\n");

        let oxyRating = 0;
        let co2Rating = 0;

        let posibleNumbers = readings;

        const { common, opposite } = Puzzle3.partOne(readings);

        function recursiveSearch(posibleSolutions: string[], getMostCommonBit: string, position: number, bitWanted: "0" | "1"): string | undefined {
            if (posibleSolutions.length === 2) {
                const valToReturn = posibleSolutions[0].charAt(position) === bitWanted ? posibleSolutions[0] : posibleSolutions[1];
                console.log(`${posibleSolutions[0]} ${posibleSolutions[1]}`);
                console.log(`valToReturn: ${valToReturn}`);
                return valToReturn;
            } else {
                posibleSolutions = posibleSolutions.filter((posibleSolution: string) => {
                    return posibleSolution.charAt(position) === getMostCommonBit;
                });

                return recursiveSearch(posibleSolutions, bitWanted === "1" ? Puzzle3.partOne(posibleSolutions).common.charAt(position + 1) : Puzzle3.partOne(posibleSolutions).opposite.charAt(position + 1), position + 1, bitWanted);
            }
        }

        oxyRating = this.binaryToDecimal(recursiveSearch(posibleNumbers, common.charAt(0), 0, "1") ?? "0");
        co2Rating = this.binaryToDecimal(recursiveSearch(posibleNumbers, opposite.charAt(0), 0, "0") ?? "0");

        console.log("Oxygen rating: " + oxyRating);
        console.log("Co2 rating: " + co2Rating);

        return oxyRating * co2Rating;
    }
}

const { common, opposite } = Puzzle3.partOne()
//console.log(this.numberToBinary(this.binaryToDecimal(common)) * this.numberToBinary(this.binaryToDecimal(opposite)));
console.log("///////////////////////////////////////");

console.log(Puzzle3.partTwo());


//984567, 983796, 790275