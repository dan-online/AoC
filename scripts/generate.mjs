import { Spinner } from '@favware/colorette-spinner';
import { exec } from 'child_process';
import { copySync } from 'file-system';
import { readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'path';

const spinner = new Spinner('generate', { interval: 80 });

spinner.start();

async function generate() {
  const day = process.argv.slice(2)[0];

  spinner.update({ text: 'Generating day...' });
  if (!day) {
    console.log('Please provide a day number');
    return;
  }

  let dirFound = false;

  try {
    dirFound = statSync(path.resolve(process.cwd(), `./days/${day}`)).isDirectory();
  } catch {}

  if (dirFound) {
    console.log(`Day ${day} already exists`);
    return;
  }

  const dayTemplate = path.resolve(process.cwd(), './days/template');
  const dayPath = path.resolve(process.cwd(), `./days/${day}`);

  spinner.update({ text: 'Copying directory...' });

  copySync(dayTemplate, dayPath);

  spinner.update({ text: 'Changing package.json...' });

  const pkg = readFileSync(path.resolve(dayPath, 'package.json'), 'utf-8');
  const newPkg = pkg.replace(/template/g, day);

  writeFileSync(path.resolve(dayPath, 'package.json'), newPkg);

  spinner.update({ text: 'Running yarn...' });

  await new Promise((res, rej) => exec('yarn', (e) => (e ? rej(e) : res())));

  spinner.update({ text: 'Running first build...' });

  await new Promise((res, rej) => exec(`yarn build --filter ${day}`, (e) => (e ? rej(e) : res())));

  spinner.success({ text: `Finished, day ${day} was generated in days/${day}` });
}

void generate();
