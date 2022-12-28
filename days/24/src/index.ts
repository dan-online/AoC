const indexOfFlag = process.argv.findIndex((x) => x === '--part');
const part = indexOfFlag >= 0 ? process.argv[indexOfFlag + 1] : '1';

if (part === '1') {
  import('./part1');
} else if (part === 'bee') {
  import('./part1bee');
} else {
  import('./part2');
}
