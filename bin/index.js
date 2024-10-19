#!/usr/bin/env node

import { Command, Option } from 'commander';
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
const API_URL = 'https://api.map.baidu.com/weather/v1/';
const DIARY_ROOT = os.homedir() + '/github/diary';
const BAIDU_TQ_AK = process.env.BAIDU_TIANQI_AK;

// district_id
// 310100: 上海市
// 420100: 武汉市
const cities = {
  wuhan: 420100,
  wh: 420100,
  shanghai: 310100,
  sh: 310100,
};

const getWeather = async (city) => {
  const _city = city || 'shanghai';
  const code = cities[_city];
  console.log(`[getWeather]: 🌈 Fetching weather of ${_city}...`);
  const url = `${API_URL}?district_id=${code}&data_type=all&ak=${BAIDU_TQ_AK}`;
  const res = await fetch(url);
  try {
    return await res.json();
  } catch (error) {
    return Promise.reject(error);
  }
};

program.version(pkg.version);
program
  .option('-f, --force', 'force to create')
  .addOption(new Option('-c, --city <string>', 'weather of city').choices(['wuhan', 'shanghai']))
  .parse(process.argv);

/**
 * @help: diary -h
 * @description: diary -f
 */

class CliApp {
  async run() {
    const { force, city: _city } = program.opts();
    const res = await getWeather(_city);
    const date = {
      date_std: sdf('YYYY-MM-DD'),
      date_cn: sdf('YYYY年MM月DD日'),
      date_full: sdf('YYYY年MM月DD日 HH时mm分ss秒'),
    };

    const tmplPath = join(__dirname, 'bin/templates/item.md');
    const tmplContent = fs.readFileSync(tmplPath).toString();
    const weatherRes = nx.get(res, 'result.forecasts[0]');
    const city = nx.get(res, 'result.location.city');
    const content = nx.tmpl(tmplContent, { city, ...weatherRes, ...date });
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
