import * as t from '@babel/types';
import { NodePath, Visitor } from 'babel__traverse';

type COMMAND = '@code-ignore-next-statement'
| '@code-ignore-statement'
| '@code-ignore-next-jsx-element';

interface OPTIONS {
  platform: string
};

export default function babelPluginCodeIgnore(): { visitor: Visitor } {
  return {
    visitor: {
      Statement(path: NodePath<t.Statement>, state: any) {
        const options = state.opts == null ? { platform: '' } : (state.opts as OPTIONS);

        if (shouldIgnoreNextStatement(path, options.platform)) {
          const commentNode = getStatementLeadingCommentNode(path);
          if (commentNode != null) {
            commentNode.value = '';
          }
          path.remove();
          return;
        }

        if (shouldIgnoreStatement(path, options.platform)) {
          const commentNode = getStatementTrailingCommentNode(path);
          if (commentNode != null) {
            commentNode.value = '';
          }
          path.remove();
        }
      },
      JSXExpressionContainer(path: NodePath<t.JSXExpressionContainer>, state: any) {
        const options = state.opts == null ? { platform: '' } : (state.opts as OPTIONS);

        if (shouldIgnoreNextJSXElement(path, options.platform)) {
          if (!path.inList) {
            return;
          }

          const elPath = findNextJSXElement(path);

          if (elPath != null) {
            elPath.remove();
            path.remove();
          }
        }
      }
    }
  };
}

function findNextJSXElement(path: NodePath<t.JSXExpressionContainer>): NodePath<t.JSXElement> | null {
  let targetKey = (path.key as number) + 1;
  let targetPath = path.getSibling(targetKey);
  while (targetPath.node != null && !t.isJSXElement(targetPath.node)) {
    targetKey += 1;
    targetPath = path.getSibling(targetKey);
  }

  if (t.isJSXElement(targetPath.node)) {
    return targetPath as NodePath<t.JSXElement>;
  }

  return null;
}

function shouldIgnoreNextJSXElement(path: NodePath<t.JSXExpressionContainer>, platform: string): boolean {
  const commentNode = getJSXExpressionContainerCommentNode(path);
  const comment = getCommendValue(commentNode);

  const params = extractCommandParams('@code-ignore-next-jsx-element', comment);

  return params.includes(platform);
}

function shouldIgnoreNextStatement(path: NodePath<t.Statement>, platform: string): boolean {
  const commentNode = getStatementLeadingCommentNode(path);
  const comment = getCommendValue(commentNode);

  const params = extractCommandParams('@code-ignore-next-statement', comment);

  return params.includes(platform);
}

function shouldIgnoreStatement(path: NodePath<t.Statement>, platform: string): boolean {
  const commentNode = getStatementTrailingCommentNode(path);
  const comment = getCommendValue(commentNode);

  const params = extractCommandParams('@code-ignore-statement', comment);

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

function getJSXExpressionContainerCommentNode(path: NodePath<t.JSXExpressionContainer>): t.Comment | null {
  const comments = path.node.expression.innerComments;
  if (comments == null || comments.length === 0) {
    return null;
  }

  return comments[0];
}

function getStatementLeadingCommentNode(path: NodePath<t.Statement>): t.Comment | null {
  const comments = path.node.leadingComments;
  if (comments == null || comments.length === 0) {
    return null;
  }
  const index = comments.length - 1;
  const commentNode = comments[index];
  return commentNode;
}

function getStatementTrailingCommentNode(path: NodePath<t.Statement>): t.Comment | null {
  const comments = path.node.trailingComments;
  if (comments == null || comments.length === 0) {
    return null;
  }
  return comments[0];
}

function getCommendValue(commentNode?: t.Comment | null): string {
  if (commentNode == null) {
    return '';
  }

  return commentNode.value;
}
