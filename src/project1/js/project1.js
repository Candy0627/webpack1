import '../css/less.less';
import '../css/style.css';

if(module.hot){
  module.hot.accept();
}

// require.ensure([],(require)=>{
//   require('jquery');
// })

console.log(process.env.NODE_ENV);