import { CPU, getSteps } from './input';

const steps = getSteps();
const cpu = new CPU();
const strengths: number[] = [];

cpu.execute(steps, () => {
  if ([20, 60, 100, 140, 180, 220].includes(cpu.cycles)) {
    console.log(`At ${cpu.cycles} cycles, the strength is ${cpu.signalStrength} as cycles is ${cpu.cycles} and X is ${cpu.register.X}`);
    strengths.push(cpu.signalStrength);
  }
});

console.log(`Total strength: ${strengths.reduce((prev, curr) => prev + curr, 0)}`);
