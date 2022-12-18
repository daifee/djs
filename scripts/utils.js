
import process from 'node:process';
import path from 'node:path';
import url from 'node:url';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import chalk from 'chalk';

export const ROOT_PATH = process.cwd();

export const PACKAGES_DIR = path.resolve(ROOT_PATH, 'packages');
export const SCOPE = '@daifee';

/**
 * 执行子进程
 * options默认值：
 * - cwd: `ROOT_PATH`
 * - stdio: `['pipe', process.stdout, process.stderr]`
 */
export function execChildProcessSync(command, options = {}) {
  const opts = {
    cwd: ROOT_PATH,
    stdio: ['pipe', process.stdout, process.stderr],
    ...options
  };

  console.log(chalk.blue('\n➤ execSync'));
  console.log(chalk.blue(`${opts.cwd}$ ${command}`));
  const label = chalk.green(`${command} 耗时：`);

  console.time(label);
  const result = execSync(command, opts);
  console.timeEnd(label);

  return result;
}

/**
 * 工作空间列表
 * ```ts
 * type Workspace = {
 *  location: string, // `packages/queue`
 *  name: string // `@daifee/queue`
 * };
 * ```
 * @returns [Workspace] 工作空间列表；`yarn workspaces list --json`的返回项
 */
export function workspacesList() {
  if (workspacesList._value) {
    return workspacesList._value;
  }

  const workspacesJSON = execChildProcessSync('yarn workspaces list --json', {
    encoding: 'utf-8',
    stdio: 'pipe'
  });

  workspacesList._value = workspacesJSON.split('\n')
    .map((json) => {
      try {
        return JSON.parse(json);
      } catch (err) {
        return null;
      }
    })
    .filter((obj) => {
      return obj !== null;
    });

  return workspacesList._value;
}

/**
 * 遍历工作空间，执行回调函数
 * @param {(workspace: Workspace) => void} cb 回调函数
 * @returns
 */
export function workspacesForeach(cb) {
  return workspacesList().forEach(cb);
}

/**
 * 工作空间下执行script
 * @param {Workspace} workspace 工作空间
 * @param {stirng} script 脚本名称`pkg.scripts[script]`
 */
export function wrokspaceRunCommand(workspace, command) {
  const dir = workspaceResolvePath(workspace);

  execChildProcessSync(command, {
    cwd: dir
  });
}

/**
 * 获取工作空间目录
 * @param {Workspace} workspace 工作空间对象
 */
export function workspaceResolvePath(workspace) {
  return path.resolve(ROOT_PATH, workspace.location);
}

/**
 * 判断工作空间中是否有对应脚本
 * @param {Workspace} workspace 工作空间
 * @param {string} scriptName 脚本名称
 * @returns
 */
export function workspaceExistsScript(workspace, scriptName) {
  const file = path.resolve(workspaceResolvePath(workspace), 'package.json');
  const pkg = parseJsonFile(file);

  if (pkg.scripts && pkg.scripts[scriptName]) {
    return true;
  }

  return false;
}

export function parseJsonFile(filePath) {
  const json = readFileSync(filePath, { encoding: 'utf-8' });
  try {
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
}

/**
 * 当前文件所在目录 `__dirname`
 * @returns {string}
 */
export function resolveDirname(importMetaURL) {
  return path.dirname(url.fileURLToPath(importMetaURL));
}

/**
 * 处理包的名称；兼容处理两种情况：`@daifee/queue`, `queue`
 * @param {string} name 包名
 * @returns {string} 完整包名；例如`@daifee/queue`
 */
export function resolvePackageName(name) {
  const reg = new RegExp(`^${SCOPE}/`);
  if (reg.test(name)) {
    return name;
  } else {
    return `${SCOPE}/${name}`;
  }
}

/**
 * 包的路径；兼容处理两种情况：`@daifee/queue`, `queue`
 * @see resolvePackageName
 * @param {string} name 包的名称
 * @returns {string}
 */
export function resolvePackagePath(name) {
  name = name.replace(`${SCOPE}/`, '');

  const packageName = resolvePackageName(name);
  let workspace = null;
  workspacesForeach((item) => {
    if (item.name === packageName) {
      workspace = item;
    }
  });

  if (workspace) {
    return workspaceResolvePath(workspace);
  } else {
    return path.resolve(ROOT_PATH, PACKAGES_DIR, name);
  }
}

export function getAllPackageNames() {
  return workspacesList()
    .filter((workspace) => {
      return workspace.name !== 'djs';
    })
    .map((workspace) => {
      return workspace.name;
    });
}

export function exit(code, stdout) {
  if (stdout) {
    console.log(chalk.red(stdout));
  }
  process.exit(code);
}

export function readPackageFile(name) {
  const pkgFile = path.resolve(resolvePackagePath(name), 'package.json');
  return parseJsonFile(pkgFile);
}

export function writePackageFile(name, jsonObj) {
  const pkgFile = path.resolve(resolvePackagePath(name), 'package.json');
  const jsonStr = JSON.stringify(jsonObj, null, 2);
  writeFileSync(pkgFile, jsonStr, { encoding: 'utf-8' });
}
