const guideInput = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;

const input = `Blueprint 1: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 15 clay. Each geode robot costs 3 ore and 9 obsidian.
Blueprint 2: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 5 clay. Each geode robot costs 3 ore and 7 obsidian.
Blueprint 3: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 11 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 4: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 14 clay. Each geode robot costs 2 ore and 16 obsidian.
Blueprint 5: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 2 ore and 18 obsidian.
Blueprint 6: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 4 ore and 19 obsidian.
Blueprint 7: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 20 clay. Each geode robot costs 2 ore and 16 obsidian.
Blueprint 8: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 10 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 9: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 7 clay. Each geode robot costs 3 ore and 20 obsidian.
Blueprint 10: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 4 ore and 17 obsidian.
Blueprint 11: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 5 clay. Each geode robot costs 4 ore and 11 obsidian.
Blueprint 12: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 13 clay. Each geode robot costs 3 ore and 15 obsidian.
Blueprint 13: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 6 clay. Each geode robot costs 4 ore and 11 obsidian.
Blueprint 14: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 18 clay. Each geode robot costs 4 ore and 16 obsidian.
Blueprint 15: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 16: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 20 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 17: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 19 clay. Each geode robot costs 2 ore and 20 obsidian.
Blueprint 18: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 20 clay. Each geode robot costs 2 ore and 20 obsidian.
Blueprint 19: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 5 clay. Each geode robot costs 4 ore and 8 obsidian.
Blueprint 20: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 9 clay. Each geode robot costs 2 ore and 20 obsidian.
Blueprint 21: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 11 clay. Each geode robot costs 2 ore and 16 obsidian.
Blueprint 22: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 2 ore and 11 obsidian.
Blueprint 23: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 12 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 24: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 3 ore and 10 obsidian.
Blueprint 25: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 10 clay. Each geode robot costs 2 ore and 11 obsidian.
Blueprint 26: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 7 clay. Each geode robot costs 3 ore and 9 obsidian.
Blueprint 27: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 7 clay. Each geode robot costs 4 ore and 11 obsidian.
Blueprint 28: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 11 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 29: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 17 clay. Each geode robot costs 2 ore and 13 obsidian.
Blueprint 30: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 6 clay. Each geode robot costs 2 ore and 20 obsidian.`;

interface resources {
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
}

class Robot {
  public type: keyof resources;
  public ready = false;
  public constructor(type: keyof resources) {
    this.type = type;
  }
}

class Blueprint {
  public id: string;
  public resources: resources = {
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0
  };

  public robots: Robot[] = [];
  public recursiveProgress = 0;

  public costs: { type: keyof resources; resources: resources }[] = [];

  public constructor(id: string) {
    this.id = id;
    this.addRobot('ore', true);
  }

  public addRobot(type: keyof resources, ready = false) {
    const newRobot = new Robot(type);

    if (ready) newRobot.ready = true;

    this.robots.push(newRobot);
  }

  public canAfford(type: keyof resources, resources: resources) {
    const cost = this.costs.find((x) => x.type === type)!;

    // eslint-disable-next-line guard-for-in
    for (const resource in cost.resources) {
      const resourceId = resource as keyof resources;

      if (resources[resourceId] < cost.resources[resourceId]) {
        return false;
      }
    }

    return true;
  }

  public buyRobot(type: keyof resources) {
    const cost = this.costs.find((x) => x.type === type)!;
    let text = `bought 1 ${type} robot for: `;

    // eslint-disable-next-line guard-for-in
    for (const resource in cost.resources) {
      const resourceId = resource as keyof resources;
      const value = cost.resources[resourceId];

      this.resources[resourceId] -= value;
      if (value > 0) text += `${value} ${resourceId}, `;
    }

    console.log(text);

    this.addRobot(type);
  }

  public valueInOre(cost: resources) {
    let value = cost.ore;

    // eslint-disable-next-line guard-for-in
    for (const resource in cost) {
      const resourceId = resource as keyof resources;
      const val = cost[resourceId];

      if (resourceId === 'ore') continue;
      if (val > 0) value += this.valueInOre(this.costs.find((x) => x.type === resourceId)!.resources) * val;
    }

    return value;
  }

