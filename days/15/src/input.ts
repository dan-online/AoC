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

const text = `Sensor at x=3907621, y=2895218: closest beacon is at x=3790542, y=2949630
Sensor at x=1701067, y=3075142: closest beacon is at x=2275951, y=3717327
Sensor at x=3532369, y=884718: closest beacon is at x=2733699, y=2000000
Sensor at x=2362427, y=41763: closest beacon is at x=2999439, y=-958188
Sensor at x=398408, y=3688691: closest beacon is at x=2275951, y=3717327
Sensor at x=1727615, y=1744968: closest beacon is at x=2733699, y=2000000
Sensor at x=2778183, y=3611924: closest beacon is at x=2275951, y=3717327
Sensor at x=2452818, y=2533012: closest beacon is at x=2733699, y=2000000
Sensor at x=88162, y=2057063: closest beacon is at x=-109096, y=390805
Sensor at x=2985370, y=2315046: closest beacon is at x=2733699, y=2000000
Sensor at x=2758780, y=3000106: closest beacon is at x=3279264, y=2775610
Sensor at x=3501114, y=3193710: closest beacon is at x=3790542, y=2949630
Sensor at x=313171, y=1016326: closest beacon is at x=-109096, y=390805
Sensor at x=3997998, y=3576392: closest beacon is at x=3691556, y=3980872
Sensor at x=84142, y=102550: closest beacon is at x=-109096, y=390805
Sensor at x=3768533, y=3985372: closest beacon is at x=3691556, y=3980872
Sensor at x=2999744, y=3998031: closest beacon is at x=3691556, y=3980872
Sensor at x=3380504, y=2720962: closest beacon is at x=3279264, y=2775610
Sensor at x=3357940, y=3730208: closest beacon is at x=3691556, y=3980872
Sensor at x=1242851, y=838744: closest beacon is at x=-109096, y=390805
Sensor at x=3991401, y=2367688: closest beacon is at x=3790542, y=2949630
Sensor at x=3292286, y=2624894: closest beacon is at x=3279264, y=2775610
Sensor at x=2194423, y=3990859: closest beacon is at x=2275951, y=3717327`;

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
