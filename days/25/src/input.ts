const guideInput = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

const input = `1--=111-1-2022-=0
1-0221000==22=
20-0--001-02200--=0
2-=-
12---1=0=21
1010=1=0-2=-0
10-102=0=--0=--2
22-0=002--10=0=02=
1-12111==-1---0
220=--100-20011---
11=20
2121==1
1112---0-212011
1=--01
2=2=22002--=0=22-
12==--1==-0002
1220--211-0-
1=1-1-
2-=01-01-1
1==10--20-=01
1=0--=-2=02-020-=2
1=--2211=200=-=0
2=----12211==1-10
1111-
2=
11=100=-10-2-
202-2
2-210110==20011-
1=010-2==02211=221=2
22
20-===01=2=--=0
121=0
11=0-0-
1201==
1=1=2
1==111000=02=
1-==11-==--202-=11
1==2120=22010
1=0-02020
1=--22-01-2
20=-01
2-2211000=--0=02-
12-102101
100-01122
1-01-
201=22-111201
10122-20--11-
2-
1--2=-=110=20
1==022
1==22=02=01=11
1=0111111
2==202--=2--=1-0
1-21-222-122
2-002--=
2=--01
1=22-102021102002
1--22
201-0=
11-==
20==
2122=0-10
11---2121===---
11-00-=-=21-=---=2
2===010=-2=1120
1-==-1-==2=1==1
1-0
1-00-01==---111200=
1=-0-=02
1=111=0110=122
120-22==200-1
100=01011=1
2=22==10
11220-11=-=00==-
11-=002====1=2-
1-122--=-11
1=-
1===1=20022
1-==10012=00
1=2=1201102-
2==1=1=2-0=220=012
2-==21=1-
2==1-01=21
2=--
2
22=12-21-0=-1001-1
11220-2=201=221-
221==-10-10-01
10=1==-101110=
10=02-=
2-11000
1==2
1002-2=1
1-=---
210-=01=1==10
100-0
101
1=1
22--20
102122022
2--211-=-011=2
1=101---12=2-1=2
120=10111220-2=
2=0-=2==--202=0-
1=10===0=2
1=01
1=2121=0
1==10=2=120102=
12221=---2=1
2-200222=
1-2-0-=1=-=022
111-020000===
22-
2==-==---=`;

const i = process.argv.find((x) => x === '--prod') ? input : guideInput;
const mapping: { [key: string]: number } = {
  '=': -2,
  '-': -1
};

const mappingBack: { [key: string]: string } = {
  '-2': '=',
  '-1': '-'
};

/*
  Decimal          SNAFU
        1              1
        2              2
        3             1=
        4             1-
        5             10
        6             11
        7             12
        8             2=
        9             2-
       10             20
       15            1=0
       20            1-0
     2022         1=11-2
    12345        1-0---0
314159265  1121-1110-1=0
*/
class SNAFUToNumbers {
  public numbers: number[] = [];
  public original: string;

  public constructor(numbers: number[], original: string) {
    this.numbers = numbers;
    this.original = original;
  }

  public get real() {
    const numbers = [];

    for (let i = this.numbers.length - 1; i >= 0; i--) {
      const number = this.numbers.slice().reverse()[i];

      numbers.unshift(number * 5 ** i);
    }

    return numbers;
  }

  public get sum() {
    return this.real.reduce((a, b) => a + b, 0);
  }
}

export class NumbersToSNAFU {
  public numbers: number[] = [];

  public constructor(numbers: number[]) {
    this.numbers = numbers;
  }

  public get real() {
    const numbers = [];
    let number = Number(this.numbers.join(''));

    while (number > 0) {
      let remainder = number % 5;

      number = Math.floor(number / 5);

      if (remainder > 2) {
        remainder -= 5;
        number++;
      }

      numbers.unshift(mappingBack[remainder] || remainder);
    }

    return numbers.join('');
  }
}

export const getNumbers = (): SNAFUToNumbers[] => {
  const numbers = i.split('\n');
  const numbersObj = numbers.map((x) => {
    const numbers = x.split('').map((x) => mapping[x] || Number(x));

    return new SNAFUToNumbers(numbers, x);
  });

  return numbersObj;
};
