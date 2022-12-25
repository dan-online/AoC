import { getMap, Location } from './input';

const map = getMap();
let lastOutput = Date.now();

function bfs(start: Location, end: Location): { path: Location[]; steps: number } {
  const visited: { path: Location[]; loc: Location; minutes: number }[] = [];
  const queue: [Location, Location[], number][] = [];

  queue.push([start, [start], 1]);
  while (queue.length > 0) {
    const [current, path, minutes] = queue.shift()!;

    if (current.x === end.x && current.y === end.y) {
      return { path, steps: minutes };
    }

    // const start = performance.now();
    const { candidates, grid, blizzards } = map.getLocationCandidates(current, minutes);

    if (Date.now() - lastOutput > 1000) {
      console.clear();
      // console.log(`${(performance.now() - start).toFixed(2)}ms`);
      console.log(`Minutes: ${minutes}\n${map.getOutput(grid, blizzards, path[path.length - 1], candidates, path)}`);
      lastOutput = Date.now();
    }

    for (const neighbour of candidates) {
      if (!visited.find((x) => x.loc.x === neighbour.x && x.loc.y === neighbour.y && x.minutes === minutes)) {
        visited.push({ loc: neighbour, path: [...path, neighbour], minutes });
        queue.push([neighbour, [...path, neighbour], minutes + 1]);
      }
    }
  }

  return { path: [], steps: -1 };
}

const { path, steps } = bfs(map.start, map.end);

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
