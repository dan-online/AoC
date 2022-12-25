import { getNumbers, NumbersToSNAFU } from './input';

const numbers = getNumbers();
const sum = numbers.reduce((a, b) => a + b.sum, 0);
const ntS = new NumbersToSNAFU(
  sum
    .toString()
    .split('')
    .map((x) => Number(x))
);

console.log(ntS.real);
