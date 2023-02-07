import * as t from '@babel/types';
import { NodePath, Visitor } from 'babel__traverse';

type tt = typeof t;

export default function babelPluginFxModule2CjsModule({ types }: { types: tt }): { visitor: Visitor } {
  /**
   * `fxDefine('module-id', () => { statements; })`
   * 👇
   * `statements;`
   */
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
  // is
  transformFxDefineCallExpression.is = (path: NodePath<t.CallExpression>): boolean => {
    return types.isIdentifier(path.node.callee, { name: 'fxDefine' });
  };

  /**
   * `fxRequire('module-id')`
   * 👇
   * `require('module-id')`
   */
  function transformFxRequireCallExpression(path: NodePath<t.CallExpression>): void {
    const callee = path.node.callee as t.Identifier;
    callee.name = 'require';
  }
  // is
  transformFxRequireCallExpression.is = (path: NodePath<t.CallExpression>): boolean => {
    return types.isIdentifier(path.node.callee, { name: 'fxRequire' });
  };

  /**
   * `fxRequire.async('module-id')`
   * 👇
   * `import('module-id')`
   */
  function transformFxRequireAsyncCallExpression(path: NodePath<t.CallExpression>): void {
    // const callee = path.node.callee;
    const args = path.node.arguments;
    let newPath = null;
    // `fxRequire.async('module-id')`
    if (args.length === 1) {
      newPath = types.callExpression(t.identifier('import'), args);
    } else if (args.length === 2) {
      // `fxRequire.async('module-id', successCB)`
      newPath = types.callExpression(
        types.memberExpression(
          types.callExpression(
            types.identifier('import'),
            [args[0]]
          ),
          types.identifier('then')
        ),
        [args[1]]
      );
    } else {
      // `fxRequire.async('module-id', successCB, errorCB)`
      newPath = types.callExpression(
        types.memberExpression(
          types.callExpression(
            types.memberExpression(
              types.callExpression(
                types.identifier('import'),
                [args[0]]
              ),
              types.identifier('then')
            ),
            [args[1]]
          ),
          types.identifier('catch')
        ),
        [args[2]]
      );
    }

    path.replaceWith(newPath);
  }
  // is
  transformFxRequireAsyncCallExpression.is = (path: NodePath<t.CallExpression>): boolean => {
    const callee = path.node.callee;
    if (!types.isMemberExpression(callee)) {
      return false;
    }

    const { object, property } = callee;

    return types.isIdentifier(object, { name: 'fxRequire' }) && types.isIdentifier(property, { name: 'async' });
  };

  return {
    visitor: {
      CallExpression(path: NodePath<t.CallExpression>) {
        // debugger;

        if (transformFxDefineCallExpression.is(path)) {
          return transformFxDefineCallExpression(path);
        }

        if (transformFxRequireCallExpression.is(path)) {
          return transformFxRequireCallExpression(path);
        }

        if (transformFxRequireAsyncCallExpression.is(path)) {
          return transformFxRequireAsyncCallExpression(path);
        }
      }
    }
  };
}
