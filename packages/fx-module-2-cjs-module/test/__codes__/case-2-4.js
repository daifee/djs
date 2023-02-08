
fxDefine('case-7', () => {
  const case1 = fxRequire('case-1');

  const case2 = fxRequire('case-2');


  case2.fly();

  return { case1, case2 };
});
