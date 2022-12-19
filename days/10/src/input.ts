const guideInput = `noop
addx 3
addx -5`;

const guideInput2 = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const input = `noop
noop
addx 5
addx 3
noop
addx 14
addx -12
noop
addx 5
addx 1
noop
addx 19
addx -15
noop
noop
noop
addx 7
addx -1
addx 4
noop
noop
addx 5
addx 1
addx -38
noop
addx 21
addx -18
addx 2
addx 2
noop
addx 3
addx 5
addx -6
addx 11
noop
addx 2
addx 19
addx -18
noop
addx 8
addx -3
addx 2
addx 5
addx 2
addx 3
addx -2
addx -38
noop
addx 3
addx 4
addx 5
noop
addx -2
addx 5
addx -8
addx 12
addx 3
addx -2
addx 5
addx 11
addx -31
addx 23
addx 4
noop
noop
addx 5
addx 3
addx -2
addx -37
addx 1
addx 5
addx 2
addx 12
addx -10
addx 3
addx 4
addx -2
noop
addx 6
addx 1
noop
noop
noop
addx -2
addx 7
addx 2
noop
addx 3
addx 3
addx 1
noop
addx -37
addx 2
addx 5
addx 2
addx 32
addx -31
addx 5
addx 2
addx 9
addx 9
addx -15
noop
addx 3
addx 2
addx 5
addx 2
addx 3
addx -2
addx 2
addx 2
addx -37
addx 5
addx -2
addx 2
addx 5
addx 2
addx 16
addx -15
addx 4
noop
addx 1
addx 2
noop
addx 3
addx 5
addx -1
addx 5
noop
noop
noop
noop
addx 3
addx 5
addx -16
noop`;

interface Register {
  X: number;
}

export class CRT {
  public screen: string[][] = [];

  public constructor(width: number, height: number) {
    for (let i = 0; i < height; i++) {
      this.screen.push(new Array(width).fill(' '));
    }
  }

  public draw(cycle: number, { X }: Register) {
    const row = Math.floor(cycle / this.screen[0].length);
    const col = cycle % this.screen[0].length;
    const lit = col === X - 1 || col === X || col === X + 1;

    if (this.screen[row] && this.screen[row][col]) {
      this.screen[row][col] = lit ? '#' : ' ';
    }
  }

  public toString() {
    return this.screen.map((row) => row.join('')).join('\n');
  }
}

export class CPU {
  public crt = new CRT(40, 6);
  public cycles = 0;
  public register: Register = {
    X: 1
  };

  public instructions = [new Instruction('noop'), new Instruction('addx')];

  public get signalStrength() {
    return this.register.X * this.cycles;
  }

  public execute(steps: { name: string; args: string[] }[], cb?: () => void) {
    for (const step of steps) {
      const instruction = this.instructions.find((i) => i.name === step.name)!;

      for (let i = 0; i < instruction.cycles; i++) {
        this.crt.draw(this.cycles, this.register);
        this.cycles++;

        if (cb) cb();
      }

      const { register } = instruction.execute(this.register, step.args);

      this.register = register;
    }
  }
}

class Instruction {
  public name;

  public constructor(name: string) {
    this.name = name;
  }

  public get cycles() {
    switch (this.name) {
      case 'noop':
        return 1;

      case 'addx':
        return 2;

      default:
        return 0;
    }
  }

  public execute(register: Register, args: string[]) {
    switch (this.name) {
      case 'addx':
        register.X += parseInt(args[0], 10);
        break;
    }

    return { register };
  }
}

export function getSteps() {
  return input.split('\n').map((line) => {
    const [name, ...args] = line.split(' ');

    return { name, args };
  });
}
