import * as t from '@babel/types';
import { NodePath } from 'babel__traverse';

/**
 * `fxRequire('module-id')`
 * 👇
 * `require('module-id')`
 */
export default function transformFxRequireCallExpression(path: NodePath<t.CallExpression>): void {
  const callee = path.node.callee as t.Identifier;
  callee.name = 'require';
}

// is
export function is(path: NodePath<t.CallExpression>): boolean {
  return t.isIdentifier(path.node.callee, { name: 'fxRequire' });
};
