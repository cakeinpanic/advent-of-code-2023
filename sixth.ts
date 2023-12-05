const input = `Time:        62     73     75     65
Distance:   644   1023   1240   1023`;

const input1 = `Time:      7  15   30
Distance:  9  40  200`;

function parseInput(str: string) {
const d =str.replace(/\w+:/g, '').replace(/\s+/g, ' ').split(' ').map((t) => +t)
  console.log(d);
}

function solve(inp: string) {
const data = parseInput(inp);
}

solve(input1)
