const esprima = require('esprima');
const fs = require('fs');
const path = require('path');
const db_paths = fs.readdirSync(path.join('..', 'db'));

db_paths.forEach(db_path => {
  db_path = path.join('..', 'db', db_path);
  const files = fs.readdirSync(db_path);
  files.forEach(filename => {
    if (filename.substr(-9, 9) !== '.gen.json') {
      const code = fs.readFileSync(path.join(db_path, filename)).toString();
      const code_gen = JSON.stringify(esprima.parse(code));
      fs.writeFileSync(path.join(db_path, filename + '.gen.json'), code_gen);
      console.log(filename, 'ok');
    }
  });
});