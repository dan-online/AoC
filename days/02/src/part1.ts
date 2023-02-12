import type { choice } from './input';

const score = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
  X: 1, // rock
  Y: 2, // paper
  Z: 3 // scissors
};

const win: { [key: string]: choice } = {
  A: 'Y',
  B: 'Z',
  C: 'X'
};

// const guide = getGuide();
const guide: [choice, choice][] = [
  ['A', 'Y'],
  ['B', 'X'],
  ['C', 'Z']
];

const winScore = 6;
const drawScore = 3;
let myScore = 0;

for (const [theirChoice, myChoice] of guide) {
  myScore += score[myChoice];
  if (win[theirChoice] === myChoice) {
    myScore += winScore;
  }

  if (score[theirChoice] === score[myChoice]) {
    myScore += drawScore;
  }
}

console.log(myScore);
