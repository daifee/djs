

/* @code-ignore-next-statement kuwo */
import error from './error';



;// @code-ignore-statement kuwo
function fun() {
  console.log('error');

  console.log('success'); // @code-ignore-statement kugou
}


error(); /** @code-ignore-statement kuwo */

/* @code-ignore-statement */
success(); 