import Queue, { DoneCallback, Job } from 'bee-queue';
import { cpus } from 'os';
import { isMainThread, Worker } from 'worker_threads';
import { getMap, Location } from './input';

const map = getMap();
const queue = new Queue('day24', {
  isWorker: !isMainThread,
  removeOnSuccess: true,
  removeOnFailure: true
});

const clearJobs = async () => {
  await queue.destroy();
};

const { end, start } = map;
const jobProcess = async (job: Job<{ location: Location; time: number }>, done: DoneCallback<number>) => {
  const { location, time } = job.data;
  const { x, y } = location;

  if (x === end.x && y === end.y) {
    return done(null, time);
  }

  const { candidates, blizzards } = map.getLocationCandidates(location, time + 1);

  for (const candidate of candidates) {
    if (!blizzards.find((x) => x.x === candidate.x && x.y === candidate.y)) {
      await queue.createJob({ location: candidate, time: time + 1 }).save();
    }
  }

  void job.remove();
};

if (isMainThread) {
  const workers: Worker[] = [];
  const threads = cpus();
  let succeeded = 0;

  queue.on('job succeeded', () => {
    succeeded++;
  });

  console.log(`Main thread here, starting up ${threads.length} workers.`);

  void clearJobs().then(() => {
    void queue.createJob({ location: start, time: 0 }).save();
  });

  for (const _ of threads) {
    workers.push(new Worker(__filename, { argv: process.argv }));
  }

  let lastUpdate: { succeeded: number; date: number } = { succeeded: 0, date: Date.now() };
  let i: NodeJS.Timeout;

  async function update() {
    const stats = await queue.checkHealth();

    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);

    const timeSince = Date.now() - lastUpdate.date;
    const succeedChange = succeeded - lastUpdate.succeeded;
    const succeedPerSecond = succeedChange / (timeSince / 1000);

    process.stdout.write(
      `Queue has active: ${stats.active}, waiting: ${stats.waiting}, completed: ${succeeded} speed: ${succeedPerSecond.toFixed(2)}/s`
    );

    lastUpdate = { succeeded: stats.succeeded, date: Date.now() };
    i = setTimeout(update, 10000);
  }

  void update();

  queue.on('job succeeded', async (job, result) => {
    if (result === undefined) return;

    for (const worker of workers) {
      await worker.terminate();
    }

    await clearJobs();

    clearTimeout(i);
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);

    console.log('Job succeeded with result', result);

    process.exit();
  });
} else {
  queue.process(1000, jobProcess);
}
