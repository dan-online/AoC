import { getBags } from './input';

const bags = getBags();
let sum = 0;

for (const bag of bags) {
  for (const itemLeft of bag[0]) {
    let found = false;

    for (const itemRight of bag[1]) {
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
