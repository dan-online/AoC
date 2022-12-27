import Queue, { DoneCallback, Job } from 'bee-queue';
import { cpus } from 'os';
import { isMainThread, Worker } from 'worker_threads';
import { getMap, Location } from './input';

const map = getMap();
const queue = new Queue('day24', {
  isWorker: !isMainThread
});

const clearJobs = async () => {
  await queue.destroy();
};

const { end, start } = map;
const jobProcess = async (job: Job<{ location: Location; time: number }>, done: DoneCallback<number>) => {
  const { location, time } = job.data;
  const { x, y } = location;

  if (x === end.x && y === end.y) {
    done(null, time);
  }

  const { candidates, blizzards } = map.getLocationCandidates(location, time + 1);

  for (const candidate of candidates) {
    if (!blizzards.find((x) => x.x === candidate.x && x.y === candidate.y)) {
      await queue.createJob({ location: candidate, time: time + 1 }).save();
    }
  }

  void job.remove();
};
// let num = 0;
// function bfs(start: Location, end: Location): { steps: number } {
//   const visited: { loc: Location; minutes: number }[] = [];
//   const queue: [Location, number][] = [];

//   queue.push([start, 1]);
//   while (queue.length > 0) {
//     num++;

//     const [current, minutes] = queue.shift()!;

//     if (current.x === end.x && current.y === end.y) {
//       return { steps: minutes };
//     }

//     // const start = performance.now();
//     const { candidates, grid, blizzards } = map.getLocationCandidates(current, minutes + 1);

//     if (!lastOutput || Date.now() - lastOutput > 1000) {
//       console.clear();
//       // console.log(`${(performance.now() - start).toFixed(2)}ms`);
//       console.log(`Minutes: ${minutes} at ${num}/s Queue: ${queue.length}\n${map.getOutput(grid, blizzards, current, candidates)}`);

//       lastOutput = Date.now();
//       num = 0;
//     }

//     for (const neighbour of candidates) {
//       if (!visited.find((x) => x.loc.x === neighbour.x && x.loc.y === neighbour.y && x.minutes >= minutes)) {
//         visited.push({ loc: neighbour, minutes });
//         queue.push([neighbour, minutes + 1]);
//       }
//     }
//   }

//   return { steps: -1 };
// }
// function bfs(start: Location, end: Location, startTime = 0): number {
//   let time = startTime;
//   let currPos = [start];
//   let nextPos = [];

//   while (true) {
//     while (currPos.length > 0) {
//       const location = currPos.pop()!;
//       const { x, y } = location;

//       if (x === end.x && y === end.y) {
//         return time;
//       }

//       const { candidates, blizzards } = map.getLocationCandidates(location, time + 1);

//       for (const candidate of candidates) {
//         if (!blizzards.find((x) => x.x === candidate.x && x.y === candidate.y)) {
//           nextPos.push(candidate);
//         }
//       }

//       if (!lastOutput || Date.now() - lastOutput > 1000) {
//         process.stdout.clearLine(-1);
//         process.stdout.cursorTo(0);
//         process.stdout.write(`Minutes: ${time} Queue: ${currPos.length}`);

//         lastOutput = Date.now();
//       }

//       // for (const [x1, y1] of [
//       //   [x + 1, y],
//       //   [x - 1, y],
//       //   [x, y + 1],
//       //   [x, y - 1],
//       //   [x, y]
//       // ]) {
//       //   if (
//       //     (x1 >= 1 && x1 <= xMax && y1 >= 1 && y1 <= yMax && !blizzards.has(x1, y1)) ||
//       //     (x1 === start.x && y1 === start.y) ||
//       //     (x1 === end.x && y1 === end.y)
//       //   ) {
//       //     nextPos.push([x1, y1]);
//       //   }
//       // }
//     }

//     currPos = nextPos;
//     nextPos = [];
//     time += 1;
//   }
// }

if (isMainThread) {
  const workers: Worker[] = [];

  void clearJobs().then(async () => {
    await queue.createJob({ location: start, time: 0 }).save();
  });

  for (const _ of cpus()) {
    workers.push(new Worker(__filename, { argv: process.argv }));
  }

  const interval = setInterval(async () => {
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);

    const stats = await queue.checkHealth();

    process.stdout.write(`Queue has active: ${stats.active}, waiting: ${stats.waiting}, completed: ${stats.succeeded}`);
  }, 200);

  queue.on('job succeeded', async (job, result) => {
    if (result === undefined) return;

    clearInterval(interval);
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);

    console.log('Job succeeded with result', result);

    for (const worker of workers) {
      await worker.terminate();
    }

    await clearJobs();

    process.exit();
  });
} else {
  queue.process(jobProcess);
}

// console.log();
// console.log('Found!');

// for (let min = 0; min < path.length; min++) {
//   const { grid, blizzards } = map.getLocationCandidates(path[min], min + 1);

//   // console.log(`Minutes: ${min}\n${map.getOutput(grid, blizzards, path[min], [])}`);
// }

// console.log('Steps:', steps);
// let minutes = 0;

// setInterval(() => {
//   const { grid, blizzards } = map.getGridAfterMinutes(minutes);

//   console.log(map.getOutput(grid, blizzards));
//   minutes++;
// }, 1000);
