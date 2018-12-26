var confuse = require('./run');
var encrypt = require('../encrypt');
const check = require('./check_environment');
var fs = require('fs');

function write_json_file(filename,myjson) {
    fs.writeFileSync(filename, myjson);
}
function Load_json_data() {
    var c = [];
    const tmp_num = [146, 242, 233, 104, 135];
    for (i in tmp_num){
        c[20+parseInt(i)] = tmp_num[i];
    }
    // const run_code = confuse.Minifycode('../src/client/tools_for_js/run1.js');
    // console.log(run_code);
    // confuse.Minifycode('../src/demo/demo.js');
    const result_code = confuse.run('../src/demo/demo.js');
    const destory_code = confuse.run('../src/self_destory/destory_code2.1.js');
    var  code = require('fs').readFileSync('../src/AntiDebugging/index2.1.js').toString();
    const code1 = check.compile_code(code);
    const arr1 = [result_code,code1,destory_code];
    const arr_table = encrypt.en(arr1);
    var arr = [7,11,135];
    var myObj = { name: arr_table, num_check: c,init_arr:arr,init_key:1};
    var myJSON = JSON.stringify(myObj);
    write_json_file("D:\\WebstormProjects\\3.32enjs\\src\\server\\json_file\\js_code.json", myJSON);

}
module.exports = {
    run: Load_json_data
};