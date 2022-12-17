import { getBlueprints } from './input';

const blueprints = getBlueprints();

// console.log(blueprints[0]);

// for (const blueprint of blueprints) {
//   console.log(`${blueprint.id}: ${blueprint.openGeodes(24)}`);
// }

console.log(blueprints[0].recursivelyOpenGeodes(0, blueprints[0].robots, blueprints[0].resources, 0));
