import { getPairs } from './input';

const pairs = getPairs();
const indices = [];

for (const pair of pairs) {
  const indice = pairs.indexOf(pair) + 1;

  if (pair.isValid()) {
    console.log(`Pair ${indice} is valid`);
    indices.push(indice);
  }
}

console.log(indices.reduce((a, b) => a + b, 0));
