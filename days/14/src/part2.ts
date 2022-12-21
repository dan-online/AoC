import { getScan, Grid, startX } from './input';

const scan = getScan(true);

function step() {
  const maxY = scan.grid.length - 1;

  for (const sand of scan.sand.filter((x) => x.moving)) {
    // A unit of sand always falls down one step if possible. If the tile immediately below is blocked (by rock or sand), the unit of sand attempts to instead move diagonally one step down and to the left. If that tile is blocked, the unit of sand attempts to instead move diagonally one step down and to the right. Sand keeps moving as long as it is able to do so, at each step trying to move down, then down-left, then down-right. If all three possible destinations are blocked, the unit of sand comes to rest and no longer moves, at which point the next unit of sand is created back at the source.
    while (sand.moving) {
      const { x, y } = sand;

      // if (!scan.grid[y + 1]) {
      //   scan.sand = scan.sand.filter((x) => x !== sand);
      //   return;
      // }
      if (y + 1 >= maxY) {
        sand.moving = false;
        continue;
      }

      const below = scan.grid[y + 1][x];
      const left = scan.grid[y + 1][x - 1];
      const right = scan.grid[y + 1][x + 1];

      if (below === Grid.Empty) {
        sand.y += 1;
        continue;
      }

      if (below === Grid.Path && left === Grid.Path && right === Grid.Path) {
        sand.moving = false;
        continue;
      }

      // if (below === Grid.Sand) {
      if (left === Grid.Empty) {
        sand.y += 1;
        sand.x -= 1;
      } else if (right === Grid.Empty) {
        sand.y += 1;
        sand.x += 1;
      } else {
        sand.moving = false;
      }
      // }
    }
  }

  scan.getGrid();
  // if (scan.sand.find((x) => x.x === 26 && x.y === 0)) {
  //   return;
  // }

  scan.addSand();

  // console.clear();
  // console.log(scan.output());

  // step();
  // console.log(scan.output());
  // setTimeout(step, 500);
}

console.log(scan.output());

let lastTime = { date: Date.now(), sand: 0 };

while (!scan.sand.find((x) => x.x === startX + 1 && x.y === 0 && !x.moving)) {
  const passage = Date.now() - lastTime.date;

  if (passage > 1000) {
    console.clear();
    console.log(scan.output());
    console.log(scan.sand.length - lastTime.sand, 'per second');
    lastTime = { date: Date.now(), sand: scan.sand.length };
  }

  step();
}

console.log(scan.output());
console.log(scan.sand.length);
// 13518 too low
// 28822 too high
