const input1 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
import { input } from './input';
import { Game, parseGame } from './second';

function countGame(game: Game): number {
  const minGreen = Math.max(...game.combinations.map(({ green }) => green));
  const minRed = Math.max(...game.combinations.map(({ red }) => red));
  const minBlue = Math.max(...game.combinations.map(({ blue }) => blue));

  return minBlue * minGreen * minRed;
}

const res = input
  .split('\n')
  .map(parseGame)
  .map(countGame)
  .reduce((a, b) => a + b);

console.log(res);
