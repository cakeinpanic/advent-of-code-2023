import { input } from './input';
const numbers = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];
const match = `(\\d|${numbers.join('|')})`;

function toNum(str: string): number {
  const index = numbers.indexOf(str);
  if (index > -1) {
    return index;
  }
  return +str;
}
function getLineNumber(line: string): number {
  const lastR = new RegExp(`^.*${match}`, 'g');
  const firstR = new RegExp(`${match}.*$`, 'g');

  const [whole, first] = firstR.exec(line);
  const [wwhole, last] = lastR.exec(line);

  const num = toNum(first) * 10 + toNum(last);

  return num;
}

const res = input
  .split(`\n`)
  .map(getLineNumber)
  .reduce((a, b, c) => a + b, 0);

console.log(res);
