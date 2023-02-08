import * as t from '@babel/types';
import { NodePath } from 'babel__traverse';

/**
 * `fxRequire.async('module-id')`
 * 👇
 * `import('module-id')`
 */
export default function transformFxRequireAsyncCallExpression(path: NodePath<t.CallExpression>): void {
  // const callee = path.node.callee;
  const args = path.node.arguments;
  let newPath = null;
  // `fxRequire.async('module-id')`
  if (args.length === 1) {
    newPath = t.callExpression(t.identifier('import'), args);
  } else if (args.length === 2) {
    // `fxRequire.async('module-id', successCB)`
    newPath = t.callExpression(
      t.memberExpression(
        t.callExpression(
          t.identifier('import'),
          [args[0]]
        ),
        t.identifier('then')
      ),
      [args[1]]
    );
  } else {
    // `fxRequire.async('module-id', successCB, errorCB)`
    newPath = t.callExpression(
      t.memberExpression(
        t.callExpression(
          t.memberExpression(
            t.callExpression(
              t.identifier('import'),
              [args[0]]
            ),
            t.identifier('then')
          ),
          [args[1]]
        ),
        t.identifier('catch')
      ),
      [args[2]]
    );
  }

  path.replaceWith(newPath);
}
// is
export function is(path: NodePath<t.CallExpression>): boolean {
  const callee = path.node.callee;
  if (!t.isMemberExpression(callee)) {
    return false;
  }

  const { object, property } = callee;

  return t.isIdentifier(object, { name: 'fxRequire' }) && t.isIdentifier(property, { name: 'async' });
};
