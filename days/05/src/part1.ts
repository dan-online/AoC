import { getInitialCrates, getMoves } from './input';

const columns = getInitialCrates();
const moves = getMoves();

for (const move of moves) {
  for (let i = 0; i < move.num; i++) {
    if (columns[move.from - 1].length === 0) continue;

    const crate = columns[move.from - 1].shift();

    if (!crate) continue;
    columns[move.to - 1].unshift(crate);
  }
}

console.log(columns.map((x) => x[0]).join(''));

const largestHeight = columns.reduce((a, b) => (a.length > b.length ? a : b)).length;
const output = [];

for (let row = largestHeight; row >= 0; row--) {
  let a = '';

  for (const column of columns) {
    a += column[row] ? ` [${column[row]}] ` : '     ';
  }

  output.push(`${a}`);
}

output.unshift(columns.map((_, i) => `  ${i + 1}  `).join(''));

console.log(output.reverse().join('\n'));
