import { input } from './input';

function getLineNumber(line: string): number {
  const rg= new RegExp('\\d','g')
  const [first] = /\d/.exec(line);
  
  const [second] = /\d/.exec(line.split('').reverse().join(''));

  const num = +(first + second);

  return num;
}

const res = input
  .split(`\n`)
  .map(getLineNumber)
  .reduce((a, b, c) =>  a + b, 0);

console.log(res);
