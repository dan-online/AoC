const guideInput = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;

const input = `#.####################################################################################################
#>.^>^v<^v>>>v<.>v><vv<<<.^^>>^v.^^v^vv<<><>v><v>v^>^<<>vvv<<>v>>.^>>^.^>..<<v<v<^.>.>^^<><><><^^.^<>#
#>vv<<v<<<<v>v<v^.<.v<<><v<<.<>>^^.>.^v>^^.^^.><v>><<^^^^<^>>.v.><v.v.<<<<<v>v<^>v^<>^v<^.<^^>^>vv>^>#
#>^.^>^^^v<>v><>v^vv>v>>v<v<<..><><<>v<>v>v^v>vv<v.<.v^vv<v>.>v<^>v>>v..v<>^v.>v.><^><<v<vvv<^>v>.^<>#
#<.v.v^<>^v<<^>v^>v^<.<>>^<><>v.<v>^^><><v>^^>^>.^.v>.<vv>^.>.vv^v^^<^>^.<>.^>^>^><.>>>>^<<v>^^><^v<>#
#<<v<^^v^><.v<v.^>^^<..^^.>v^<^^^^.<><v<^^><^>><^>^v^>.vvvvv^<^>^v<^>^<^>><<>^v<>^^^v<<^>vvv>v^^^<.<<#
#<v^v><<>^^.<v^.v><<>>v^vv<^<^^.v<.v><>><<<.v<.<<<<v>.<><^<v^<>vv^>v<v>^^><^^^v>.^^^<><>>v>v<>^v>>v^<#
#<..^vv>^vv^>v<^<>..^<^v<^><<<>>.vvv^v^>>v>^^>.<<vvv<v.>^>><vv<^^.v^v.v>>><^<<<>^v.>><v>^^>^v<v>^vv>>#
#<^^>v^v^v^>.>v<<>>>^^>vvvvv<>^.v>><>^<>>v^^^^^v<>>>^^>>>^.>><.>v>v^><.^vv^<<<<^v<><^^>vv..^^v^<<^<v>#
#>.v<v^.<v.^vvv^>>^<v^^<<^><><v>>^^>.^v<vv<>><^<.v.v<.<.^vvv^.^v^v><v<<.<>^<v>>v<^^>^vv<.vvv<<^<vv<v<#
#<<v<>>v<<^>v><v.><<.<>^^vvvv^<>.v>v^v.^^>.^^^>^>^>^^><v>.v^>v^vv><<>><^<<vvvv^v<>v^<<.^^v>.>>>><^>^<#
#<>>>>vv>^^<^<^^^^^><v^^<>vvv<><<>v^.vvv^>^v^>v<^<^v>>vvvv^vv<<>.vv<.<vv^^>>>v>>^>v><<v<><v.><v^vvv<>#
#><vv^v<vv<<v^>^.^^>>v>v.^<^v<^v>.vv.^>><><>^<^v>>v<.^.<^.>.^v<.<.>^>^.^>>>>v<^>v>^..^.v<^.><.<<.<^>>#
#<>>^<^v<.<v^v>^^>^>.v^<v>v<^<>^>>.^v><^>vv<<>v>>v>.v<>>^^v>>v<<^^v^v...^.^><^^^.^vvv>vv><<>^<<><<.^>#
#>v^<^^^v^>><.>.v<v>^.v^^.<^^v^.<v<<.>v<.^v>^^...^^^<^>^^vv>v>v>v^v<>vv>>vv^>>>><>^vv^v^<<vv^.><^v<^<#
#<><><><v><><<^^v.^v<>v^<v>>v^v<<^^.^>.<<<>.><^^vv>v<<<<>>v^^^>^<<^^<^.<>>><^^v.<>v>.<.<>>v>>v>>>>v^.#
#>^v>>>>.^<^.v>>><^<<v.<<^vv.^<.>><>v.><>vv>v<.^v.<<^<v<^.v<<^^<<^^<^<v.v>vv^v<vv.^v.<^^>^>^..vv^^>>>#
#..<.><.v<>^>>v<>.>^v.>^vv>>...<.>><<v^v<<>>vv>>v^><<^^>^^.>v.>>>v^^^<.<<v>>^<v<^^<v<v<>>^.<^v>.^^<<<#
#<.<v.><vv<v<^<v<.vv^.v>v^v<.<>v^>>^<^vv>.<^<>.^><<>>.<.<<<><<<^v<^^<><>^^<v.<v>>>>vv.>v^><>v.><^<v.>#
#>^>^>^<<<^v^<<^v>^<.^vvv<>>^>>v>>>^><v<>..>v>>>^^vvv><v^^>^v^.^<v><v.>.<<^vv>^^.<^^v>^><^<^^v<>>>.<>#
#<v^<v><.>v>vv.^>v^^.vv^><^>^^^v^<v^^vvv>><.<..v^v^>^<<^>>^>^>^.>>vv.^>>.v>>><<<>>^<<.>v.v>.<><v<>v>>#
#>^.<<>>vv^<v^v<<>>>>^><vv<^v>>>^v><>v<><v>.>v>^v>><vv><.><<<^^v<>.^<v><><v^>>><<vv.v>^vv>v<<>^<^v^v<#
#<<.vv.<v^vv><>^<^^v^<<<<^>>^><^vv>^^<^.v^>^.v<^^<v<<.<v<^^.<^v^.<^.v>v<v><.>^vv.vv^vv^<<<>.>v^v.v.><#
#<>>>>>v>v.v^>><>v^<^<<<^<vv>>v<<<><v<>.^^<^vvv^.>>><v<<.^v<v<v.^v.v<>v<v<v>v^>>>v>^v<<>>.<>vvv^>>>v<#
#<^.<<^<v>v<^^v<^<<>v.<<^^<.<>><<><>v<><.<<<^>v.^>v<<>.^><vv^>>>vvvv^<^v^>v<^v<>.<vv>^v><v<v^>.v<<v>>#
#<.<v><>^>>.>v^vv>^^<^><.>>^v^<><>v^^v<>>.v.>v>.^^vvvv<><>v^>v>v<<.^v^^<v^^v>v^^v>v><>v>vvv<^>^>^<v<>#
#<v<.<>^^^<vv.^^>v>^.>>>.<<><vvv^>vvv.<v<.v>v<.<<v<^<^^><^^^.>^<.v>><<^^.^.<^v^.<>v.v^><<<^.<.^^vvv^>#
#<v.v><.>>><.><<>>.^>.<<v>>^>.>^>v>v>>..v^^><v.><<^vv>^v^>.>>><>^.vvv^.<<>vv>><<>>vv>v<<<^<>v>><>vv<<#
#>v^^v<><>^^>v^><^^<>.^vv>vv^^^<<.^^vv^<^^^v>.v^^<^><^<<v>>^..^<<<<^vv>><v<^<>^>v>^>.>.<<<>.^^>vv^^>>#
#>.>^<^>.v^>>>vv<>>^>><<>v^.^>.>>><^^^<><>^v>^vv><vv>.>v^<^^v>vv^vv<v.<>vv.>.<^^<><v>v>^^<.<vv<<^vv^>#
#>.>>^<^.^><<v.^<^^v<^^<v<<><v^><^.>^><>v>>>^.^^>>><><^>>>><>^^.v^>><.>.^>.<^.v^<<<>>>>><.^vv<>>vv<^>#
#>v>^^<v.<>^v.<v>v^v>^^.>>>.>.<<^<<>^v>><.v>v^<>>vv^>v<.<^^v<>vv^^<v>>v>^v>^<^v<>^v^<.^>^.<>>><.^v>..#
#>.^^.<>.>v^^>>^>^^<.<<>..>>^><><<v<^><<^v^<>v><v>^>><><<v^<^<v<v.v<.>.>>>>^^^v<.v><><><v<^<vv.>>><.>#
#<>^>.v>v>v<v<v>v.>^<v^vv<vvv>^v<^>^v><>.<><vv>v<<.<v>>^^v>^<vv.><>v.^^.>.^<^v<.><^^>><<>.^^v.>v><<.<#
#>>v.v>^^.>>>.<>>^v<^>.<>^^<<><.v><v.>>>^^<>>>^>v>>^>^v>><><^.^^><^^^><v^><v><v^>^.>v>>>v<><vv<v^.>.>#
#>>>>>^<<^v^v<<^>.vv.vv^^v^<vv.>>>v^.<..^v^^v<><v>^<<^.^.v<^.<<<>vv>..^v>>><>^<v<>><^^.^^>^.^^>v>><v>#
####################################################################################################.#`;

