import { getInstructions, getKnots } from './input';

const instructions = getInstructions();
const knots = getKnots();
const visited: { x: number; y: number }[] = [];
const output = (showVisited = false) => {
  console.clear();

  const visual = new Array(10);

  for (let idx = 0; idx < visual.length; idx++) {
    visual[idx] = new Array(10);
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

      if (knots.head.x === x && knots.head.y === y) {
        visual[y][x] = 'H';
        continue;
      }

      if (knots.tail.x === x && knots.tail.y === y) {
        visual[y][x] = 'T';
        continue;
      }

      visual[y][x] = '.';
    }
  }

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

    // check if tail is next to head
    if (!(Math.abs(knots.head.x - knots.tail.x) <= 1 && Math.abs(knots.head.y - knots.tail.y) <= 1)) {
      // move tail towards head
      if (knots.head.x > knots.tail.x) {
        knots.tail.x += 1;
      } else if (knots.head.x < knots.tail.x) {
        knots.tail.x -= 1;
      }

      if (knots.head.y > knots.tail.y) {
        knots.tail.y += 1;
      } else if (knots.head.y < knots.tail.y) {
        knots.tail.y -= 1;
      }
    }

    if (!visited.find(({ x, y }) => knots.tail.x === x && knots.tail.y === y)) visited.push({ x: knots.tail.x, y: knots.tail.y });

    dist--;
  }
}

output(true);
console.log(`Visited ${visited.length} places`);
