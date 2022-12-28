import { Area, getRockShapes, Rock, Space } from './input';

const shapes = getRockShapes();
const area = new Area(7, 4);
let rockIndex = 0;
const maxRocks = 2022;
let lastUpdate: { date: number; rocks: number } = { date: Date.now(), rocks: 0 };

function run() {
  area.step();

  if (area.rocks.filter((x) => x.moving).length === 0 && area.rocks.length < maxRocks) {
    // area.output();
    if (!shapes[rockIndex]) rockIndex = 0;
    if (area.rocks.length > 0) {
      area.removeHeight();
      // return area.output();
    }

    const nextRock = new Rock(3, 0, shapes[rockIndex].shape);
    // area.addHeight(nextRock.height);
    const indexOfLastRockLine = area.spaces.findIndex((x) => x.includes(Space.Rock)); // 4
    // add enough lines so the next rock is 3 away from the last rock
    // const toAddLines = 3 - indexOfLastRockLine + nextRock.height;
    const toAddLines = nextRock.height + 3;

    // console.log(toAddLines);
    if (indexOfLastRockLine > -1) {
      if (toAddLines > 0) {
        area.addHeight(toAddLines);
      }
    } else {
      area.addHeight(1);
    }

    area.addRock(nextRock);
    rockIndex++;
  }

  if (!lastUpdate || Date.now() - lastUpdate.date > 200) {
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);

    const rocksPerSecond = ((area.rocks.length - lastUpdate.rocks) / ((Date.now() - lastUpdate.date) / 1000)).toFixed(0);
    const eta = ((maxRocks - area.rocks.length) / parseInt(rocksPerSecond, 10)).toFixed(0);

    process.stdout.write(
      `Rocks: ${area.rocks.length} Moving: ${area.rocks.filter((x) => x.moving).length} Done: ${((area.rocks.length / maxRocks) * 100).toFixed(
        2
      )}% Speed: ${rocksPerSecond} r/s ETA: ${eta}s`
    );

    lastUpdate = { date: Date.now(), rocks: area.rocks.length };
  }

  // if (area.rocks.length >= maxRocks && area.rocks.filter((x) => x.moving).length === 0) {
  //   const height = area.rocks.reduce((acc, x) => (x.y > acc ? x.y : acc), 0);

  //   area.removeHeight();
  //   console.log(area.output());
  //   console.log('\nFinal height:', height, area.height, `with ${area.rocks.length} rocks`);

  //   return;
  // }

  // area.output(true);
  // setTimeout(run, 1);
  // setImmediate(run);

  // run();
}

while (!(area.rocks.length >= maxRocks && area.rocks.filter((x) => x.moving).length === 0)) {
  run();
}
// run();

const height = area.rocks.reduce((acc, x) => (x.y > acc ? x.y : acc), 0);

area.output();
area.removeHeight();

console.log('\nFinal height:', height, area.height, `with ${area.rocks.length} rocks`);
