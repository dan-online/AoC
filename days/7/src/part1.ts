import { getAll } from './input';

const dirs = getAll();
let total = 0;

for (const dir of dirs) {
  if (dir.parent === null) continue;
  if (dir.size <= 100000) {
    total += dir.size;
  }
}

console.log(total);
