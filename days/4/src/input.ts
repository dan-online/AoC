const guideText = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

const text = `Sensor at x=3889276, y=3176133: closest beacon is at x=3738780, y=3090050
Sensor at x=3545888, y=1389980: closest beacon is at x=3687798, y=2823020
Sensor at x=2887269, y=2488344: closest beacon is at x=2809378, y=2513386
Sensor at x=3990278, y=43134: closest beacon is at x=2307159, y=135337
Sensor at x=3746631, y=2990632: closest beacon is at x=3738780, y=3090050
Sensor at x=7523, y=59064: closest beacon is at x=278652, y=-182407
Sensor at x=2662631, y=3349709: closest beacon is at x=2294322, y=3429562
Sensor at x=3999326, y=3030235: closest beacon is at x=3738780, y=3090050
Sensor at x=2788203, y=3722031: closest beacon is at x=3009520, y=4176552
Sensor at x=1872146, y=1228203: closest beacon is at x=1213036, y=1428271
Sensor at x=231045, y=2977983: closest beacon is at x=-362535, y=2000000
Sensor at x=2233881, y=421153: closest beacon is at x=2307159, y=135337
Sensor at x=3915820, y=2609677: closest beacon is at x=3687798, y=2823020
Sensor at x=2959514, y=2529069: closest beacon is at x=2809378, y=2513386
Sensor at x=1829825, y=2614275: closest beacon is at x=2809378, y=2513386
Sensor at x=1031015, y=2036184: closest beacon is at x=1213036, y=1428271
Sensor at x=3894267, y=3758546: closest beacon is at x=3738780, y=3090050
Sensor at x=2653530, y=445121: closest beacon is at x=2307159, y=135337
Sensor at x=1528274, y=1670020: closest beacon is at x=1213036, y=1428271
Sensor at x=3839068, y=2974837: closest beacon is at x=3738780, y=3090050
Sensor at x=254225, y=9603: closest beacon is at x=278652, y=-182407
Sensor at x=2214848, y=3333326: closest beacon is at x=2294322, y=3429562
Sensor at x=1008775, y=292264: closest beacon is at x=278652, y=-182407
Sensor at x=2072077, y=6712: closest beacon is at x=2307159, y=135337
Sensor at x=3344028, y=3459786: closest beacon is at x=3738780, y=3090050
Sensor at x=984627, y=3991112: closest beacon is at x=2294322, y=3429562
Sensor at x=198206, y=2034713: closest beacon is at x=-362535, y=2000000
Sensor at x=460965, y=1150404: closest beacon is at x=1213036, y=1428271
Sensor at x=2198999, y=3584784: closest beacon is at x=2294322, y=3429562
Sensor at x=3212614, y=2899682: closest beacon is at x=3687798, y=2823020
Sensor at x=3797078, y=2864795: closest beacon is at x=3687798, y=2823020
Sensor at x=2465051, y=2871666: closest beacon is at x=2809378, y=2513386
Sensor at x=2356218, y=3981953: closest beacon is at x=2294322, y=3429562
Sensor at x=2389861, y=1856461: closest beacon is at x=2809378, y=2513386
Sensor at x=2852352, y=2506253: closest beacon is at x=2809378, y=2513386
Sensor at x=2275278, y=742411: closest beacon is at x=2307159, y=135337
Sensor at x=1562183, y=3626443: closest beacon is at x=2294322, y=3429562
Sensor at x=44398, y=534916: closest beacon is at x=278652, y=-182407`;

class Sensor {
  public x: number;
  public y: number;
  public closestBeacon: { x: number; y: number };

  public constructor(x: number, y: number, beacon: { x: number; y: number }) {
    this.x = x;
    this.y = y;
    this.closestBeacon = beacon;
  }

  public get largestX() {
    return this.x + this.getTaxiDistanceToBeacon();
  }

  public get largestY() {
    return this.y + this.getTaxiDistanceToBeacon();
  }

  public testIsInArea(x: number, y: number, radius = this.getTaxiDistanceToBeacon()) {
    const xDistance = Math.abs(x - this.x);
    const yDistance = Math.abs(y - this.y);

    return xDistance + yDistance <= radius;
  }

  public getTaxiDistanceToBeacon() {
    const x = this.closestBeacon.x - this.x;
    const y = this.closestBeacon.y - this.y;

    return Math.abs(x) + Math.abs(y);
  }

