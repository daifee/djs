
import * as t from '@babel/types';
import { NodePath } from 'babel__traverse';

/**
   * `fxDefine('module-id', () => { statements; })`
   * 👇
   * `statements;`
   */
export default function transformFxDefineCallExpression(path: NodePath<t.CallExpression>): void {
  // 模块体
  const moduleBody = path.node.arguments[1];
  // 非函数模块
  if (!t.isFunction(moduleBody)) {
    path.parentPath.replaceWith(
      moduleExports(moduleBody as t.Expression)
    );
    return;
  }

  // 函数体的语句
  const blocksStatement = (moduleBody as t.FunctionExpression).body.body;
  const statements = blocksStatement.map((statement: t.Statement): t.Statement | t.AssignmentExpression => {
    if (t.isReturnStatement(statement)) {
      return moduleExports(statement.argument as t.Expression);
    }

    return statement;
  });

  path.parentPath.replaceWithMultiple(statements);
}

export function is(path: NodePath<t.CallExpression>): boolean {
  return t.isIdentifier(path.node.callee, { name: 'fxDefine' });
};

function moduleExports(expression: t.Expression): t.AssignmentExpression {
  const operator = '=';
  const left = t.memberExpression(t.identifier('module'), t.identifier('exports'));

  return t.assignmentExpression(operator, left, expression);
}
