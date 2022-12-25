import { Direction, getArea } from './input';

const area = getArea();
const totalInstructions = area.instructions.length;
const updateProgress = () => {
  process.stdout.clearLine(-1);
  process.stdout.cursorTo(0);
  process.stdout.write(
    `Progress: ${(((totalInstructions - area.instructions.length) / totalInstructions) * 100).toFixed(2)}% (${
      totalInstructions - area.instructions.length
    }/${totalInstructions})`
  );
};

while (area.instructions.length > 0) {
  updateProgress();
  area.moveCube();
  updateProgress();
  console.log(area.output());
}

// setInterval(() => {
//   area.moveCube();
//   console.log(area.output());
// }, 1000);

// area.moveCube();

// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);

// process.stdin.on('keypress', function (letter, key) {
//   console.log(key.name);
//   if (key && key.ctrl && key.name === 'c') {
//     process.exit();
//   }

//   if (key.name === 'return') {
//     area.moveCube();
//     console.log(area.output());
//   }
// });

// console.log();
console.log(area.output());

const meRowIndice = area.me.y + 1;
const meColIndice = area.me.x + 1;
let meFacing = 0;

switch (area.me.facing) {
  case Direction.Right:
    meFacing = 0;
    break;

  case Direction.Down:
    meFacing = 1;
    break;

  case Direction.Left:
    meFacing = 2;
    break;

  case Direction.Up:
    meFacing = 3;
    break;
}

const password = 1000 * meRowIndice + 4 * meColIndice + meFacing;

console.log();
console.log(password);
// 38598  too low
// 39464  too low
// 51263  too low
// 107229 too low
// 112111 too high
// 133037 too high
// 145082 too high
