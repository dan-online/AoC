import { Area } from './input';

const area = new Area();

console.log(area.findInArea(4000000));

// lol
// console.log(area.findInArea(4000000));
// console.log(area.multiThreadFind(12, 4000000));

/*
const promises: Promise<string>[] = [];

    for (let i = 0; i < threads; i++) {
      const inmin = Math.floor((max / threads) * i);
      const inmax = Math.floor((max / threads) * (i + 1));

      promises.push(new Promise((resolve) => resolve(this.findInArea(inmax, inmin))));
    }

    return Promise.all(promises);
    */

// if (isMainThread) {
//   const max = 4000000;
//   const workers = [];

//   process.stdin.resume();

//   let total = 0;

//   bc.onmessage = () => {
//     total++;
//     process.stdout.clearLine(-1);
//     process.stdout.cursorTo(0);
//     process.stdout.write(`${((total / max) * 100).toFixed(2)}%`);
//   };

//   for (let i = 0; i < 12; i++) {
//     const inmin = Math.floor((max / 12) * i);
//     const inmax = Math.floor((max / 12) * (i + 1));
//     const worker = new Worker(__filename, { workerData: { inmin, inmax } });

//     workers.push(worker);

//     worker.on('error', console.error);
//     worker.on('exit', (code) => {
//       if (code !== 0) console.error(new Error(`Worker stopped with exit code ${code}`));
//     });
//   }
// } else {
//   const area = new Area();
//   const { inmin, inmax } = workerData;

//   console.log(area.findInArea(inmax, inmin));
// }
