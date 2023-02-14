import * as t from '@babel/types';
import { NodePath, Visitor } from 'babel__traverse';

type COMMAND = '@code-ignore-next-statement' | '@code-ignore-statement';
interface OPTIONS {
  platform: string
};

export default function babelPluginCodeIgnore(): { visitor: Visitor } {
  return {
    visitor: {
      Statement(path: NodePath<t.Statement>, state: any) {
        const options = state.opts == null ? { platform: '' } : (state.opts as OPTIONS);
        if (shouldIgnoreNextStatement(path, options.platform)) {
          path.node.leadingComments = undefined;
          path.remove();
          return;
        }

        if (shouldIgnoreStatement(path, options.platform)) {
          path.node.trailingComments = undefined;
          path.remove();
        }
      }
    }
  };
}

function shouldIgnoreNextStatement(path: NodePath<t.Statement>, platform: string): boolean {
  const leadingComment = getLeadingComment(path);

  const params = extractCommandParams('@code-ignore-next-statement', leadingComment);

  return params.includes(platform);
}

function shouldIgnoreStatement(path: NodePath<t.Statement>, platform: string): boolean {
  const trailingComment = getTrailingComment(path);

  const params = extractCommandParams('@code-ignore-statement', trailingComment);

  return params.includes(platform);
}

function extractCommandParams(command: COMMAND, comment: string): string[] {
  const reg = /[^\s,]+/g;
  const result = comment.match(reg);

  if (result == null) {
    return [];
  }

  const cmd = result.shift() as string;
  if (command === cmd) {
    return result;
  }

  return [];
}

function getLeadingComment(path: NodePath<t.Statement>): string {
  if (path.node.leadingComments == null || path.node.leadingComments.length === 0) {
    return '';
  }
  const index = path.node.leadingComments.length - 1;
  const commentNode = path.node.leadingComments[index];
  return commentNode.value;
}

function getTrailingComment(path: NodePath<t.Statement>): string {
  if (path.node.trailingComments == null || path.node.trailingComments.length === 0) {
    return '';
  }
  const commentNode = path.node.trailingComments[0];
  return commentNode.value;
}
