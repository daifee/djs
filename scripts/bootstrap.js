#!/use/bin/env node

import {
  execChildProcessSync,
  workspaceExistsScript,
  workspaceResolvePath,
  workspacesForEach,
  wrokspaceRunScript
} from './utils.js';

function install(workspace) {
  const workspacePath = workspaceResolvePath(workspace);
  console.log(workspace.name);
  execChildProcessSync('yarn install', {
    cwd: workspacePath
  });
}

function build(workspace) {
  if (workspaceExistsScript(workspace)) {
    console.log(workspace.name);
    wrokspaceRunScript(workspace, 'build');
  }
}

export default function bootstrap() {
  // 安装依赖
  workspacesForEach(install);

  // 执行构建
  workspacesForEach(build);
}
