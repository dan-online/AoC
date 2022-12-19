import { getMonkeys } from './input';

const monkeys = getMonkeys();

for (let i = 0; i < 20; i++) {
  for (const monkey of monkeys) {
    monkey.round();
  }
}

console.log(monkeys.map((x) => `Monkey ${x.id} has: ${x.items.join(', ')}`).join(`\n`));
console.log(monkeys.map((x) => `Monkey ${x.id} has inspected ${x.inspections} items.`).join(`\n`));

monkeys.sort((a, b) => b.inspections - a.inspections);

const top2 = monkeys.slice(0, 2);
const monkeyBusiness = top2[0].inspections * top2[1].inspections;

console.log(`The answer is: ${monkeyBusiness}`);
