import { getArea, Grid } from './input';

const area = getArea();
let rounds = 10;

while (rounds > 0) {
  area.round();
  rounds--;
}

console.log(area.grid.reduce((count, line) => count + line.reduce((prev, loc) => (loc.type === Grid.Empty ? prev + 1 : prev), 0), 0));
