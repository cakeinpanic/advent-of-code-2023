import { input } from './input';

const input1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const input2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;
let stepsInstruction = [];
const coordinates = {};

const parseInput = (input: string) => {
  stepsInstruction = input.split('\n')[0].split('');
  // console.log(stepsInstruction);
  input.split('\n').slice(2).forEach((line) => {
    const [from, toA, toB] = line.replace(/[=\(\),]/g, '').replace(/ +/g, ' ').split(' ');
    coordinates[from] = [toA, toB];
  });

};

function solve(str: string) {
  parseInput(str);
  let current = 'AAA';
  let stepsMade = 0;

  while (current != 'ZZZ') {
    let stepIndex = stepsMade % stepsInstruction.length;
    const step = stepsInstruction[stepIndex];
    stepsMade++;
    if (step === 'L') {
      current = coordinates[current][0];
    } else {
      current = coordinates[current][1];
    }
  }

  console.log(stepsMade);
}

function solvePlus(str: string) {
  parseInput(str);
  let currents = Object.keys(coordinates).filter((key) => key.indexOf('A') === 2).slice(0,1)

  let stepsMade = 0;

  while (!currents.every((key) => key.indexOf('Z') === 2)) {
    let stepIndex = stepsMade % stepsInstruction.length;
    const step = stepsInstruction[stepIndex];
    stepsMade++;
    if (step === 'L') {
      currents = currents.map(cur => coordinates[cur][0]);
    } else {
      currents = currents.map(cur => coordinates[cur][1]);
    }
  }

  console.log(stepsMade);
}

console.log(new Date())
solvePlus(input);
