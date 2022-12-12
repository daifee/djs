
import process from 'node:process';
import path from 'node:path';
import url from 'node:url';

export const ROOT_PATH = process.cwd();

export function resolvePackagePath(name) {
  return path.resolve(ROOT_PATH, 'packages', name);
}

export function resolveDirname(importMetaURL) {
  return path.dirname(url.fileURLToPath(importMetaURL));
}
