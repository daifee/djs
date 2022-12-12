import fs from 'node:fs';
import {
  resolvePackagePath
} from './utils.js';

export default function removePackage(name) {
  const path = resolvePackagePath(name);

  fs.rmSync(path, {
    force: true,
    recursive: true
  });
}
