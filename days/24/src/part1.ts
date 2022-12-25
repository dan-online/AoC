import { getMap, Location } from './input';

const map = getMap();
let lastOutput: number;
let num = 0;

function bfs(start: Location, end: Location): { steps: number } {
  const visited: { loc: Location; minutes: number }[] = [];
  const queue: [Location, number][] = [];

  queue.push([start, 1]);
  while (queue.length > 0) {
    num++;

    const [current, minutes] = queue.shift()!;

    if (current.x === end.x && current.y === end.y) {
      return { steps: minutes };
    }

    // const start = performance.now();
    const { candidates, grid, blizzards } = map.getLocationCandidates(current, minutes + 1);

    if (!lastOutput || Date.now() - lastOutput > 1000) {
      console.clear();
      // console.log(`${(performance.now() - start).toFixed(2)}ms`);
      console.log(`Minutes: ${minutes} at ${num}/s Queue: ${queue.length}\n${map.getOutput(grid, blizzards, current, candidates)}`);

      lastOutput = Date.now();
      num = 0;
    }

    for (const neighbour of candidates) {
      if (!visited.find((x) => x.loc.x === neighbour.x && x.loc.y === neighbour.y && x.minutes >= minutes)) {
        visited.push({ loc: neighbour, minutes });
        queue.push([neighbour, minutes + 1]);
      }
    }
  }

  return { steps: -1 };
}

const { steps } = bfs(map.start, map.end);

console.log('Found!');

// for (let min = 0; min < path.length; min++) {
//   const { grid, blizzards } = map.getLocationCandidates(path[min], min + 1);

//   // console.log(`Minutes: ${min}\n${map.getOutput(grid, blizzards, path[min], [])}`);
// }

console.log('Steps:', steps);
// let minutes = 0;

// setInterval(() => {
//   const { grid, blizzards } = map.getGridAfterMinutes(minutes);

//   console.log(map.getOutput(grid, blizzards));
//   minutes++;
// }, 1000);
