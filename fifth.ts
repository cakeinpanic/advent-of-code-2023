import { input } from './input';

const input1 = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

interface Mapping {
  destination: number;
  source: number;
  range: number;
}

interface Data {
  seeds: number[];
  mappings: {
    name: string;
    mapping: Mapping[];
  }[];
}

function parseData(str: string): Data {
  const seeds = str
    .split('\n')[0]
    .substring(7)
    .split(' ')
    .map((t) => +t);

  const mappings = str
    .split('\n\n')
    .slice(1)
    .map((mapping) => {
      const name = mapping.split('\n')[0];
      const coordinates = mapping.split('\n').slice(1);

      return {
        name,
        mapping: coordinates.map((line) => {
          const [destination, source, range] = line.split(' ').map((t) => +t);
          return { destination, source, range };
        }),
      };
    });

  return {
    seeds,
    mappings: mappings as any,
  };
}

function getSeedRange(pair: number[]): number[] {

  const [seed1, range] = pair;
  const newSeeds = [];

  for (let i = 0; i <= range; i++) {
    newSeeds.push(seed1 + i);
  }

  return newSeeds;
}

function buildMap(mappings: Mapping[]): Mapping[] {
  mappings = mappings.sort((m1, m2) => {
    return m1.source > m2.source ? 1 : -1;
  });

  return mappings;
}

function getCoordinate(from: number, mapping: Mapping[]): number {
  let isHit = false;
  mapping.forEach(({ destination, source, range }) => {
    if (isHit) {
      return;
    }
    if (from >= source && from < source + range) {
      isHit = true;
      from = destination + from - source;
    }
  });

  return from;
}

function processSeedsRange(seeds: number[], maps: Mapping[][]): number {
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < seeds.length; i++) {
    let coordinate = seeds[i];
    for (let j = 0; j < maps.length; j++) {
      const c = getCoordinate(coordinate, maps[j]);
      coordinate = c === undefined ? coordinate : c;
    }
    if (min > coordinate) {
      min = coordinate;
    }
  }

  return min;
}

function splitPair(pair: number[]): number[][] {
  const [from, range] = pair;
  const middle = Math.floor(range / 2);
  return [
    [from, middle],
    [from + Math.ceil(range / 2), middle]
  ];
}
function mapAllByPairs(data: Data): any {
  const maps = data.mappings.map(({ mapping }) => buildMap(mapping));
  //const mins = [522761994,3660193833,1994231379,668015448,288875640,232257988,280278922,555394663,2124094240,2130440815,1813446793,1833647722];
  //7 [308079844,327230151,2459750215,1194105161]
  //8 [1538233289,2185751788,1399376623,1480285602,81956384,1028979955,2076596363,921962153]
  // 9 [1116311642,606585628,1944266713,2282273940,2403419102,416908948,484511758,610263099]

  const mins = [];

  const seedPairs = data.seeds.map((seed, i) => i % 2 ? null : [seed, data.seeds[i + 1]])
    .filter(Boolean)
    .slice(10,11)
    .map(splitPair).flat()
    .map(splitPair).flat()
    .map(splitPair).flat()

  for (let i = 0; i < seedPairs.length; i++) {
    let seedsRange = getSeedRange(seedPairs[i]);
    console.log('range formed');
    const min = processSeedsRange(seedsRange, maps);
    seedsRange = null;
    mins.push(min);
    console.log('pair finished');
    console.log(JSON.stringify(mins));
  }

  const superMin = Math.min(...mins);
  console.log(superMin);
}

function mapAll(data: Data): any {
  const maps = data.mappings.map(({ mapping }) => buildMap(mapping));
  const min = processSeedsRange(data.seeds, maps);
  console.log(min);

}

// first
//mapAll(parseData(input1));

//second
mapAllByPairs((parseData(input)));

