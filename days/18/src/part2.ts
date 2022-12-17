import { getDroplet } from './input';

const droplet = getDroplet();

console.log(`Droplet surface area: ${droplet.getSurfaceArea()}`);

// console.log(droplet.cubes.map((x) => x.sides).join('\n'));

console.log(droplet.getSurfaceAreaWithoutAirPockets());
