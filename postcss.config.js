const autoprefixer = require('autoprefixer'),
    postcss = require('postcss-preset-env'),
    stylelint = require('stylelint'),
    modules = require('postcss-modules');


module.exports = {
    plugins: [
        autoprefixer,
        modules
    ]
}