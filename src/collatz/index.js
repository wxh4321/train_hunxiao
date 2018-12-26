/**
 * Collatz
 * 3x+1
 */
const fs = require('fs');
const path = require('path');
const estraverse = require('estraverse');
const esprima = require('esprima');

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Gen Expression
 * @param _IfStatement 表达式
 * @param type 运算符号类型
 */
function getByLiteral (_IfStatement, type) {
  const collatz_files = fs.readdirSync(path.join(__dirname, 'db', type));
  if (collatz_files.length < 1) {
    return _IfStatement;
  }
  // const random = randomInt(1, collatz_files.filter(e => e.indexOf('.js.gen.json') > -1).length);
  // let collatz_ast = fs.readFileSync(path.join(__dirname, 'db', type, random + '.js.gen.json')).toString();
 
  let code = fs.readFileSync(path.join(__dirname, 'db', type, '1.js')).toString();
  const collatz_ast = esprima.parse(code);

  // collatz_ast = JSON.parse(collatz_ast);
  estraverse.replace(collatz_ast, {
    enter (node) {
      // console.log(node);
      node.__obfuscated = true;
      if (node.type === 'Identifier' && node.name === '__input_var') {
        // if 的 变量
        // if (_IfStatement.test.left.type !== 'Literal') {
          return _IfStatement.test.left;
        // } else {
        //   return _IfStatement.test.right;
        // }

      } else if (node.type === 'Identifier' && node.name === '__input_val') {
        // if 的 数值
        // if (_IfStatement.test.left.type === 'Literal'  ) {
        //   return _IfStatement.test.left;
        // } else {
          return _IfStatement.test.right;
        // }

      } else if (node.type === 'BlockStatement') {
        // 执行 块
        if (node.body && node.body[0] && node.body[0].expression &&
          node.body[0].expression.type === 'CallExpression' &&
          node.body[0].expression.callee.name === '__do_action') {
          return _IfStatement.consequent
        }
      }
    }
  });
  return collatz_ast;
}

module.exports = {
  getByLiteral,
  getByLiteral_e: _ => getByLiteral(_, 'e'),
  getByLiteral_g: _ => getByLiteral(_, 'g'),
  getByLiteral_ge: _ => getByLiteral(_, 'ge'),
  getByLiteral_l: _ => getByLiteral(_, 'l'),
  getByLiteral_le: _ => getByLiteral(_, 'le'),
  getByLiteral_ne: _ => getByLiteral(_, 'ne'),
};