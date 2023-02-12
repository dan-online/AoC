import { getTreeHeights } from './input';

const trees = getTreeHeights();
let winner = 0;
const updateProgress = (idx: number) => {
  process.stdout.clearLine(-1);
  process.stdout.cursorTo(0);
  process.stdout.write(`Progress: ${idx}/${trees.length}`);
};

for (const tree of trees) {
  const treeScore = tree.scenicScore;

  if (treeScore > winner) {
    winner = treeScore;
  }

  updateProgress(trees.indexOf(tree));
}

// 267904 is too low
console.log(`\nTree score: ${winner}`);
