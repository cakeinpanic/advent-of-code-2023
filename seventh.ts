const input1 = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
import { input } from './input';

const CARDS_RANK = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse();

type CARD = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2'

enum COMBO {
  HIGH,
  PAIR,
  TWOPAIRS,
  THREE,
  FULLHOUSE,
  FOUR,
  FIVE,
}

type Hand = { cards?: { [key in CARD]?: number }, sum?: number }

function getRank(hand: Hand): number {
  const combo = findCombo(hand);
  const MAX = Math.pow(100, 7);
  return combo * MAX + hand.sum;
}

function findCombo(hand: Hand): number {
  const values: number[] = Object.values(hand.cards);
  const max = Math.max(...values);
  const min = Math.min(...values);

  if (max === 5) {
    return COMBO.FIVE;
  }
  if (max === 4) {
    return COMBO.FOUR;
  }
  if (max === 3) {
    if (min === 2) {
      return COMBO.FULLHOUSE;
    }
    return COMBO.THREE;
  }
  if (max === 2) {
    if (values.filter((v) => v === 2).length === 2) {
      return COMBO.TWOPAIRS;
    }
    return COMBO.PAIR;
  }
  return COMBO.HIGH;
}

function parseHand(hand: string): Hand {
  const cards = hand.split('');
  const result: Hand = { cards: {}, sum: 0 };

  cards.forEach((card) => {
    const rank = card[0] as CARD;
    result.cards[rank] = (result.cards[rank] || 0) + 1;
  });
  result.sum = cards.reverse().map((card, i) => {
    const index = CARDS_RANK.indexOf(card) + 1;
    const r = index * Math.pow(100, i);
    return r;
  }).reduce((acc, curr) => acc + curr, 0);
  return result;
}

function solve(inp: string, getRankMethod: Function): void {
  const hands = inp.split('\n').map((line) => {
    const [hand, value] = line.split(' ');

    const parsedHand = parseHand(hand);
    return {
      rank: getRankMethod(parsedHand),
      hand: parsedHand,
      rawHand: hand,
      value: +value
    };
  }).sort((a, b) => {
    return a.rank - b.rank > 0 ? 1 : -1;
  })
    //.map(({ value, rawHand }) => ({ rawHand, value }));

  const val = hands.reduce((acc, curr, i) => {
    return acc + curr.value * (i + 1);
  }, 0);

  console.log(val);

}

solve(input, getRank);
