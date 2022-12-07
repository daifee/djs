
import path from 'node:path';
import url from 'node:url';
import fs from 'node:fs';
import process from 'node:process';
import { execSync } from 'node:child_process';
import ejs from 'ejs';

const ROOT_PATH = process.cwd();

function getDirname(importMetaURL) {
  return path.dirname(url.fileURLToPath(importMetaURL));
}

export default function createPackage({ name, version = '1.0.0' } = {}) {
  // 路径
  const srcPath = path.resolve(getDirname(import.meta.url), './template');
  const destPath = path.resolve(ROOT_PATH, `packages/${name}`);

  if (fs.existsSync(destPath)) {
    throw new Error(`目录已经存在：${destPath}`);
  }

  // 复制模板
  // TODO: 存在跨平台问题
  execSync(`cp -r ${srcPath} ${destPath}`, {
    cwd: ROOT_PATH,
    stdio: ['pipe', process.stdout, process.stderr]
  });
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
  execSync('yarn install', {
    cwd: destPath,
    stdio: ['pipe', process.stdout, process.stderr]
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
