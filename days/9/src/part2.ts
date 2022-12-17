import { getInstructions, getKnots } from './input';

const instructions = getInstructions();
const knots = getKnots(['Head', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
const visited: { x: number; y: number }[] = [];
const output = (showVisited = false) => {
  console.clear();

  const visual = new Array(30);

  for (let idx = 0; idx < visual.length; idx++) {
    visual[idx] = new Array(30);
  }

  for (let y = 0; y < visual.length; y++) {
    for (let x = 0; x < visual[y].length; x++) {
      if (showVisited) {
        const wasVisited = visited.find((instruction) => instruction.x === x && instruction.y === y);

        if (wasVisited) {
          visual[y][x] = 'X';
          continue;
        }
      }

      visual[y][x] = '.';
    }
  }

  // for (const knot in knots) {
  //   const { x, y } = knots[knot];

  //   if (x > 0 && y > 0) {
  //     visual[y][x] = knot[0];
  //   }
  // }

  console.log(visited);

  console.log(visual.map((row) => row.join('')).join('\n'));
};

for (const instruction of instructions) {
  let dist = instruction.distance;

  while (dist > 0) {
    switch (instruction.direction) {
      case 'R':
        knots.head.x += 1;
        break;

      case 'L':
        knots.head.x -= 1;
        break;

      case 'U':
        knots.head.y += 1;
        break;

      case 'D':
        knots.head.y -= 1;
        break;
    }

    for (const knot in knots) {
      if (knot === 'head') continue;

      const inFront = parseInt(knot, 10) === 1 ? knots.head : knots[parseInt(knot, 10) - 1];
      const me = knots[knot];

      if (!(Math.abs(inFront.x - me.x) <= 1 && Math.abs(inFront.y - me.y) <= 1)) {
        // move tail towards head
        if (inFront.x > knots[knot].x) {
          knots[knot].x += 1;
        } else if (inFront.x < me.x) {
          knots[knot].x -= 1;
        }

        if (inFront.y > me.y) {
          knots[knot].y += 1;
        } else if (inFront.y < me.y) {
          knots[knot].y -= 1;
        }
      }

      if (me.name === '9') {
        if (!visited.find(({ x, y }) => me.x === x && me.y === y)) visited.push({ x: me.x, y: me.y });
      }
    }

    dist--;
  }
}

output(true);
console.log(`Visited ${visited.length} places`);
