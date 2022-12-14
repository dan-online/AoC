import { counts } from './input';

// let max = 0;

// for (const count of counts.split('\n\n')) {
//   const sum = count.split('\n').reduce((prev, cur) => (prev += parseInt(cur, 10)), 0);

//   if (sum > max) {
//     max = sum;
//   }
// }

const all: number[] = [];

for (const count of counts.split('\n\n')) {
  const sum = count.split('\n').reduce((prev, cur) => (prev += parseInt(cur, 10)), 0);

  all.push(sum);
}

console.log(
  all
    .sort((b, a) => a - b)
    .slice(0, 3)
    .reduce((prev, cur) => prev + cur, 0)
);
