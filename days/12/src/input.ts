import chalk from 'chalk';

const guideInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;
const input = `abaaaaaccccccccccccccccccaaaaaaaaaaaaaccccaaaaaaaccccccccccccccccccccccccccccaaaaaa
abaaaaaaccaaaacccccccccccaaaaaaaaacaaaacaaaaaaaaaacccccccccccccccccccccccccccaaaaaa
abaaaaaacaaaaaccccccccccaaaaaaaaaaaaaaacaaaaaaaaaacccccccccccccaacccccccccccccaaaaa
abaaaaaacaaaaaacccccccccaaaaaaaaaaaaaaccaaacaaaccccccccccccccccaacccccccccccccccaaa
abccaaaccaaaaaacccaaaaccaaaaaaaaaaaaaccccaacaaacccccccccaacaccccacccccccccccccccaaa
abcccccccaaaaaccccaaaacccccaaaaacccaaaccaaaaaaccccccccccaaaaccccccccccccccccccccaac
abcccccccccaaaccccaaaacccccaaaaacccccccccaaaaaccccccccccklllllccccccccccccccccccccc
abcccccccccccccccccaaccccccccaaccccccccaaaaaaaccccccccckklllllllcccccddccccaacccccc
abaccccccccccccccccccccccccccaaccccccccaaaaaaaaccccccckkkklslllllcccddddddaaacccccc
abacccccccccccccccccccccccccccccccaaaccaaaaaaaaccccccckkkssssslllllcddddddddacccccc
abaccccccccccccccccccccccccccccccccaaaaccaaacaccccccckkksssssssslllmmmmmdddddaacccc
abcccccccccccccccaaacccccccccccccaaaaaaccaacccccccccckkkssssusssslmmmmmmmdddddacccc
abcccccccaaccccaaaaacccccccccccccaaaaaccccccaaaaaccckkkrssuuuussssqmmmmmmmmdddccccc
abcccccccaaccccaaaaaacccccccaaccccaaaaacccccaaaaacckkkkrruuuuuussqqqqqqmmmmdddccccc
abccccaaaaaaaacaaaaaacccccccaaaaccaaccaccccaaaaaacjkkkrrruuuxuuusqqqqqqqmmmmeeccccc
abcaaaaaaaaaaacaaaaaccccccaaaaaacccccaaccccaaaaajjjjrrrrruuuxxuvvvvvvvqqqmmmeeccccc
abcaacccaaaaccccaaaaaaacccaaaaacccacaaaccccaaaajjjjrrrrruuuxxxxvvvvvvvqqqmmeeeccccc
abaaaaccaaaaacccccccaaaccccaaaaacaaaaaaaacccaajjjjrrrrtuuuuxxxyvyyyvvvqqqnneeeccccc
abaaaaaaaaaaacccaaaaaaaccccaacaacaaaaaaaacccccjjjrrrttttuxxxxxyyyyyvvvqqnnneeeccccc
abaaaaaaaccaacccaaaaaaaaacccccccccaaaaaaccccccjjjrrrtttxxxxxxxyyyyyvvvqqnnneeeccccc
SbaaaaaacccccccccaaaaaaaaaccccccccaaaaacccccccjjjrrrtttxxxEzzzzyyyvvrrrnnneeecccccc
abaaaaacccccccccccaaaaaaacccccccccaaaaaaccccccjjjqqqtttxxxxxyyyyyvvvrrrnnneeecccccc
abaaacccccccccccaaaaaaaccaaccccccccccaaccaaaaajjjqqqttttxxxxyyyyyyvvrrrnnneeecccccc
abaaacccccccccccaaaaaaaccaaacaaacccccccccaaaaajjjjqqqtttttxxyywyyyywvrrnnnfeecccccc
abcaaacccccccaaaaaaaaaaacaaaaaaaccccccccaaaaaaciiiiqqqqtttxwyywwyywwwrrrnnfffcccccc
abcccccccccccaaaaaaaaaaccaaaaaacccccccccaaaaaacciiiiqqqqttwwywwwwwwwwrrrnnfffcccccc
abccccccccccccaaaaaacccaaaaaaaacccccccccaaaaaaccciiiiqqqttwwwwwswwwwrrrrnnfffcccccc
abccccccccccccaaaaaacccaaaaaaaaacccccccccaaacccccciiiqqqtswwwwssssrrrrrroofffcccccc
abccccccaaaaacaaaaaacccaaaaaaaaaaccccccccccccccccciiiqqqssswsssssssrrrrooofffaccccc
abccccccaaaaacaaccaaccccccaaacaaacccccccccccccccccciiiqqssssssspoorrrooooofffaacccc
abcccccaaaaaacccccccccccccaaacccccccccccccccccccccciiiqppssssspppooooooooffffaacccc
abcccccaaaaaacccccccccccccaacccccccccccccccccccccccciipppppppppppoooooooffffaaccccc
abcccccaaaaaaccccccccccccccccccccccccccccccccccccccciihppppppppgggggggggfffaaaccccc
abccccccaaacccccccccccccccccccccccaccccccccccccccccchhhhpppppphggggggggggfaaaaccccc
abaaaccccccccccccccccccccccaccccaaacccccccccccccccccchhhhhhhhhhgggggggggcaacccccccc
abaaccaaaccaccccccccccccccaaacccaaacaacccaaaaacccccccchhhhhhhhhgaaccccccccccccccccc
abaaacaaacaacccccccccaaaccaaaacaaaaaaaaccaaaaaccccccccchhhhhhaaaaacccccccccccccccca
abaaaccaaaaaccccccccccaaacaaaaaaaacaaaaccaaaaaaccccccccccaaacccaaaacccccccccccaccca
abcccaaaaaaccccccccccaaaaaaaaaaaaacaaaaccaaaaaaccccccccccaaaccccaaaccccccccccaaaaaa
abcccaaaaaaaacccccccaaaaaaaaaaaaaaaaaccccaaaaaacccccccccccccccccccccccccccccccaaaaa
abcccaacaaaaaccccccaaaaaaaaaaaaaaaaaaacccccaacccccccccccccccccccccccccccccccccaaaaa`;

