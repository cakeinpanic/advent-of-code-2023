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
    if (from >= source && from <= source + range) {
      isHit = true;
      from = destination + from - source;
    }
  });

  return from;

}

function mapAll(str: string): any {
  const data = parseData(str);

  const maps = data.mappings.map(({ mapping }) => buildMap(mapping));

  const final = data.seeds.map((seed) => {
    let coordinate = seed;
    for (let j = 0; j < maps.length; j++) {
      const c = getCoordinate(coordinate, maps[j]);
      coordinate = c === undefined ? coordinate : c;
    }
    return coordinate;
  });

  const min = Math.min(...final);
  console.log(min);
}

mapAll(input);