const i = process.argv.find((x) => x === '--prod') ? input : guideInput;

enum Grid {
  Wall = '#',
  Empty = '.',
  BlizzardRight = '>',
  BlizzardLeft = '<',
  BlizzardUp = '^',
  BlizzardDown = 'v'
}

export interface Coord {
  x: number;
  y: number;
}

export class Location {
  public x: number;
  public y: number;
  public type: Grid;

  public constructor(x: number, y: number, type: Grid) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  public get blizzard() {
    return this.type === Grid.BlizzardRight || this.type === Grid.BlizzardLeft || this.type === Grid.BlizzardUp || this.type === Grid.BlizzardDown;
  }
}

class Map {
  public grid: Location[][] = [];
  public blizzards: Location[] = [];
  public constructor(grid: Location[][], blizzards: Location[]) {
    this.blizzards = blizzards;
    this.grid = grid;
  }

  public getOutput(grid: Location[][], blizzards: Location[], me: Location, candidates: Location[], path?: Location[]) {
    return grid
      .map((row) =>
        row
          .map((loc) => {
            const bliz = blizzards.filter((x) => x.x === loc.x && x.y === loc.y);

            // if (me.x === loc.x && me.y === loc.y) {
            //   return chalk.green('M');
            // }

            // if (path && path.find((x) => x.x === loc.x && x.y === loc.y)) {
            //   return chalk.blue('P');
            // }

            // if (candidates.find((x) => x.x === loc.x && x.y === loc.y)) {
            //   return chalk.red('C');
            // }

            if (me.x === loc.x && me.y === loc.y) {
              return 'M';
            }

            if (path && path.find((x) => x.x === loc.x && x.y === loc.y)) {
              return 'P';
            }

            if (candidates.find((x) => x.x === loc.x && x.y === loc.y)) {
              return 'C';
            }

            return bliz.length > 0 ? (bliz.length > 1 ? bliz.length : bliz[0].type) : loc.type;
          })
          .join('')
      )
      .join('\n');
  }

