import { getElfPairings } from './input';

const pairs = getElfPairings();
let sum = 0;

for (const pair of pairs) {
  let found = false;
  const { a, b } = pair;

  if (a.min >= b.min && b.max >= a.min) {
    found = true;
  }

  if (b.min >= a.min && a.max >= b.min) {
    found = true;
  }

  if (found) sum++;
}

console.log(sum);
