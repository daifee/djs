#!/usr/bin/env node

import { program } from 'commander';
import createPackage from './scripts/create-package/index.js';

program
  .requiredOption('--name <name>', '包的名称，不需要`scope`前缀')
  .option('--version <version>', '包的版本号', '1.0.0')
  .parse();

const opts = program.opts();

createPackage(opts);
