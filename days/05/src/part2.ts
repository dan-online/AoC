import { getInitialCrates, getMoves } from './input';

const columns = getInitialCrates();
const moves = getMoves();

for (const move of moves) {
  if (columns[move.from - 1].length === 0) continue;

  const crates = columns[move.from - 1].slice(0, move.num);

  columns[move.from - 1] = columns[move.from - 1].slice(move.num);

  columns[move.to - 1] = [...crates, ...columns[move.to - 1]];
}

console.log(columns.map((x) => x[0]).join(''));
