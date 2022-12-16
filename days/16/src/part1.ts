// import { getValves } from './input';

import { getValves } from './input';

const minutes = Array(30)
  .fill('')
  .map((_, i) => i);

const location = 'AA';
let finished = 0;
let total = 0;
const getFlow = (route: { location: string; minute: number }[]): number => {
  let flow = 0;

  for (let min = 1; min <= 30; min++) {
    for (const r of route) {
      if (r.minute <= min) {
        const valve = valves.find((x) => x.name === r.location)!;

        flow += valve.flow;
      }
    }
  }

  return flow;
};

function rateRoute(route: { location: string; minute: number }[] = [], minute = 1): { route: { location: string; minute: number }[] } {
  if (minute >= 30) {
    return {
      route
    };
  }

  const next = route[route.length - 1];
  const valve = valves.find((x) => x.name === next.location)!;
  let largest: any | undefined;

  total += valve.tunnels.length;

  const updateConsole = () => {
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);
    process.stdout.write(`(${((finished / total) * 100).toFixed(2)}%) checking ${next.location} at ${route.length}`);
  };

  for (const v of valve.tunnels.filter((x) => x.flow > 0)) {
    const newRoute = [...route, { location: v.name, minute: minute + 2 }];

    updateConsole();

    const rating = rateRoute(newRoute, minute + 2);

    updateConsole();

    if (!largest || getFlow(rating.route) > largest.rating) largest = rating;
    finished++;
  }

  return largest || { route };
}

const valves = getValves();
const currentLocation = valves.find((x) => x.name === location);

if (!currentLocation) throw new Error('Where am I?');

const rating = rateRoute([{ location: 'AA', minute: 1 }]);

console.log();
console.log(rating.route);
console.log(getFlow(rating.route));