  public findInArea(inc: number, max: number, check: any) {
    const radius = this.getTaxiDistanceToBeacon() + inc;

    // check top left side
    for (let i = 0; i < radius; i++) {
      const x = this.x - radius + i;
      const y = this.y + i;

      if (x > max || y > max || x < 0 || y < 0) continue;
      if (check(x, y)) {
        return { x, y };
      }
    }

    // check top right side
    for (let i = 0; i < radius; i++) {
      const x = this.x + i;
      const y = this.y + radius - i;

      if (x > max || y > max || x < 0 || y < 0) continue;
      if (check(x, y)) {
        return { x, y };
      }
    }

    // check bottom right side
    for (let i = 0; i < radius; i++) {
      const x = this.x + radius - i;
      const y = this.y - i;

      if (x > max || y > max || x < 0 || y < 0) continue;
      if (check(x, y)) {
        return { x, y };
      }
    }

    // check bottom left side
    for (let i = 0; i < radius; i++) {
      const x = this.x - i;
      const y = this.y - radius + i;

      if (x > max || y > max || x < 0 || y < 0) continue;
      if (check(x, y)) {
        return { x, y };
      }
    }
  }
}

export function getSensors() {
  const sensors: Sensor[] = [];

  for (const line of text.split('\n')) {
    const [sensor, beacon] = line.split(': ');
    const sensorX = Number(sensor.split(', ')[0].split('=')[1]);
    const sensorY = Number(sensor.split(', ')[1].split('=')[1]);
    const beaconX = Number(beacon.split(', ')[0].split('=')[1]);
    const beaconY = Number(beacon.split(', ')[1].split('=')[1]);
    const newSensor = new Sensor(sensorX, sensorY, { x: beaconX, y: beaconY });

    sensors.push(newSensor);
  }

  return sensors;
}

export class Area {
  public sensors: Sensor[] = getSensors();

  public constructor() {
    console.log(`Found area of ${this.largestX}x${this.largestY}`);
  }

  public get largestY() {
    return Math.max(...this.sensors.map((sensor) => sensor.y + sensor.getTaxiDistanceToBeacon()));
  }

  public get largestX() {
    return Math.max(...this.sensors.map((sensor) => sensor.x + sensor.getTaxiDistanceToBeacon()));
  }

  public get smallestX() {
    return Math.min(...this.sensors.map((sensor) => sensor.x - sensor.getTaxiDistanceToBeacon()));
  }

  public get smallestY() {
    return Math.min(...this.sensors.map((sensor) => sensor.y - sensor.getTaxiDistanceToBeacon()));
  }

  public checkYRow(y: number) {
    let sum = 0;

    for (let x = this.smallestY; x < this.largestY; x++) {
      if (this.checkXYCouldNotHaveBeacon(x, y)) {
        sum++;
      }
    }

    return sum;
  }

  public checkXYCouldNotHaveBeacon(x: number, y: number) {
    for (const sensor of this.sensors) {
      if (sensor.x === x && sensor.y === y) {
        return true;
      }

      if (sensor.closestBeacon.x === x && sensor.closestBeacon.y === y) {
        return false;
      }

      if (sensor.testIsInArea(x, y)) {
        return true;
      }
    }

    return false;
  }

  public checkCoveredBySensor(x: number, y: number, r: number) {
    for (const sensor of this.sensors) {
      if (sensor.x === x && sensor.y === y) {
        return true;
      }

      if (sensor.closestBeacon.x === x && sensor.closestBeacon.y === y) {
        return true;
      }

      if (sensor.testIsInArea(x, y, r)) {
        return true;
      }
    }

    return false;
  }

  public checkNotCoveredBySensor(x: number, y: number) {
    for (const sensor of this.sensors) {
      if (sensor.x === x && sensor.y === y) {
        return false;
      }

      if (sensor.closestBeacon.x === x && sensor.closestBeacon.y === y) {
        return false;
      }

      if (sensor.testIsInArea(x, y)) {
        return false;
      }
    }

    return true;
  }

  public tuningFreq({ x, y }: { x: number; y: number }) {
    return x * 4000000 + y;
  }

  public findInArea(max: number) {
    let inc = 1;

    while (true) {
      console.log('Radius increase of', inc);
      for (const sensor of this.sensors) {
        const res = sensor.findInArea(inc, max, (x: number, y: number) => this.checkNotCoveredBySensor(x, y));

        if (res) {
          console.log(res);
          return this.tuningFreq(res);
        }
      }

      inc++;
    }
  }
}