  public getGridAfterMinutes(minutes: number) {
    const grid = this.grid.map((row) => row.map((x) => new Location(x.x, x.y, x.type)));
    const blizzards = this.blizzards.map((x) => new Location(x.x, x.y, x.type));

    // if (minutes > grid[0].length || minutes > grid.length) {
    //   // make minutes the remainder of the grid length
    //   minutes %= grid[0].length * grid.length;
    // }

    while (minutes > 0) {
      for (const blizzard of blizzards) {
        switch (blizzard.type as Omit<Grid, Grid.Wall | Grid.Empty>) {
          case Grid.BlizzardRight: {
            const right = grid[blizzard.y][blizzard.x + 1]!;

            if (right.type === Grid.Wall) {
              blizzard.x = 1;
              break;
            }

            blizzard.x++;

            break;
          }

          case Grid.BlizzardLeft: {
            const left = grid[blizzard.y][blizzard.x - 1]!;

            if (left.type === Grid.Wall) {
              blizzard.x = grid[0].length - 2;
              break;
            }

            blizzard.x--;

            break;
          }

          case Grid.BlizzardUp: {
            const up = grid[blizzard.y - 1][blizzard.x];

            if (up.type === Grid.Wall) {
              blizzard.y = grid.length - 2;
              break;
            }

            blizzard.y--;

            break;
          }

          case Grid.BlizzardDown: {
            const down = grid[blizzard.y + 1][blizzard.x];

            if (down.type === Grid.Wall) {
              blizzard.y = 1;
              break;
            }

            blizzard.y++;
          }
        }
      }

      minutes--;
    }

    return { grid, blizzards };
  }

  public getLocationCandidates(loc: Location, minutes: number) {
    const { grid, blizzards } = this.getGridAfterMinutes(minutes);
    const candidates: Location[] = [];

    if (loc.y > 0) {
      const up = grid[loc.y - 1][loc.x];

      if (up.type !== Grid.Wall && !blizzards.find((loc) => loc.x === up.x && loc.y === up.y)) candidates.push(up);
    }

    if (loc.y < grid.length - 1) {
      const down = grid[loc.y + 1][loc.x];

      if (down.type !== Grid.Wall && !blizzards.find((loc) => loc.x === down.x && loc.y === down.y)) candidates.push(down);
    }

    if (loc.x > 0) {
      const left = grid[loc.y][loc.x - 1];

      if (left.type !== Grid.Wall && !blizzards.find((loc) => loc.x === left.x && loc.y === left.y)) candidates.push(left);
    }

    if (loc.x < grid[0].length - 1) {
      const right = grid[loc.y][loc.x + 1];

      if (right.type !== Grid.Wall && !blizzards.find((loc) => loc.x === right.x && loc.y === right.y)) candidates.push(right);
    }

    candidates.push(loc);

    return { candidates, grid, blizzards };
  }

  public get start() {
    return this.grid[0].find((x) => x.type === Grid.Empty)!;
  }

  public get end() {
    return this.grid[this.grid.length - 1].find((x) => x.type === Grid.Empty)!;
  }
}

/*
Notes:
0,0 is top left
Blizzards move 1 space in their direction every minute
When a blizzard hits a wall, it appeares on the other side of the map in the same row/column
Blizzards can occupy the same space
You can move 1 space in any direction or stay in place
*/

export const getMap = () => {
  const grid: Location[][] = [];
  const blizzards: Location[] = [];
  const rows = i.split('\n');

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];

    grid[y] = new Array(row.length);

    for (let x = 0; x < row.length; x++) {
      const newLoc = new Location(x, y, row[x] as Grid);

      if (newLoc.blizzard) {
        blizzards.push(newLoc);
        grid[y][x] = new Location(x, y, Grid.Empty);
      } else {
        grid[y][x] = newLoc;
      }
    }
  }

  return new Map(grid, blizzards);
};
