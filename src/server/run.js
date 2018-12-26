const fs = require('fs');
const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');
const collatz = require('../collatz/index');
const minify = require("babel-minify");
const check = require('./check_environment');

function Confuse_minify_code(filename='../src/demo/demo.js') {
    const code = fs.readFileSync(filename).toString();
    const ast = esprima.parse(code);
    estraverse.replace(ast, {
        enter (node) {
            if (node.__obfuscated) return;
            if (node.type === 'IfStatement' && node.test.type === 'BinaryExpression') {
                // 一方是数字的 IfStatement
                // if (node.test.left.type === 'Literal' || node.test.right.type === 'Literal') {
                switch (node.test.operator) {
                    case '===':
                        return collatz.getByLiteral_e(node);
                    case '>':
                        return collatz.getByLiteral_g(node);
                    case '>=':
                        return collatz.getByLiteral_ge(node);
                    case '<':
                        return collatz.getByLiteral_l(node);
                    case '<=':
                        return collatz.getByLiteral_le(node);
                    case '!==':
                        return collatz.getByLiteral_ne(node);
                }

            }
        }
    });
    const regen_code = escodegen.generate(ast);
    return regen_code;

}

function  Minifycode(filename){
    const code = fs.readFileSync(filename).toString();
    const result = minify(code);
    return result.code;
}
function  run(filename='../src/demo/demo.js'){
    var str = Confuse_minify_code(filename);
    // filename = filename.slice(0,-3)+'1.js';
    // console.log(filename);
    // fs.writeFileSync(filename, str);
    return check.compile_code(str);
}
module.exports = {
    run: run,
    Minifycode:Minifycode
};
