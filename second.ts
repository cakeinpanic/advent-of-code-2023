const input1 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
import { input } from './input';
export interface Game {
  id: number;
  combinations: {
    red: number;
    green: number;
    blue: number;
  }[];
}
export function parseGame(line: string): Game {
  const game = {
    id: 0,
    combinations: [],
  };
  const [all, gameId] = /Game (\d+):/.exec(line);

  game.id = +gameId;
  const games = line.split(': ').pop().split(';');
  game.combinations = games.map((g) => {
    const combination = {
      red: 0,
      green: 0,
      blue: 0,
    };
    g.trim()
      .split(', ')
      .forEach((value) => {
        const [all, num, color] = /(\d+) (\w+)/.exec(value);
        combination[color] = +num;
      });
    return combination;
  });

  return game;
}

function validateGame(game: Game): number {
  const maxRed = 12;
  const maxGreen = 13;
  const maxBlue = 14;
  const isValid = game.combinations.every(
    ({ green, blue, red }) =>
      green <= maxGreen && red <= maxRed && blue <= maxBlue
  );
  return isValid ? game.id : 0;
}

const res = input
  .split('\n')
  .map(parseGame)
  .map(validateGame)
  .reduce((a, b) => a + b);

console.log(res);
