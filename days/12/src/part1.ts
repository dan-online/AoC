import { getHeightMap, Height, output } from './input';

const heightmap = getHeightMap();
const start = heightmap.find((x) => x.char === 'S')!;
const end = heightmap.find((x) => x.char === 'E')!;
// let location = start;

// let path: Height[] = [];
// const blacklist: Height[] = [];

// let lastOutput = new Date().getTime();
// let message = '';

// async function run() {
//   while (location.char !== 'E') {
//     output();
//     // process.stdout.clearLine(-1);
//     // process.stdout.cursorTo(0);
//     // process.stdout.write(location.char + ' (' + location.x + ',' + location.y + ') : ' + location.score);

//     const x = location.x;
//     const y = location.y;

//     const right = heightmap.find((h) => h.x === x + 1 && h.y === y)!;
//     const left = heightmap.find((h) => h.x === x - 1 && h.y === y)!;
//     const up = heightmap.find((h) => h.x === x && h.y === y - 1)!;
//     const down = heightmap.find((h) => h.x === x && h.y === y + 1)!;

//     const notThatWay = (x: Height) => {
//       return path.includes(x) || blacklist.includes(x);
//     };

//     const nextLocations = [right, left, up, down].filter(
//       (x) => x && (x.height <= location.height || x.height === location.height + 1) && !notThatWay(x)
//     );

//     message = nextLocations.map((x, i) => (i === 0 ? chalk.green('>') : '-') + x.char + ' (' + x.x + ',' + x.y + ') : ' + x.score).join('\n');

//     if (nextLocations.length === 0) {
//       if (location.char === 'S') {
//         output();
//         break;
//       }
//       blacklist.push(location);
//       path.pop()!;
//       location = path[path.length - 1];

//       if (!location) {
//         location = start;
//         path = [location];
//       }
//       continue;
//     }

//     const bestLocation = nextLocations.sort((a, b) => a.score - b.score)[0];

//     console.log(nextLocations.map((x) => x.char + ' (' + x.x + ',' + x.y + ') : ' + x.score).join(', '));

//     path.push(bestLocation);
//     location = bestLocation;
//     if (location.char === 'E') break;
//   }
// }

// run();

// // use a bfs to find the shortest path and return the path array
// function bfs() {
//   const queue: Height[][] = [];

//   queue.push([start]);

//   while (queue.length > 0) {
//     updateConsole(queue);

//     const path = queue.shift()!;
//     const location = path[path.length - 1];

//     const x = location.x;
//     const y = location.y;

//     const right = heightmap.find((h) => h.x === x + 1 && h.y === y)!;
//     const left = heightmap.find((h) => h.x === x - 1 && h.y === y)!;
//     const up = heightmap.find((h) => h.x === x && h.y === y - 1)!;
//     const down = heightmap.find((h) => h.x === x && h.y === y + 1)!;

//     const notThatWay = (x: Height) => {
//       return path.includes(x);
//     };

//     const nextLocations = [right, left, up, down].filter(
//       (x) => x && (x.height <= location.height || x.height === location.height + 1) && !notThatWay(x)
//     );

//     nextLocations.sort((a, b) => a.score - b.score);

//     for (const nextLocation of nextLocations) {
//       const newPath = [...path, nextLocation];
//       if (nextLocation.char === 'E') return newPath;
//       queue.push(newPath);
//     }
//   }

//   return [];
// }

function bfs(start: Height, end: Height): { path: Height[]; steps: number } {
  const visited: { path: Height[]; height: Height }[] = [];
  const queue: [Height, Height[]][] = [];

  queue.push([start, [start]]);
  while (queue.length > 0) {
    const [current, path] = queue.shift()!;

    if (current === end) {
      return { path, steps: path.length - 1 };
    }

    for (const neighbour of current.candidates) {
      if (!visited.find((x) => x.height === neighbour)) {
        visited.push({ height: neighbour, path: [...path, neighbour] });
        queue.push([neighbour, [...path, neighbour]]);
      }
    }
  }

  return { path: [], steps: -1 };
}

const { path, steps } = bfs(start, end);

console.log(`Path length: ${steps}`);
output(path);
