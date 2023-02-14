
// @code-ignore-next-statement kuwo
import kugou from './kugou';

// @code-ignore-next-statement kugou
import kuwo from './kuwo';

function fun() {
  // @code-ignore-next-statement kuwo
  console.log(kugou);
  console.log('---------------');

  console.log(kuwo); // @code-ignore-statement kugou
}

// @code-ignore-next-statement kugou kuwo
function ignore() {
  // 
}

kugou(); // @code-ignore-statement kuwo

kuwo(); // @code-ignore-statement kugou