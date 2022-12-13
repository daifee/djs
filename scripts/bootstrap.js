
import {
  workspaceExistsScript,
  workspacesForeach,
  wrokspaceRunCommand
} from './utils.js';

function install(workspace) {
  wrokspaceRunCommand(workspace, 'yarn install');
}

function build(workspace) {
  if (workspaceExistsScript(workspace, 'build')) {
    wrokspaceRunCommand(workspace, 'yarn run build');
  }
}

export default function bootstrap() {
  // 安装依赖
  workspacesForeach(install);

  // 执行构建
  workspacesForeach(build);
}