  public greedy() {
    let priceList = this.costs.map((x) => ({ type: x.type, value: this.valueInOre(x.resources) }));

    priceList.sort((a, b) => a.value - b.value);

    priceList = priceList.filter((x) => this.canAfford(x.type, this.resources));

    if (priceList.length < 2) return;

    let minimumPrice = priceList[0];
    let maximumProfit = { type: priceList[1].type, value: priceList[1].value - priceList[0].value };

    for (let i = 2; i < priceList.length; i++) {
      const currentPrice = priceList[i].value;
      const tentativeProfit = currentPrice - minimumPrice.value;

      if (tentativeProfit > maximumProfit.value) {
        maximumProfit = { type: priceList[i].type, value: tentativeProfit };
      }

      if (currentPrice < minimumPrice.value) {
        minimumPrice = { type: priceList[i].type, value: currentPrice };
      }
    }

    return maximumProfit;
  }

  public collectAndReady(robots = this.robots, resources: resources = this.resources) {
    const groupedRobots = robots.reduce<Robot[][]>((prev, curr) => {
      const foundIdx = prev.findIndex((x) => x[0].type === curr.type);

      if (!curr.ready) return prev;
      if (foundIdx >= 0) {
        prev[foundIdx].push(curr);
      } else {
        prev.push([curr]);
      }

      return prev;
    }, []);

    for (const robots of groupedRobots) {
      const { type } = robots[0];

      resources[type] += robots.length;
      // console.log(`${robots.length} ${type}-collecting robot collected ${robots.length} ${type}; you now have ${this.resources[type]} ${type}.`);
    }

    for (const robot of robots) {
      if (!robot.ready) {
        robot.ready = true;
        // console.log(
        //   `The new ${robot.type}-collecting robot is ready; you now have ${this.robots.filter((x) => x.type === robot.type).length} of them.`
        // );
      }
    }

    return { resources, robots };
  }

  public openGeodes(minutes: number) {
    const allMinutes = minutes;

    while (minutes > 0) {
      console.log(`== Minute ${allMinutes - minutes + 1} ==`);

      this.collectAndReady();

      minutes--;
      console.log('\n');
    }

    return this.resources.geode;
  }

  public reportRecursiveProgress() {
    const total = 4 ** 6;

    this.recursiveProgress++;
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);
    process.stdout.write(`Recursive progress: ${this.recursiveProgress}/${total} (${((this.recursiveProgress / total) * 100).toFixed(2)}%)`);
  }

  public recursivelyOpenGeodes(
    minutes: number,
    robots: Robot[],
    resources: resources,
    value: number,
    depth = 0
  ): { value: number; robots: Robot[]; resources: resources } {
    minutes++;
    depth++;
    if (minutes > 24 || depth > 6) return { value: this.valueInOre(resources), robots, resources };

    const { resources: newResources, robots: newRobots } = this.collectAndReady(robots, resources);
    const newValue = this.valueInOre(newResources);
    let winner = { value: newValue, robots: newRobots, resources: newResources };

    for (const type of ['ore', 'clay', 'obsidian', 'geode'] as (keyof resources)[]) {
      if (this.canAfford(type, resources)) {
        robots.push(new Robot(type));

        const current = this.recursivelyOpenGeodes(minutes, robots, resources, value, depth);

        if (current.value > winner.value) {
          winner = current;
        }
      }

      this.reportRecursiveProgress();
    }

    return this.recursivelyOpenGeodes(minutes, winner.robots, winner.resources, winner.value, depth);
  }
}

export function getBlueprints() {
  const blueprints = guideInput.split('\n').map((x) => {
    const blueprint = new Blueprint(x.split(':')[0].split('Blueprint ').join(''));
    const robots = x.split('Each ');

    robots.shift();
    robots.forEach((robot) => {
      const [robotType, cost] = robot.split(' robot costs ') as [keyof resources, string];
      const costs = cost.replace('.', '').split(' and ');
      const final = {
        type: robotType,
        resources: {
          ore: 0,
          clay: 0,
          obsidian: 0,
          geode: 0
        }
      };

      for (const cost of costs) {
        const [amount, resource] = cost.split(' ') as [amount: string, resource: keyof resources];

        final.resources[resource] += parseInt(amount, 10);
      }

      blueprint.costs.push(final);
    });

    return blueprint;
  });

  return blueprints;
}
