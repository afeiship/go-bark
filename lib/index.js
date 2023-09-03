import { Command } from 'commander';
import { version } from '../package.json';
import fetch from 'node-fetch';
import sdf from '@jswork/simple-date-format';
import fs from 'fs';
import '@jswork/next-tmpl';
import { join } from 'path';

const program = new Command();
const API_URL = 'https://www.yiketianqi.com/free/day';
program.version(version);

program
  .option('-s, --src <string>', 'source filepath.', './src/myfile/sqlite3.db')
  .option('-d, --dst <string>', 'destination filepath.', '/Websites/test/')
  .parse(process.argv);

const getWeather = async () => {
  const url = `${API_URL}?appid=71122974&appsecret=1iDE4Irf&unescape=1`;
  const res = await fetch(url);
  return await res.json();
};

export async function cli() {
  const res = await getWeather();
  const date = {
    date_std: sdf('YYYY-MM-DD'),
    date_cn: sdf('YYYY年MM月DD日'),
    date_full: sdf('YYYY年MM月DD日 HH时mm分ss秒')
  };
  const tmplPath = join(__dirname, './templates/item.md');
  const tmplContent = fs.readFileSync(tmplPath).toString();
  const content = nx.tmpl(tmplContent, { ...res, ...date });
  const targetDir = sdf('YYYY/YYYY-MM');

  // create if not exists
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(`${targetDir}/${sdf('YYYY-MM-DD')}.md`, content);
}
