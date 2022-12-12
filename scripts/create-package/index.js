
import path from 'node:path';
import fs from 'node:fs';
import ejs from 'ejs';

import {
  resolvePackagePath,
  resolveDirname,
  execChildProcessSync
} from '../utils.js';

const DIRNAME = resolveDirname(import.meta.url);

export default function createPackage({ name, version = '1.0.0' } = {}) {
  // 路径
  const srcPath = path.resolve(DIRNAME, './template');
  const destPath = resolvePackagePath(name);

  if (fs.existsSync(destPath)) {
    throw new Error(`目录已经存在：${destPath}`);
  }

  // 复制模板
  // TODO: 存在跨平台问题
  execChildProcessSync(`cp -r ${srcPath} ${destPath}`);
  // 渲染模板文件
  [
    'package.json.tpl',
    'README.md.tpl',
    'tsconfig.json.tpl'

  ].forEach((fileName) => {
    const filePath = path.resolve(destPath, fileName);
    renderTplFile(filePath, { name, version });
  });
  // 安装依赖
  execChildProcessSync('yarn install', {
    cwd: destPath
  });
}

function renderTplFile(filePath, data = {}) {
  ejs.renderFile(filePath, data, (error, str) => {
    if (error) {
      throw error;
    }

    const newFilePath = filePath.replace(/\.tpl$/, '');
    fs.writeFileSync(newFilePath, str, { encoding: 'utf-8' });
    fs.rmSync(filePath);
  });
}
