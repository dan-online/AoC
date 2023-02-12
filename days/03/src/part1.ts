import { getBags } from './input';

const bags = getBags();
console.log(bags[0]);
let sum = 0;

for (const bag of bags) {
  for (const itemLeft of bag.left) {
    let found = false;

    for (const itemRight of bag.right) {
      if (itemLeft.item === itemRight.item) {
        sum += itemLeft.priority;
        found = true;
        break;
      }
    }

    if (found) {
      break;
    }
  }
}

console.log(sum);
