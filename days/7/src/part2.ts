import { getAll } from './input';

const dirs = getAll();
const requiredNeeded = 30000000;
const total = 70000000;
const used = dirs.find((x) => !x.parent)!.size;
const free = total - used;
const lookingToFreeUp = requiredNeeded - free;
let smallest = Infinity;

for (const dir of dirs.sort((b, a) => a.size - b.size)) {
  if (dir.size >= lookingToFreeUp) {
    if (dir.size < smallest) {
      smallest = dir.size;
    }
  }
}

console.log(smallest, total - (used - smallest));
