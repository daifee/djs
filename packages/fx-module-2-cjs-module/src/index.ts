import * as t from '@babel/types';
import { NodePath, Visitor } from 'babel__traverse';

type tt = typeof t;

export default function babelPluginFxModule2CjsModule({ types }: { types: tt }): { visitor: Visitor } {
  function transformFxDefineCallExpression(path: NodePath<t.CallExpression>): void {
    /**
     * `return {}` => `module.exports = {}`
     */
    function transformReturnStatement(statement: t.ReturnStatement): t.AssignmentExpression {
      const operator = '=';
      const right = statement.argument as t.Expression;
      const left = t.memberExpression(types.identifier('module'), types.identifier('exports'));

      return types.assignmentExpression(operator, left, right);
    }
    transformReturnStatement.is = (node: t.Node): boolean => {
      return types.isReturnStatement(node);
    };

    // 模块体
    const moduleBody = path.node.arguments[1] as t.FunctionExpression;
    const statements = moduleBody.body.body.map((statement: t.Statement): t.Statement | t.AssignmentExpression => {
      if (types.isReturnStatement(statement)) {
        return transformReturnStatement(statement);
      }

      return statement;
    });

    path.parentPath.replaceWithMultiple(statements);
  }

  transformFxDefineCallExpression.is = (path: NodePath<t.CallExpression>): boolean => {
    return types.isIdentifier(path.node.callee, { name: 'fxDefine' });
  };

  return {
    visitor: {
      CallExpression(path: NodePath<t.CallExpression>) {
        if (transformFxDefineCallExpression.is(path)) {
          return transformFxDefineCallExpression(path);
        }
      }
    }
  };
}
