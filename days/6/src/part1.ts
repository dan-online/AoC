import { text } from './input';

let str = '';
const checkUnique = (a: string) => a.split('').every((letter, index, arr) => arr.indexOf(letter) === index);

for (let i = 0; i < text.length; i++) {
  const letter = text[i];

  str += letter;
  if (str.length < 4) continue;
  if (checkUnique(str)) {
    console.log(str, 'at', i + 1);
    break;
  }

  str = str.slice(1);
}
