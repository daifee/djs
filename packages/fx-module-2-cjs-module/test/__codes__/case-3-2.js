fxRequire.async('case-1-1');

fxRequire.async('case-1-2', (mod) => {
  console.log(mod);
});

fxRequire.async('case-1-3', (mod) => {
  console.log(mod);
}, (err) => {
  console.log(err);
});