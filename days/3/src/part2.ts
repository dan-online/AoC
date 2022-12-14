import { getGroups } from './input';

const groups = getGroups();
let sum = 0;

for (const group of groups) {
  sum += group.id.priority;
}

console.log(sum);
