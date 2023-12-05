const input1 = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

import { input } from './input';

function toMatrix(str: string): string[][] {
  return str.split('\n').map((l) => l.split(''));
}

function isNum(str: string): boolean {
  return !!/\d+/.exec(str);
}

function isSymbol(str: string): boolean {
  return !/[\d\\.]/.exec(str);
}

function detectNumbers(
  matrix: string[][]
): { num: number; coordinates: { x: number; y: number }[] }[] {
  const vals = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (isNum(matrix[y][x])) {
        const coordinates = [];
        let n = matrix[y][x];
        coordinates.push({ x, y });
        for (let k = x + 1; k < matrix[y].length; k++) {
          if (!isNum(matrix[y][k])) {
            x = k;
            break;
          }
          coordinates.push({ x: k, y });
          n += matrix[y][k];
        }

        vals.push({
          num: +n,
          coordinates,
        });
      }
    }
  }

  return vals;
}
function neighbours(
  x: number,
  y: number,
  matrix: string[][]
): { x: number; y: number }[] {
  const maxY = matrix.length;
  const maxX = matrix[0].length;

  return [
    {
      x: x + 1,
      y: y + 1,
    },
    {
      x: x + 1,
      y: y - 1,
    },
    {
      x: x - 1,
      y: y + 1,
    },
    {
      x: x - 1,
      y: y - 1,
    },
    {
      x: x + 1,
      y: y,
    },
    {
      x: x - 1,
      y: y,
    },
    {
      x: x,
      y: y + 1,
    },
    {
      x: x,
      y: y - 1,
    },
  ].filter(({ x, y }) => x >= 0 && x < maxX && y >= 0 && y < maxY);
}

function removeDups(
  arr: { x: number; y: number }[]
): { x: number; y: number }[] {
  return arr.filter(
    ({ x, y }, i) => arr.findLastIndex((el) => el.x === x && el.y === y) === i
  );
}

function findNums(matrix: string[][]): number[] {
  const numbers = detectNumbers(matrix);

  return numbers.map(({ num, coordinates }) => {
    const allNeighbours = coordinates
      .map(({ x, y }) => neighbours(x, y, matrix))
      .flat();
    if (allNeighbours.some(({ x, y }) => isSymbol(matrix[y][x]))) {
      return num;
    } else {
      return 0;
    }
  });
}
function findNumsWithGears(matrix: string[][]): number[] {
  const numbers = detectNumbers(matrix);
  const gears = {};
  numbers.map(({ num, coordinates }) => {
    let allNeighbours = removeDups(
      coordinates.map(({ x, y }) => neighbours(x, y, matrix)).flat()
    );

    allNeighbours.forEach(({ x, y }) => {
      if (matrix[y][x] === '*') {
        const key = `${y}_${x}`
        gears[key] = gears[key] || [];
        gears[key].push(num);
      }
    });
  });

  const gear2 = Object.values(gears).filter((nums) => nums.length === 2);
  // console.log(JSON.stringify(gear));
  return gear2.map((nums: number[]) => {
    return nums[0] * nums[1];
  });
}

const res = findNumsWithGears(toMatrix(input)).reduce((a, b) => a + b);
console.log(res);
