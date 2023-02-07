
fxRequire.async('ComboEffect', function (mod) {
  let status = fxRequire('ComboEffect').heart.getStatus(mod);
  console.log(status, mod);
});

fxRequire.async('ComboEffect2');


fxRequire.async('ComboEffect3', function (mod) {
  let status = fxRequire('ComboEffect').heart.getStatus(mod);
  console.log(status, mod);
}, function (err) {
  console.log(err);
});