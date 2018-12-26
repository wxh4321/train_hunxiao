var crypto = require('crypto');
var fs = require('fs');
// function uncompile_code(code)
// {
//     code=unescape(code);
//     var c=String.fromCharCode(code.charCodeAt(0)-code.length);
//     for(var i=1;i<code.length;i++){
//         c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
//     }
//     return c;
// }
function load_jsondata(file_path) {
    const obj = read_file(file_path);
    const result = JSON.parse(obj);
    return result;
}
function compile_code(code)//加密
{
    var c=String.fromCharCode(code.charCodeAt(0)+code.length);
    for(var i=1;i<code.length;i++){
        c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
    }
    return escape(c);
}
function get_some_num(word) {
    var h = crypto.createHash('md5');
    h.update(word);
    var ret = h.digest('hex');
    return ret;
}
function write_json_file(filename,myjson) {
    fs.writeFileSync(filename, myjson);
}
function read_file(filename) {
    const obj = fs.readFileSync(filename);
    return obj;
}
function update_json_file(a,a1) {
    var path = 'D:\\WebstormProjects\\3.32enjs\\src\\server\\json_file\\key.json';
    var myObj = { data1: a,data2:a1};//,data3:data3
    var myJSON = JSON.stringify(myObj);
    write_json_file(path, myJSON);
}

function auto_change_para(num1) {
    var str_a = 'need checked num '+num1;
    console.log('update ',num1);
    console.log(get_some_num(str_a));
}

module.exports = {
    get_some_num: get_some_num,
    compile_code:compile_code,
    auto_change_para:auto_change_para,
    load_jsondata:load_jsondata
};

// var a =[];
// a[146] = '8904ba6a97042a47f612e6ea9d7afb86';
// a[242] = 'c2aecdc0b1ad4e05022db0083c81bf86';
// a[233] = 'eb841b04818e4b759eb31dc4dcd89bfa';
// a[104] = 'fedc761b14c6c15d968f0dcfd4729565';
// a[135] = 'a58861d0b9f31dce1cb829cf31db68b5';
// var a1 = [];
// a1[146]=20;
// a1[242]=21;
// a1[233]=22;
// a1[104]=23;
// a1[135]=24;
// update_json_file(a,a1);
/**
 *
 need checked num 1839
 index_bat.html:72 146
 index_bat.html:48 need checked num 3677
 index_bat.html:72 242
 index_bat.html:48 need checked num 4078
 index_bat.html:103 233
 index_bat.html:48 need checked num 4479
 index_bat.html:103 104
 index_bat.html:48 need checked num 4879
 index_bat.html:103 135
 * */



