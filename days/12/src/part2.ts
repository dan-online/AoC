import { getHeightMap, Height, output } from './input';

const heightmap = getHeightMap();
const end = heightmap.find((x) => x.char === 'E')!;

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

const all = [];

for (const start of heightmap.filter((x) => x.char === 'a')) {
  const { path, steps } = bfs(start, end);

  // output(path);
  if (steps > 0) all.push({ start, path, steps });
}

all.sort((a, b) => a.steps - b.steps);
console.log(all[0].steps);
output(all[0].path);