const currentPosition = 'S'; // a height
const bestLocation = 'E'; // z height

export const heightmap: Height[] = [];

export class Height {
  public char: string;
  public x: number;
  public y: number;

  public constructor(char: string, x: number, y: number) {
    this.char = char;
    this.x = x;
    this.y = y;
  }
  public get height(): number {
    let char = this.char;
    if (this.char === currentPosition) {
      char = 'a';
    } else if (this.char === bestLocation) {
      char = 'z';
    }

    return char.charCodeAt(0) - 97 + 1;
  }

  public get children(): Height[] {
    const children: Height[] = [];

    const left = heightmap.find((x) => x.x === this.x - 1 && x.y === this.y);
    if (left) children.push(left);

    const right = heightmap.find((x) => x.x === this.x + 1 && x.y === this.y);
    if (right) children.push(right);

    const top = heightmap.find((x) => x.x === this.x && x.y === this.y - 1);
    if (top) children.push(top);

    const bottom = heightmap.find((x) => x.x === this.x && x.y === this.y + 1);
    if (bottom) children.push(bottom);

    return children;
  }

  public get candidates(): Height[] {
    const candidates = this.children.filter((x) => x.height <= this.height || x.height === this.height + 1);

    return candidates;
  }

  public get score(): number {
    if (this.char === 'E') return 0;

    const destination = heightmap.find((x) => x.char === 'E')!;

    const xDistance = destination.x - this.x;
    const yDistance = destination.y - this.y;
    const hDistance = destination.height - this.height;

    // higher score when further from location
    return Math.abs(xDistance) + Math.abs(yDistance) + Math.abs(hDistance);
  }
}

export const getHeightMap = () => {
  const lines = input.split('\n');

  for (const line of lines) {
    const heights = line.split('').map((char, i) => new Height(char, i, lines.indexOf(line)));
    heightmap.push(...heights);
  }

  return heightmap;
};

export const getWidth = () => {
  return input.split('\n')[0].length;
};

export const output = (path: Height[]) => {
  const lines: string[][] = [];
  const width = getWidth();

  for (let line = 0; line < heightmap.length / width; line++) {
    for (let char = 0; char < width; char++) {
      lines[line] = lines[line] || [];
      const inPathIdx = path.findIndex((x) => x.x === char && x.y === line);
      const inPath = path[inPathIdx];
      // use V to indicate down, > to indicate right, < to indicate left and ^ to indicate up
      let direction = chalk.bgWhite('X');

      let rainbow = [
        '#FF0000',
        '#FF3B00',
        '#FF7600',
        '#FFB100',
        '#FFEB00',
        '#D8FF00',
        '#9DFF00',
        '#62FF00',
        '#27FF00',
        '#00FF14',
        '#00FF4E',
        '#00FF89',
        '#00FFC4',
        '#00FFFF',
        '#00C4FF',
        '#0089FF',
        '#004EFF',
        '#0014FF',
        '#2700FF',
        '#6200FF',
        '#9D00FF',
        '#D800FF',
        '#FF00EB',
        '#FF00B1',
        '#FF0076',
        '#FF003B'
      ];

      if (inPath) {
        direction = '-';
        direction = chalk.bgWhite.black(direction);
      }

      const height = heightmap.find((x) => x.x === char && x.y === line)!;
      lines[line].push(inPath ? direction : height.height > 3 ? chalk.hex(rainbow[height.height - 1])(height.char) : height.char);
    }
    process.stdout.write(lines[line].join('') + '\n');
  }

  // console.log(lines.map((x) => x.map((y) => y).join('')).join('\n'));
};
