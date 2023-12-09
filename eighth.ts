import { input } from './input';
const input1 =`RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

const input2 =`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`
let stepsInstruction = []
const coordinates = {

}

const parseInput = (input: string) => {
  stepsInstruction = input.split('\n')[0].split('')
 // console.log(stepsInstruction);
  input.split('\n').slice(2).forEach((line) => {
    const [from, toA, toB]= line.replace(/[=\(\),]/g,'').replace(/ +/g,' ').split(' ')
    coordinates[from] = [toA, toB]
  })

}

function solve(str: string) {
  parseInput(str)
  let current = 'AAA'
  let stepsMade = 0

  while (current != 'ZZZ') {
    let stepIndex = stepsMade % stepsInstruction.length
    const step = stepsInstruction[stepIndex]
    stepsMade++
    if(step ==='L') {
      current = coordinates[current][0]
    } else {
      current = coordinates[current][1]
    }
  }

  console.log(stepsMade)
}

solve(input)
