import { getTreeHeights } from './input';

const trees = getTreeHeights();

console.log(`${trees.filter((x) => x.visible).length} trees are visible`);
// outputTreeLayout();
