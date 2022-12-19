const guideInput = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

const input = `Monkey 0:
  Starting items: 59, 65, 86, 56, 74, 57, 56
  Operation: new = old * 17
  Test: divisible by 3
    If true: throw to monkey 3
    If false: throw to monkey 6

Monkey 1:
  Starting items: 63, 83, 50, 63, 56
  Operation: new = old + 2
  Test: divisible by 13
    If true: throw to monkey 3
    If false: throw to monkey 0

Monkey 2:
  Starting items: 93, 79, 74, 55
  Operation: new = old + 1
  Test: divisible by 2
    If true: throw to monkey 0
    If false: throw to monkey 1

Monkey 3:
  Starting items: 86, 61, 67, 88, 94, 69, 56, 91
  Operation: new = old + 7
  Test: divisible by 11
    If true: throw to monkey 6
    If false: throw to monkey 7

Monkey 4:
  Starting items: 76, 50, 51
  Operation: new = old * old
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 5

Monkey 5:
  Starting items: 77, 76
  Operation: new = old + 8
  Test: divisible by 17
    If true: throw to monkey 2
    If false: throw to monkey 1

Monkey 6:
  Starting items: 74
  Operation: new = old * 2
  Test: divisible by 5
    If true: throw to monkey 4
    If false: throw to monkey 7

Monkey 7:
  Starting items: 86, 85, 52, 86, 91, 95
  Operation: new = old + 6
  Test: divisible by 7
    If true: throw to monkey 4
    If false: throw to monkey 5`;

class Monkey {
  public id: string;

  // lists your worry level for each item the monkey is currently holding in the order they will be inspected.
  public items: number[];

  // shows how your worry level changes as that monkey inspects an item.
  public operation: string;

  // shows how the monkey uses your worry level to decide where to throw an item next.
  public testDivisible: number;
  public testThrowToIfTrue: string;
  public testThrowToIfFalse: string;

  public inspections = 0;

  public constructor(
    id: string,
    startingItems: number[],
    operation: string,
    testDivisible: number,
    testThrowToIfTrue: string,
    testThrowToIfFalse: string
  ) {
    this.id = id;
    this.items = startingItems;
    this.operation = operation;
    this.testDivisible = testDivisible;
    this.testThrowToIfTrue = testThrowToIfTrue;
    this.testThrowToIfFalse = testThrowToIfFalse;
  }

  public round(worryDivision = true) {
    // console.log(`Monkey ${this.id}:`);

    const start = performance.now();

    for (const item of this.items) {
      this.inspections++;
      // console.log(`  Monkey inspects an item with a worry level of ${item}.`);

      // eslint-disable-next-line prefer-const
      let newLevel = item;

      eval(this.operation.split('new').join('newLevel').split('old').join('item'));
      // const evaluated = this.operation.split('old ')[1];
      // const op = evaluated.split('').find((x) => isNaN(parseInt(x)))!;
      // const unnum = evaluated.split(op).join('').trim();
      // const num = unnum === 'old' ? item : parseInt(unnum, 10);

      // switch (op) {
      //   case '+':
      //     newLevel += num;
      //     break;

      //   case '-':
      //     newLevel -= num;
      //     break;

      //   case '*':
      //     newLevel *= num;
      //     break;

      //   case '/':
      //     newLevel /= num;
      //     break;

      //   default:
      //     throw new Error(`Unknown operation ${op}`);
      // }

      if (worryDivision) {
        // console.log(`    Worry level is ${this.operation} to ${newLevel}.`);

        newLevel /= 3;

        // console.log(`    Worry level is divided by 3 to ${newLevel}.`);
      } else {
        newLevel = newLevel % monkeys.reduce((prev, curr) => prev * curr.testDivisible, 1);
      }
      newLevel = Math.floor(newLevel);
      const divisable = newLevel % this.testDivisible === 0;
      // console.log(`    Worry level is ${divisable ? '' : 'not '}divisible by ${this.testDivisible}.`);

      if (divisable) {
        const monkeyIdx = monkeys.findIndex((monkey) => monkey.id === this.testThrowToIfTrue);

        if (monkeyIdx >= 0) {
          monkeys[monkeyIdx].items.push(newLevel);

          // console.log(`    Item with worry level ${newLevel} is thrown to monkey ${monkeys[monkeyIdx].id}.`);
        }
      } else {
        const monkeyIdx = monkeys.findIndex((monkey) => monkey.id === this.testThrowToIfFalse);

        if (monkeyIdx >= 0) {
          monkeys[monkeyIdx].items.push(newLevel);
          // console.log(`    Item with worry level ${newLevel} is thrown to monkey ${monkeys[monkeyIdx].id}.`);
        }
      }

      this.items = this.items.filter((i) => i !== item);
    }

    return performance.now() - start;
  }
}

const monkeys: Monkey[] = [];

export function getMonkeys() {
  const monkeyLines = input.split('\n\n');
  let monkey: Monkey | undefined;

  for (const monkeyLine of monkeyLines) {
    for (const line of monkeyLine.split('\n')) {
      if (line.trim().startsWith('Monkey')) {
        monkey = new Monkey(line.split(':')[0].split(' ')[1], [], '', 0, '', '');
      } else if (line.trim().startsWith('Starting items:')) {
        monkey!.items = line
          .split(':')[1]
          .split(',')
          .map((item) => parseInt(item.trim(), 10));
      } else if (line.trim().startsWith('Operation:')) {
        monkey!.operation = line.split(':')[1].trim();
      } else if (line.trim().startsWith('Test:')) {
        monkey!.testDivisible = parseInt(line.split('by ')[1], 10);
      } else if (line.trim().startsWith('If true:')) {
        monkey!.testThrowToIfTrue = line.split('monkey ')[1].trim();
      } else if (line.trim().startsWith('If false:')) {
        monkey!.testThrowToIfFalse = line.split('monkey ')[1].trim();
      }
    }

    if (monkey) monkeys.push(monkey);
  }

  return monkeys;
}
