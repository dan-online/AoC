import { getMap, Location } from './input';

const map = getMap();
let lastOutput: number | undefined;
// let num = 0;
// function bfs(start: Location, end: Location): { steps: number } {
//   const visited: { loc: Location; minutes: number }[] = [];
//   const queue: [Location, number][] = [];

//   queue.push([start, 1]);
//   while (queue.length > 0) {
//     num++;

//     const [current, minutes] = queue.shift()!;

//     if (current.x === end.x && current.y === end.y) {
//       return { steps: minutes };
//     }

//     // const start = performance.now();
//     const { candidates, grid, blizzards } = map.getLocationCandidates(current, minutes + 1);

//     if (!lastOutput || Date.now() - lastOutput > 1000) {
//       console.clear();
//       // console.log(`${(performance.now() - start).toFixed(2)}ms`);
//       console.log(`Minutes: ${minutes} at ${num}/s Queue: ${queue.length}\n${map.getOutput(grid, blizzards, current, candidates)}`);

//       lastOutput = Date.now();
//       num = 0;
//     }

//     for (const neighbour of candidates) {
//       if (!visited.find((x) => x.loc.x === neighbour.x && x.loc.y === neighbour.y && x.minutes >= minutes)) {
//         visited.push({ loc: neighbour, minutes });
//         queue.push([neighbour, minutes + 1]);
//       }
//     }
//   }

//   return { steps: -1 };
// }

function bfs(start: Location, end: Location, startTime = 0): number {
  let time = startTime;
  let currPos = [start];
  let nextPos = [];

  while (true) {
    while (currPos.length > 0) {
      const location = currPos.pop()!;
      const { x, y } = location;

      if (x === end.x && y === end.y) {
        return time;
      }

      const { candidates, blizzards } = map.getLocationCandidates(location, time + 1);

      for (const candidate of candidates) {
        if (!blizzards.find((x) => x.x === candidate.x && x.y === candidate.y)) {
          nextPos.push(candidate);
        }
      }

      if (!lastOutput || Date.now() - lastOutput > 200) {
        process.stdout.clearLine(-1);
        process.stdout.cursorTo(0);
        process.stdout.write(`Minutes: ${time} Queue: ${currPos.length}`);

        lastOutput = Date.now();
      }

      // for (const [x1, y1] of [
      //   [x + 1, y],
      //   [x - 1, y],
      //   [x, y + 1],
      //   [x, y - 1],
      //   [x, y]
      // ]) {
      //   if (
      //     (x1 >= 1 && x1 <= xMax && y1 >= 1 && y1 <= yMax && !blizzards.has(x1, y1)) ||
      //     (x1 === start.x && y1 === start.y) ||
      //     (x1 === end.x && y1 === end.y)
      //   ) {
      //     nextPos.push([x1, y1]);
      //   }
      // }
    }

    currPos = nextPos;
    nextPos = [];
    time += 1;
  }
}

const steps = bfs(map.start, map.end);

console.log();
console.log('Found!');
console.log('Steps:', steps);

// for (let min = 0; min < path.length; min++) {
//   const { grid, blizzards } = map.getLocationCandidates(path[min], min + 1);

//   // console.log(`Minutes: ${min}\n${map.getOutput(grid, blizzards, path[min], [])}`);
// }

// console.log('Steps:', steps);
// let minutes = 0;

// setInterval(() => {
//   const { grid, blizzards } = map.getGridAfterMinutes(minutes);

//   console.log(map.getOutput(grid, blizzards));
//   minutes++;
// }, 1000);
