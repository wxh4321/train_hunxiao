const UglifyJS = require("uglify-js");
const code = require('fs').readFileSync('./demo/demo.js').toString();
const result = UglifyJS.minify(code);
console.log(result);
