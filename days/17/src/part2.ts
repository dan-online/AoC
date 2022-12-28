import { Area, getRockShapes, Rock, Space } from './input';

const shapes = getRockShapes();
const area = new Area(7, 4);
let rockIndex = 0;
let lastUpdate: { date: number; rocks: number } = { date: Date.now(), rocks: 0 };
const rockAndDrift: { rock: Rock; drift: { x: number; y: number }; height: number }[] = [];
let seen: { rock: Rock; drift: { x: number; y: number }; height: number }[] = [];
const maxRocks = 2022;
const compareRockShapes = (shape: Space[][], otherShape: Space[][]) => {
  if (shape.length !== otherShape.length) return false;
  if (shape[0].length !== otherShape[0].length) return false;

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (shape[y][x] !== otherShape[y][x]) return false;
    }
  }

  return true;
};

let patternLength: number[] = [];

function findPatternOfRocks(rock: Rock, drift: { x: number; y: number }, height: number) {
  // we found a rock that drifted to the same spot as a previous rock
  const found = rockAndDrift
    .slice()
    .reverse()
    .find((x) => x.drift.x === drift.x && x.drift.y === drift.y && compareRockShapes(x.rock.shape, rock.shape));

  if (found) {
    // if we haven't seen this rock before, add it to the seen list
    if (!seen.find((x) => compareRockShapes(x.rock.shape, rock.shape))) {
      seen.push(found);
    }
  } else {
    // if we haven't seen this pattern before, reset the seen list
    seen = [];
    rockAndDrift.push({ rock, drift, height });
  }

  // if we have seen all the rocks in the pattern, we have found the pattern
  if (seen.length === shapes.length) {
    // get the last rocks in the pattern
    const rocks = rockAndDrift.slice(-shapes.length);
    const newPatternLength = rocks[rocks.length - 1].height - rocks[0].height;
    // const newPatternLength = rocks[0].rock.y - rocks[rocks.length - 1].rock.y;
    const sloice = patternLength.slice(-shapes.length * rocks.reduce((a, b) => a + b.rock.affectedByJet, 0));

    if (sloice.length === shapes.length * rocks.reduce((a, b) => a + b.rock.affectedByJet, 0)) {
      if (sloice.some((x) => x !== newPatternLength)) {
        patternLength = [newPatternLength];
      } else {
        console.log(rocks);

        const remainingRocks = maxRocks - area.rocks.length;
        const patternIt = Math.floor(remainingRocks / rocks.length);
        const extraRocks = rocks.slice(0, remainingRocks % rocks.length).reduce((a, b) => a + b.rock.height, 0);
        const finalHeight = area.height + newPatternLength * patternIt + extraRocks;

        console.log(
          'pattern of',
          rocks.length,
          'rocks, of height',
          newPatternLength,
          'at',
          patternIt,
          'times +',
          extraRocks,
          'height, final height:',
          finalHeight
        );

        return finalHeight;
      }
    }

    patternLength.push(newPatternLength);
  }

  return null;
}

let tickSpeed = 0;

function run() {
  area.step();

  if (area.rocks.filter((x) => x.moving).length === 0 && area.rocks.length < maxRocks) {
    if (!shapes[rockIndex]) rockIndex = 0;
    if (area.rocks.length > 0) {
      performance.mark('removeStart');
      area.removeHeight();
      performance.mark('removeEnd');
      performance.measure('remove', 'removeStart', 'removeEnd');
    }

    const lastRock = area.rocks[area.rocks.length - 1];

    if (lastRock) {
      const drift = { x: lastRock.x - 3, y: lastRock.y - 0 };
      const { height } = area;
      const found = findPatternOfRocks(lastRock, drift, height);

      if (found) {
        console.log(found);
        process.exit();
      }
    }

    const nextRock = new Rock(3, 0, shapes[rockIndex].shape);
    const indexOfLastRockLine = area.spaces.findIndex((x) => x.includes(Space.Rock));
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

  if (!lastUpdate || Date.now() - lastUpdate.date > 500) {
    // process.stdout.clearLine(-1);
    // process.stdout.cursorTo(0);
    const perf = performance.getEntries().filter((x) => x.entryType === 'measure');
    const rocksPerSecond = ((area.rocks.length - lastUpdate.rocks) / ((Date.now() - lastUpdate.date) / 1000)).toFixed(0);

    console.clear();

    // const eta = ((maxRocks - area.rocks.length) / parseInt(rocksPerSecond, 10) / 60 / 60).toFixed(0);

    // process.stdout.write(
    //   `Rocks: ${area.rocks.length} Moving: ${area.rocks.filter((x) => x.moving).length} Done: ${((area.rocks.length / maxRocks) * 100).toFixed(
    //     2
    //   )}% Tick ${tickSpeed.toFixed(2)}ms Speed: ${rocksPerSecond} r/s ETA: ${eta}hr`
    // );

    console.log(
      `Rocks: ${area.rocks.length} Done: ${((area.rocks.length / maxRocks) * 100).toFixed(
        0
      )}% Speed: ${rocksPerSecond} r/s\n tick ${tickSpeed.toFixed(2)}ms \n ${perf.map((x) => `${x.name}: ${x.duration.toFixed(2)}`).join('\n ')}`
    );

    console.log(area.output(18));

    lastUpdate = { date: Date.now(), rocks: area.rocks.length };
  }

  performance.clearMeasures();
  performance.clearMarks();

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
  const start = performance.now();

  run();
  tickSpeed = performance.now() - start;
}
// run();

const height = area.rocks.reduce((acc, x) => (x.y > acc ? x.y : acc), 0);

area.output();
area.removeHeight();

console.log('\nFinal height:', height, area.height, `with ${area.rocks.length} rocks`);
