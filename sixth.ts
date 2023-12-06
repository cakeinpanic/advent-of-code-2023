const input = `Time:        62     73     75     65
Distance:   644   1023   1240   1023`;

const input1 = `Time:      7  15   30
Distance:  9  40  200`;

function parseInput(str: string) {
  return str.replace(/\w+:/g, '').replace(/ +/g, ' ').split('\n').map((x) => x.trim().split(' ').map((y) => parseInt(y, 10)));

}

function processRace(time: number, distance: number): number[] {
  let result = [];
  let speed = 0;
  for (let i = 0; i <= time; i++) {
    speed = i
    const res = speed * (time - i);
    if (res > distance) {
      result.push(i);
    }
  }
  //console.log(time, result);
  return result;
}

function solve(inp: string) {
  const data = parseInput(inp);
  const res = data[0].map((time, i) => {
    const variants = processRace(time, data[1][i])
    return variants.length
  }).reduce((a,b)=>a*b, 1)
  console.log(res);
}

solve(input);
