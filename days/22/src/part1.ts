import { Direction, getArea } from './input';

const area = getArea();

while (area.instructions.length > 0) {
  area.move();
}

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

console.log(password);
