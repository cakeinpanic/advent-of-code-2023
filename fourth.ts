const input1 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
import { input } from './input';
const input2 = `Card 201:  4 13 26 57 84 17 63 10 98 56 | 72 85 68 47 44 60 54 34 38 16  8 11 23 84 32 18 69 13 26 35  9 73 43 15 89`;
interface Card {
  id: number;
  winning: number[];
  actual: number[];
  multiplier: number;
  value: number;
  matchingNumbers: number;
}
function parseCards(str: string): Card[] {
  return str.split('\n').map((card) => {
    const id = +card.split(':')[0].substring(5);
    const winningSeq = card.split(':')[1].split('|')[0].trim();
    const actualSeq = card.split(':')[1].split('|')[1].trim();

    return {
      id,
      winning: winningSeq.split(/\s+/).map((t) => +t),
      actual: actualSeq.split(/\s+/).map((t) => +t),
      matchingNumbers: 0,
      multiplier: 1,
      value: 0,
    };
  });
}

function getCardValue(card: Card): number {
  let value = 0;
  let matchers = 0;
  console.log(card);
  card.actual.forEach((num) => {
    if (card.winning.indexOf(num) > -1) {
      matchers++;
      if (value === 0) {
        value = 1;
      } else {
        value *= 2;
      }
    }
  });
  card.value = value;
  card.matchingNumbers = matchers;
  return value;
}

function simple() {
  const res = parseCards(input)
    .map(getCardValue)
    .reduce((a, b) => a + b);

  console.log(res);
}

function advanced() {
  const cards = parseCards(input);
  cards.forEach((card) => getCardValue(card));

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].value > 0) {
      for (let j = 1; j <= cards[i].matchingNumbers && j < cards.length; j++) {
        cards[i + j].multiplier += cards[i].multiplier;
      }
    }
  }
  const res = cards
    .map(({ value, multiplier }) => multiplier)
    .reduce((a, b) => a + b);
  console.log(res);
}
advanced();
