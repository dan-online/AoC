import { getValves, Valve } from './input';

const valves = getValves();

// function bfs() {
//   const queue: Valve[][] = [];
//   const start = valves.find((x) => x.name === 'AA')!;
//   const explored: Valve[] = [];

//   queue.push([start]);

//   const candidates: Valve[][] = [];

//   while (queue.length > 0) {
//     const path = queue.shift()!;
//     const current = path[path.length - 1];

//     if (path.length > 30) {
//       continue;
//     }

//     if (valves.every((v) => path.find((p) => p.name === v.name))) {
//       candidates.push(path);
//       continue;
//     }

//     for (const tunnel of current.tunnels) {
//       if (explored.find((x) => x.name === tunnel.name)) return;
//       queue.push([...path, tunnel]);
//       explored.push(tunnel);
//     }
//   }

//   return candidates;
// }

// function dfs() {
//   const stack: Valve[][] = [];
//   const start = valves.find((x) => x.name === 'AA')!;

//   stack.push([start]);

//   const candidates: Valve[][] = [];

//   while (stack.length > 0) {
//     const path = stack.pop()!;
//     const current = path[path.length - 1];

//     if (valves.every((v) => path.find((p) => p.name === v.name))) {
//       return path;
//     }

//     for (const tunnel of current.tunnels) {
//       stack.push([...path, tunnel]);
//     }
//   }

//   return candidates;
// }

// lets just get the paths
function bfs(graph, root: Valve) {
  const queue: Valve[] = [];
  const explored = new Set();

  root.paths = {};

  explored.add(root.name);
  queue.push(root);

  while (queue.length > 0) {
    const current = queue.shift();

    for (const valve of graph[current.name]._tunnels) {
      if (!explored.has(valve)) {
        explored.add(valve);
        root.paths[valve] = (root.paths[current.name] || 0) + 1;
        queue.push(graph[valve]);
      }
    }
  }

  return root;
}

function calculatePaths() {
  const graph = Object.fromEntries(valves.map((x) => [x.name, x]));

  for (const node of valves) {
    bfs(graph, node);
  }

  return graph;
}

function addFlow(graph, openValves: { [key: string]: number }) {
  let sum = 0;

  // eslint-disable-next-line guard-for-in
  for (const key in openValves) {
    sum += graph[key].flow;
  }

  return sum;
}

const graph = calculatePaths();
const time = 30;
const queue: {
  node: string;
  time: number;
  flow: number;
  openValves: { [key: string]: number };
}[] = [];

const root = {
  node: 'AA',
  time,
  flow: 0,
  openValves: {}
};

queue.push(root);

let maxFlow = 0;

while (queue.length > 0) {
  const current = queue.shift()!;

  if (current.time <= 0) {
    throw new Error('should not happen');
  }

  const options = Object.values(graph).filter((valve) => valve.flow > 0 && !current.openValves[valve.name]);

  if (options.length === 0) {
    const ending = current.flow + current.time * addFlow(graph, current.openValves);

    if (ending > maxFlow) {
      maxFlow = ending;
    }
  }

  for (const valve of options) {
    const steps = graph[current.node].paths[valve.name] + 1;

    if (current.time - steps <= 0) {
      const ending = current.flow + current.time * addFlow(graph, current.openValves);

      if (ending > maxFlow) {
        maxFlow = ending;
      }
    } else {
      queue.push({
        node: valve.name,
        time: current.time - steps,
        flow: current.flow + steps * addFlow(graph, current.openValves),
        openValves: { ...current.openValves, [valve.name]: current.time - steps }
      });
    }
  }
}

console.log(maxFlow);
