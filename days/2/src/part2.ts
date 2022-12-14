import { choice, getGuide } from './input';

const score = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
  X: 1, // lose
  Y: 2, // draw
  Z: 3 // win
};

const guide = getGuide();
// const guide: [choice, choice][] = [
//   ['A', 'Y'],
//   ['B', 'X'],
//   ['C', 'Z']
// ];
const whoBeatsWho: { [key: string]: choice } = {
  A: 'B',
  B: 'C',
  C: 'A'
};

const whoLosesWho: { [key: string]: choice } = {
  B: 'A',
  C: 'B',
  A: 'C'
};

const winScore = 6;
const drawScore = 3;
let myScore = 0;

for (const [theirChoice, myOutcome] of guide) {
  if (myOutcome === 'Z') {
    // win
    const myChoice = whoBeatsWho[theirChoice];

    myScore += winScore;
    myScore += score[myChoice];
  }

  if (myOutcome === 'Y') {
    // draw
    myScore += drawScore;
    myScore += score[theirChoice];
  }

  if (myOutcome === 'X') {
    const myChoice = whoLosesWho[theirChoice];

    myScore += score[myChoice];
  }
}

console.log(myScore);
