const http = require('http');
const fs = require('fs');
const check = require('./check_environment');

const hostname = '127.0.0.1';
const port = 8081;
const  port1 = 8082;
const path = 'D:\\WebstormProjects\\3.32enjs\\src\\server\\';
const check_str = 'need checked num ';
let n = 0;
var data = check.load_jsondata(path+'json_file\\key.json');

function read_file(filename) {
    const obj = fs.readFileSync(filename);
    return obj;
}
function find_s_w(key,arr) {
    var index = arr.indexOf(key);
    return index;
}
function get_check_result(key1,key2,data1,data2) {//,data3
    // var run1_code = read_file('D:\\WebstormProjects\\3.32enjs\\src\\client\\tools_for_js\\run1.js').toString();
    key1 = check_str+key1;
    key1 = check.get_some_num(key1);
    // var key3 = check.get_some_num(run1_code);
    var index1 = find_s_w(key1,data1);
    var index2 = find_s_w(key2,data2);
    if (index1===index2){//&&key3===data3
        return [index1,true];
    }
    else {
        return [404,false];
    }
}
http.createServer((req, res) => {
    var da1 = req.url;
    if(da1.length!==48){
        res.writeHead(404,{
            'content-type':'text/plain;charset="utf-8"'
        });
        res.write("访问异常，请访问正确的链接");
        res.end();
    }
    else {
        if (n<4){
            var para1 = [];
            var para2 = [];
            var arr_num = Array.apply(null, { length: 12 }).map(() => Math.round(Math.random() * 10000+1000));
            for (let iii=0;iii<3;iii++){
                var para11 = check.load_jsondata(path+'model\\model'+(iii+1)+'\\model.json');
                para1.push(para11);
                var para22 = check.load_jsondata(path+'model\\model'+(iii+1)+'\\model_1.json');
                para2.push(para22);
            }
            var js_code = check.load_jsondata(path+'json_file\\js_code.json');
            res.writeHead(200, {"Content-Type": "application/json"});
            var json = JSON.stringify({
                para: {para1:para1,para2:para2},
                jc:js_code,
                arr_num:arr_num
            });
            res.end("success_jsonpCallback(" + json + ")");//！！一定要加配置的回调方法名
        }
        else {
            res.writeHead(404,{
                'content-type':'text/plain;charset="utf-8"'
            });
            res.write("访问异常，系统做出判黑处理");
            res.end();
        }
    }
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

http.createServer((req, res) => {

    var da2 = req.url;
    console.log(da2);
    console.log(da2.length);
    if(da2.length>=63&&da2.length<=64){
        da2 = da2.split("***");
        var lis = da2[1];
        lis = lis.split(',');
        //更新元素//当更新完后关闭，方便测试
        // check.auto_change_para(lis[0],lis[1]);
        lis[1] = parseInt(lis[1]);
        var data1 = data.data1;
        var data2 = data.data2;
        // var data3 = data.data3;
        if (n<4){
            //判断错误次数
            var key_msg = get_check_result(lis[0],lis[1],data1,data2);//,data3
            if (!key_msg[1]){n+=1;console.log(n);}
            res.writeHead(200, {"Content-Type": "application/json"});
            var json = JSON.stringify({
                result:key_msg
            });
            res.end("success_jsonpCallback1(" + json + ")");
        }
        else {
            console.log('find some error,please check out!');
            console.log('系统错误，请检查网络，并重启服务!');
            res.writeHead(404,{
                'content-type':'text/plain;charset="utf-8"'
            });
            res.write("访问异常，系统做出判黑处理");
            res.end();
            //设置定时器
            var timeoutTime = 1000*2; // 1000 is one second
            var timeout = setTimeout(function() {
                console.log("timed out!");
                n = 0;
                clearTimeout(timeout);
            }, timeoutTime);
        }
    }
    else {
        res.writeHead(404,{
            'content-type':'text/plain;charset="utf-8"'
        });
        res.write("访问异常，请访问正确的链接");
        res.end();

    }}).listen(port1, hostname, () => {
    console.log(`Server running at http://${hostname}:${port1}/`);
});