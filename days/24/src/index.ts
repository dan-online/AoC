const indexOfFlag = process.argv.findIndex((x) => x === '--part');
const part = isNaN(parseInt(process.argv[indexOfFlag + 1], 10)) ? 1 : parseInt(process.argv[indexOfFlag + 1], 10);

if (part === 1) {
  import('./part1');
} else {
  import('./part2');
}
