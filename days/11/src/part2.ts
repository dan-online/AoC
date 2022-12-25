import { getMonkeys } from './input';

const monkeys = getMonkeys();
const oldLog = console.log;
const update = (round: number, time?: number) => {
  process.stdout.clearLine(-1);
  process.stdout.cursorTo(0);
  process.stdout.write(`Round ${round}/${10000} (${((round / 10000) * 100).toFixed(2)}%))${time ? ` at ${time.toFixed(2)}ms` : ''}`);
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
console.log = () => {};

for (let i = 0; i < 10000; i++) {
  // update(i);

  let total = 0;

  for (const monkey of monkeys) {
    const time = monkey.round(false);

    total += time;
  }

  update(i, total);
}

console.log = oldLog;

console.log(monkeys.map((x) => `Monkey ${x.id} has: ${x.items.join(', ')}`).join(`\n`));
console.log(monkeys.map((x) => `Monkey ${x.id} has inspected ${x.inspections} items.`).join(`\n`));

monkeys.sort((a, b) => b.inspections - a.inspections);

const top2 = monkeys.slice(0, 2);
const monkeyBusiness = top2[0].inspections * top2[1].inspections;

console.log(`The answer is: ${monkeyBusiness}`);
