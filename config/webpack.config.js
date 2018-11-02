const devWebpackConfig = require('./config/webpack.dev.conf');
const prodWebpackConfig = require('./config/webpack.prod.conf');

const env = process.env.NODE_ENV === 'productions' ? true : false;

let newModule = null
if(env){
    newModule = prodWebpackConfig
}else{
    newModule =  devWebpackConfig
}

module.exports = newModule