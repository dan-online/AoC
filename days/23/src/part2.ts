import { getArea } from './input';

const area = getArea();
let round = 0;

while (true) {
  round++;

  const movements = area.round();

  process.stdout.clearLine(-1);
  process.stdout.cursorTo(0);
  process.stdout.write(`Round number ${round} with ${movements} movements`);

  if (movements === 0) {
    break;
  }
}

console.log();
console.log(area.output);
console.log(round);
