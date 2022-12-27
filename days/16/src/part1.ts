import { getValves, Valve } from './input';

const valves = getValves();

function bfs() {
  const queue: Valve[][] = [];
  const start = valves.find((x) => x.name === 'AA')!;

  queue.push([start]);

  const candidates: Valve[][] = [];

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];

    if (path.length > 30) {
      continue;
    }

    if (valves.every((v) => path.find((p) => p.name === v.name))) {
      candidates.push(path);
      continue;
    }

    for (const tunnel of current.tunnels) {
      queue.push([...path, tunnel]);
    }
  }

  return candidates;
}

function dfs() {
  const stack: Valve[][] = [];
  const start = valves.find((x) => x.name === 'AA')!;

  stack.push([start]);

  const candidates: Valve[][] = [];

  while (stack.length > 0) {
    const path = stack.pop()!;
    const current = path[path.length - 1];

    if (valves.every((v) => path.find((p) => p.name === v.name))) {
      return path;
    }

    for (const tunnel of current.tunnels) {
      stack.push([...path, tunnel]);
    }
  }

  return candidates;
}

console.log(dfs());
