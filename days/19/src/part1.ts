import { getBlueprints } from './input';

const blueprints = getBlueprints();

for (const blueprint of blueprints.slice(0, 1)) {
  blueprint.openGeodes(24);

  console.log(`\nBlueprint: ${blueprint.id} has quality ${blueprint.resources.geode * blueprint.id}`);
}
