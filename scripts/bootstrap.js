import chalk from 'chalk';

import {
  execChildProcessSync,
  workspaceExistsScript,
  workspaceResolvePath,
  workspacesForEach,
  wrokspaceRunScript
} from './utils.js';

function install(workspace) {
  const workspacePath = workspaceResolvePath(workspace);
  const message = `\n↓ install: ${workspace.name}`;
  console.log(chalk.blue(message));
  execChildProcessSync('yarn install', {
    cwd: workspacePath
  });
}

function build(workspace) {
  if (workspaceExistsScript(workspace, 'build')) {
    const message = `\n↓ build: ${workspace.name}`;
    console.log(chalk.blue(message));
    wrokspaceRunScript(workspace, 'build');
  }
}

export default function bootstrap() {
  // 安装依赖
  workspacesForEach(install);

  // 执行构建
  workspacesForEach(build);
}
