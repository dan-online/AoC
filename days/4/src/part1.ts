import { getElfPairings } from './input';

const pairs = getElfPairings();
let sum = 0;

for (const pair of pairs) {
  let found = false;

  if (pair.a.min >= pair.b.min && pair.a.max <= pair.b.max) {
    found = true;
  }

  if (pair.b.min >= pair.a.min && pair.b.max <= pair.a.max) {
    found = true;
  }

  if (found) sum++;
}

console.log(sum);
