const input1 = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
import { input } from './input';

const CARDS_RANK = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse();

const CARDS_RANK_JOKER = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].reverse();

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

function getSum(rawHand: string, RANKS = CARDS_RANK): number {
  return rawHand.split('').reverse().map((card, i) => {
    const index = RANKS.indexOf(card) + 1;
    return index * Math.pow(100, i);
  }).reduce((acc, curr) => acc + curr, 0);
}

function getRank(rawHand: string): number {
  const hand = parseHand(rawHand);
  const combo = findCombo(hand);

  return combo;// + getSum(rawHand);
}

function getRankPlus(rawHand: string): number {
  if (!rawHand.includes('J')) {
    return getRank(rawHand);
  }

  const allCombos = CARDS_RANK_JOKER.slice(1).map((card) => {
    const newCard = rawHand.replace(/J/g, card);
    return newCard;
  }).sort((a, b) => {
    const handA = parseHand(a);
    const handB = parseHand(b);
    return findCombo(handB) - findCombo(handA);
  });
  console.log(rawHand, '->', allCombos[0]);

  const hand = parseHand(allCombos[0]);
  const maxCombo = findCombo(hand);

  return maxCombo;
}

function findCombo(hand: Hand): number {
  const values: number[] = Object.values(hand.cards);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const MAX = Math.pow(100, 7);

  if (max === 5) {
    return COMBO.FIVE * MAX;
  }
  if (max === 4) {
    return COMBO.FOUR * MAX;
  }
  if (max === 3) {
    if (min === 2) {
      return COMBO.FULLHOUSE * MAX;
    }
    return COMBO.THREE * MAX;
  }
  if (max === 2) {
    if (values.filter((v) => v === 2).length === 2) {
      return COMBO.TWOPAIRS * MAX;
    }
    return COMBO.PAIR * MAX;
  }
  return COMBO.HIGH * MAX;
}

function parseHand(hand: string): Hand {
  const cards = hand.split('');
  const result: Hand = { cards: {}, sum: 0 };

  cards.forEach((card) => {
    const rank = card[0] as CARD;
    result.cards[rank] = (result.cards[rank] || 0) + 1;
  });

  return result;
}

function solve(inp: string, getRankMethod: Function, RANK = CARDS_RANK): void {
  const hands = inp.split('\n').map((line) => {
    const [hand, value] = line.split(' ');

    return {
      rank: getRankMethod(hand),
      rawHand: hand,
      value: +value
    };
  }).sort((a, b) => {
    if (a.rank === b.rank) {
      for (let i = 0; i < 5; i++) {
        const indA = RANK.indexOf(a.rawHand[i]);
        const indB = RANK.indexOf(b.rawHand[i]);
        if (indA === indB) {
          continue
        }
        if (indA > indB) {
          return 1;
        }
        return -1;
      }
    }
    return a.rank > b.rank ? 1 : -1;
  })
    .map(({ value, rawHand }) => ({ rawHand, value }));

  const val = hands.reduce((acc, curr, i) => {
    return acc + curr.value * (i + 1);
  }, 0);

  console.log(hands, val);

}

//solve(input, getRank);
solve(input, getRankPlus, CARDS_RANK_JOKER);
