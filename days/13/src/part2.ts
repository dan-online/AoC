import { getPairs, Pair } from './input';

const pairs = getPairs();

for (const pair of pairs) {
  let indice = pairs.indexOf(pair) + 1;
  if (pair.isValid()) {
    console.log(`Pair ${indice} is valid`);
  } else {
    console.log(`Pair ${indice} is invalid`);
    let { left, right } = pair;
    pair.right = left;
    pair.left = right;
    if (pair.isValid()) {
      console.log(`Pair ${indice} is valid`);
    } else {
      throw new Error("Flip didn't work");
    }
  }
}

const output = [];

const dividers = [new Pair([[2]], [], true), new Pair([[6]], [], true)];
const packets = [...pairs.map((pair) => new Pair(pair.left, [])), ...pairs.map((pair) => new Pair(pair.right, [])), ...dividers];
// const packets = [...pairs.map((pair) => new Pair(pair.left, [])), ...pairs.map((pair) => new Pair(pair.right, []))];
// const dividers = packets.filter(
// (x) => Array.isArray(x.left) && x.left.length === 1 && Array.isArray(x.left[0]) && x.left[0].length === 1 && typeof x.left[0][0] === 'number'
// );
packets.sort((a, b) => a.first - b.first);

for (const packet of packets) {
  output.push(packet.first.toString().padStart(2, ' ') + ': ' + JSON.stringify(packet.left));
}

const indices = [];

for (let idx = 0; idx < packets.length; idx++) {
  let indice = idx + 1;
  const packet = packets[idx];
  if (dividers.find((x) => x.id == packet.id)) {
    indices.push(indice);
  }
}

console.log(output.map((x) => x.slice(0, 100) + (x.length >= 97 ? '...' : '')).join('\n'));
console.log(
  'Dividers:',
  dividers.map((x) => x.left)
);
console.log('Indices:', indices);
console.log(indices.reduce((prev, curr) => prev * curr, 1));

// 27560 too high
