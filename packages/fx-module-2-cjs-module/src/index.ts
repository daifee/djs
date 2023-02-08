import * as t from '@babel/types';
import { NodePath, Visitor } from 'babel__traverse';

import transformFxDefineCallExpression, {
  is as isFxDefineCallExpression
} from './transform-fx-define-call-expression';
import transformFxRequireCallExpression, {
  is as isFxRequireCallExpression
} from './transform-fx-require-call-expression';
import transformFxRequireAsyncCallExpression, {
  is as isFxRequireAsyncCallExpression
} from './transform-fx-require-async-call-expression';

export default function babelPluginFxModule2CjsModule(): { visitor: Visitor } {
  return {
    visitor: {
      CallExpression(path: NodePath<t.CallExpression>) {
        // debugger;

        if (isFxDefineCallExpression(path)) {
          return transformFxDefineCallExpression(path);
        }

        if (isFxRequireCallExpression(path)) {
          return transformFxRequireCallExpression(path);
        }

        if (isFxRequireAsyncCallExpression(path)) {
          return transformFxRequireAsyncCallExpression(path);
        }
      }
    }
  };
}
