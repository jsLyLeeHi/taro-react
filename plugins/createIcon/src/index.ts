#!/usr/bin/env node

import colors from 'colors';
import { getConfig } from './libs/getConfig';
import { fetchXml } from './libs/fetchXml';
import { generateTaroComponent } from './libs/generateTaroComponent';

const config = getConfig();

fetchXml(config.symbol_url).then((result) => {
  generateTaroComponent(result, config);
}).catch((e) => {
  console.error(colors.red(e.message || 'Unknown Error'));
  process.exit(1);
});
