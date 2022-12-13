
import {
  workspacesForeach,
  wrokspaceRunCommand,
  execChildProcessSync
} from './utils.js';

function install(workspace) {
  wrokspaceRunCommand(workspace, 'yarn install --immutable');
}

export default function bootstrap() {
  // 安装依赖
  workspacesForeach(install);

  // 执行构建
  execChildProcessSync('yarn run build');
}
