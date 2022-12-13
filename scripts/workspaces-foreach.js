
import {
  workspaceExistsScript,
  workspacesForeach,
  wrokspaceRunCommand
} from './utils.js';

export default function (command, options = {}) {
  workspacesForeach((workspace) => {
    // 跳过
    if (Array.isArray(options.skip) && options.skip.indexOf(workspace.name) !== -1) {
      return;
    }

    if (options.ifPresent) {
      const reg = /yarn\s+run\s+([^\s]+)/;
      const matches = reg.exec(command);
      const scriptName = matches[1];
      if (workspaceExistsScript(workspace, scriptName)) {
        wrokspaceRunCommand(workspace, command);
      }
    } else {
      wrokspaceRunCommand(workspace, command);
    }
  });
}
