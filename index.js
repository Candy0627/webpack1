import Mode1 from './mod1';
import { mod4 } from './mod4';

import './style.css';

const A = 90006;

setTimeout(() => {
  require.ensure(['./mod3'], function (Mod3) {
    const Mod2 = require('./mod2');
    console.log(Mod2);
    console.log(Mod3);
  })
}, 2000);

document.addEventListener('click', () => {
  document.write('hadfdfhah');
  console.log('webpack-dev-sfgerver');
});