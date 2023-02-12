const indexOfFlag = process.argv.findIndex((x) => x === '--part');
const part = isNaN(parseInt(process.argv[indexOfFlag + 1], 10)) ? 1 : parseInt(process.argv[indexOfFlag + 1], 10);

void (async () => {
  const start = performance.now();

  if (part === 1) {
    await import('./part1');
  } else {
    await import('./part2');
  }

  if (part === 3) {
    await import('./part1');
    await import('./part2');
  }

  console.log(`Part ${part === 3 ? 'all' : part} took ${performance.now() - start}ms to run.`);
})();
