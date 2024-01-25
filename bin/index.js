#!/usr/bin/env node

import { Command } from 'commander';
import { join } from 'path';
import sdf from '@jswork/simple-date-format';
import fs from 'fs';
import os from 'os';
import { createRequire } from 'node:module';
import '@jswork/next-tmpl';

const __dirname = new URL('../', import.meta.url).pathname;
const require = createRequire(__dirname);
const pkg = require('./package.json');

const program = new Command();
const API_URL = 'https://www.yiketianqi.com/free/day';
const DIARY_ROOT = os.homedir() + '/github/diary';
const getWeather = async () => {
  const url = `${API_URL}?appid=71122974&appsecret=1iDE4Irf&unescape=1`;
  const res = await fetch(url);
  return await res.json();
};

program.version(pkg.version);
program.option('-f, --force', 'force to create').parse(process.argv);

/**
 * @help: diary -h
 * @description: diary -f
 */

class CliApp {
  async run() {
    const res = await getWeather();
    const { force } = program.opts();
    const date = {
      date_std: sdf('YYYY-MM-DD'),
      date_cn: sdf('YYYY年MM月DD日'),
      date_full: sdf('YYYY年MM月DD日 HH时mm分ss秒'),
    };

    const tmplPath = join(__dirname, 'bin/templates/item.md');
    const tmplContent = fs.readFileSync(tmplPath).toString();
    const content = nx.tmpl(tmplContent, { ...res, ...date });
    const targetDir = `${DIARY_ROOT}/${sdf('YYYY/YYYY-MM')}`;
    const targetFile = `${targetDir}/${sdf('YYYY-MM-DD')}.md`;
    const logprefix = sdf('datetime');

    // check if targetFile existes
    if (fs.existsSync(targetFile) && !force) {
      console.log(`[${logprefix}]: 📗 Diary file already exists, skip it.`);
    } else {
      // create if not exists
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(targetFile, content);
      console.log(`[${logprefix}]: 🌈 Diary file created.`);
    }
  }
}

new CliApp().run();
