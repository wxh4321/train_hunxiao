const fs = require('fs');
//生成大写字母 A的Unicode值为65
const isArray = (something)=>{
    return Object.prototype.toString.call(something) === '[object Array]';
}
const isStr = (str)=>{
    if (typeof str==="string"){return true;}
    return false;
}
function generateBig_1(){
    var str = [];
    for(var i=65;i<91;i++){
        str.push(String.fromCharCode(i));
    }
    return str;
}
//生成大写字母 a的Unicode值为97
function generateSmall_1() {
    var str = [];
    for (var i = 97; i < 123; i++) {
        str.push(String.fromCharCode(i));
    }
    return str;
}

function unique_arr(array) {//数组去重
    var res = [];
    for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
        for (var j = 0, resLen = res.length; j < resLen; j++ ) {
            if (array[i] === res[j]) {
                break;
            }
        }
        if (j === resLen) {
            res.push(array[i])
        }
    }
    return res;
}
function getCallStack() {
    var stack = "#", total = 0, fn = arguments.callee;
    while ( (fn = fn.caller) ) {
        stack = stack + " " +fn.name;
        total++
    }
    return stack
}
function Tool1_for_Confuse() {
    this.all_arr = [];
    this.hex_arr = [];
    this.d1 = {};//{normal_name:vari_name}
    this.T_d1 = {};
    this.d2 = {};//{normal_name:func_name}
    this.T_d2 = {};
    this.d3 = {};//{normal_name:thisfun_name}
    this.find_vari_name = function(str) {
        var name = /['const','var','let'] {0,100}[a-zA-Z0-9_]{1,100} {0,100}=/g;
        var name1 = /, {0,100}[a-zA-Z0-9_] {0,100};/g;
        var name2 = /, {0,100}[a-zA-Z0-9_] {0,100},/g;
        var arr = str.match(name);
        for(let i in arr){
            arr[i] = arr[i].split('=')[0];
            arr[i] = arr[i].split(' ')[1];
        }
        if (arr===null){
            return [];
        }
        arr = unique_arr(arr);
        return arr;
    };
    this.find_fun_name = function (str) {
        var name = /function {0,100}[a-zA-Z0-9_]{1,100} {0,100}/g;
        var arr = str.match(name);
        for(let i in arr){
            arr[i] = arr[i].split(' ')[1];
        }
        if (arr===null){
            return [];
        }
        arr = unique_arr(arr);
        return arr;
    };
    this.find_thisfun_name = function (str) {
        var name = /this.[a-zA-Z0-9_]{1,100} {0,100}= {0,100}function/g;
        var arr = str.match(name);
        for(let i in arr){
            arr[i] = arr[i].split(' ')[0];
            arr[i] = arr[i].split('.')[1];
        }
        if (arr===null){
            return [];
        }
        arr = unique_arr(arr);
        return arr;
    };
    this.hex_num = function() {
        var big = generateBig_1();
        var small = generateSmall_1();
        for (let i in small){
            big.push(small[i]);
        }
        var num = Math.round(Math.random() * 10000);
        var str = parseInt(num,16).toString();
        for (let j =0;j<3;j++){
            var index = Math.round(Math.random()*51);
            var index1 = Math.round(Math.random()*str.length);
            str = str.slice(0,index1)+big[index]+str.slice(index1,str.length);
        }
        str =big[index]+str;
        return str;
    };
    this.Array_clean = function(arr,deleteValue) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == deleteValue) {
                arr.splice(i, 1);//返回指定的元素
                i--;
            }
        }
        return arr;
    };
    this.init_data = function (code) {//字符串混淆初始化
    var vari_arr = this.find_vari_name(code);
    var fun_arr = this.find_fun_name(code);
    var thisfun_name = this.find_thisfun_name(code);

    for (let i in vari_arr){
      this.all_arr.push(vari_arr[i]);
    }
    for (let j in fun_arr){
        this.all_arr.push(fun_arr[j]);
    }
    for (let k in thisfun_name){
        this.all_arr.push(thisfun_name[k]);
    }
    this.all_arr = unique_arr(this.all_arr);
    while (this.hex_arr.length<this.all_arr.length){//生成替换的随机字符串
      this.hex_arr.push(this.hex_num());
      this.hex_arr = unique_arr(this.hex_arr);//去重
    }

    for(let l in this.all_arr){
      this.d1[this.all_arr[l]] = this.hex_arr[l];
      this.T_d1[this.hex_arr[l]] = this.all_arr[l];
    }
    };
    this.init_data1 = function(code){//逻辑混淆初始化
        //获取所有方法名
        var fun_arr = this.find_fun_name(code);
        var all_arr = [];
        for (let j in fun_arr){
            all_arr.push(fun_arr[j]);
        }
        all_arr = unique_arr(all_arr);
        for(let l in all_arr){
            this.d2[all_arr[l]] = l;//name:num
            this.T_d2[l] = all_arr[l];//num:name
        }
    };
    this.reduction_code = function (arr) {//还原上一级代码
        var str1 = '';
        for (let i in arr){//还原代码
            str1+=arr[i];
        }
        return str1;
    };
    this.insert_data = function(arr,label) {//插入分隔符号
        var i;
        var tmp_arr = [];
        for ( i=0;i<arr.length-1;i++){
            tmp_arr.push(arr[i]);
            tmp_arr.push(label);
        }
        tmp_arr.push(arr[i]);
        if(tmp_arr[tmp_arr.length-1]===''){
            tmp_arr = tmp_arr.slice(0,tmp_arr.length-1);
        }
        if(tmp_arr[0]===''){
            tmp_arr = tmp_arr.slice(1,tmp_arr.length);
        }
        return tmp_arr;
    };
    this.find_key_inarr = function(arr,index,label,label1) {//向前查找
        if (arr[index-1]===label){
            return true;
        }
        for (let j = index-1; j>=0;j-=1){
            if (label1===arr[j]){
                return false;//找到关键符号相反的符号例如label{,label1}
            }
            if (label===arr[j]){
                return true;//找到关键符号
            }
        }
        return false;//没有找到
    };
    this.find_key_inarr1 = function(arr,index,label,label1) {//向后查找
        if (arr[index]===label){
            return true;
        }
        for (let j = index; j<arr.length;j+=1){
            if (label1===arr[j]){
                return false;//找到关键符号相反的符号例如label{,label1}
            }
            if (label===arr[j]){
                return true;//找到关键符号
            }
        }
        return false;//没有找到
    };
    this.is_in_it = function(key,d){//判断对象或者数组是否包含某个关键字
        if (isArray(d)) {
            for (let i in d){
                if (key===d[i]){
                    return true;//找到key
                }
            }
        }
        else if (isStr(d)){
            if (d.indexOf(key)>-1){
                return true;
            }
        }
        else {
            for (let i in d){
                if (key===i){
                    return true;
                }
            }
        }
        return false;
    };
    this.is_a_special_char = function (str,a_char) {
        var character_set = ['+','-','*','/','=','^','%',':','>','<','?','!','|','||','&','[',',',']','.','~'];
        for(let i in str){
            for (let j in character_set){
                if (str[i]===a_char){
                    return true;
                }
            }
        }
        return false;
    };
    this.replace_word = function(arr,index,d1) {
        for (let word in d1) {
            if (arr[index]===word){
                arr[index] = d1[word];//替换为随机字符串
            }
        }
    };
    this.find_data_fromArr = function (arr,key) {
        for(let i in arr){
            if (key===arr[i]){
                return true;
            }
        }
        return false;
    };
    this.get_code_arr = function (code) {
          var arr1=[];
          code = code.split('\r\n');
          code = this.insert_data(code,'\r\n');
          //替换字符串
          for (let i in code){
              var tmp_str = code[i].split(' ');
              tmp_str = this.insert_data(tmp_str,' ');
              for (let j in tmp_str){
                  var third_str = tmp_str[j].split(';');
                  third_str = this.insert_data(third_str,';');
                  for (let k in third_str){
                      var fourth_str = third_str[k].split(',');
                      fourth_str = this.insert_data(fourth_str,',');
                      for (let l in fourth_str){
                          var fifth_str = fourth_str[l].split('(');
                          fifth_str = this.insert_data(fifth_str,'(');
                          for (let m in fifth_str){
                              var sixth_str = fifth_str[m].split(')');
                              sixth_str = this.insert_data(sixth_str,')');
                              for (let n in sixth_str){
                                  var seventh_str = sixth_str[n].split('[');
                                  seventh_str = this.insert_data(seventh_str,'[');
                                  for (let o in seventh_str){
                                      var eighth_str = seventh_str[o].split(']');
                                      eighth_str = this.insert_data(eighth_str,']');
                                      for (let p in eighth_str){
                                          var  nineth_str = eighth_str[p].split('<');
                                          nineth_str = this.insert_data(nineth_str,'<');
                                          for(let r in nineth_str){
                                              var tenth_str = nineth_str[r].split('>');
                                              tenth_str = this.insert_data(tenth_str,'>');//'~'];
                                              for (let s in tenth_str) {
                                                  var eleventh_str = tenth_str[s].split('+');
                                                  eleventh_str = this.insert_data(eleventh_str, '+');
                                                  for (let t in eleventh_str) {
                                                      var tweleveth_str = eleventh_str[t].split('-');
                                                      tweleveth_str = this.insert_data(tweleveth_str, '-');
                                                      for (let u in tweleveth_str) {
                                                          var thirdteenth_str = tweleveth_str[u].split('*');
                                                          thirdteenth_str = this.insert_data(thirdteenth_str, '*');
                                                          for (let v in thirdteenth_str) {
                                                              var fourteenth_str = thirdteenth_str[v].split('/');
                                                              fourteenth_str = this.insert_data(fourteenth_str, '/');
                                                              for (let w in fourteenth_str) {
                                                                  var fifteenth_str = fourteenth_str[w].split('=');
                                                                  fifteenth_str = this.insert_data(fifteenth_str, '=');
                                                                  for (let x in fifteenth_str) {
                                                                      var sixteenth_str = fifteenth_str[x].split('^');
                                                                      sixteenth_str = this.insert_data(sixteenth_str, '^');
                                                                      for (let y in sixteenth_str) {
                                                                          var seventeenth_str = sixteenth_str[y].split('%');
                                                                          seventeenth_str = this.insert_data(seventeenth_str, '%');
                                                                          for (let z in seventeenth_str) {
                                                                              var eighteenth_str = seventeenth_str[z].split(':');
                                                                              eighteenth_str = this.insert_data(eighteenth_str, ':');
                                                                              for (let z1 in eighteenth_str) {
                                                                                  var nineteen_str = eighteenth_str[z1].split('?');
                                                                                  nineteen_str = this.insert_data(nineteen_str, '?');
                                                                                  for (let z2 in nineteen_str) {
                                                                                      var twenth_str = nineteen_str[z2].split('!');
                                                                                      twenth_str = this.insert_data(twenth_str, '!');
                                                                                      for (let z3 in twenth_str) {
                                                                                          var twenty_first_str = twenth_str[z3].split('|');
                                                                                          twenty_first_str = this.insert_data(twenty_first_str, '|');
                                                                                          for (let z4 in twenty_first_str) {
                                                                                              var twenty_second_str = twenty_first_str[z4].split('&');
                                                                                              twenty_second_str = this.insert_data(twenty_second_str, '&');
                                                                                              for (let z4 in twenty_second_str) {
                                                                                                  var twenty_third_str = twenty_second_str[z4].split('.');
                                                                                                  twenty_third_str = this.insert_data(twenty_third_str, '.');
                                                                                                  for (let z4 in twenty_third_str) {
                                                                                                      var twenty_fourth_str = twenty_third_str[z4].split('~');
                                                                                                      twenty_fourth_str = this.insert_data(twenty_fourth_str, '~');
                                                                                                      for (let z5 in twenty_fourth_str){
                                                                                                          var twenty_fifth_str = twenty_fourth_str[z5].split('{');
                                                                                                          twenty_fifth_str = this.insert_data(twenty_fifth_str,'{');
                                                                                                          for (let z6 in twenty_fifth_str){
                                                                                                              var twenty_sixth_str = twenty_fifth_str[z6].split('}');
                                                                                                              twenty_sixth_str = this.insert_data(twenty_sixth_str,'}');
                                                                                                              for (let i in twenty_sixth_str){
                                                                                                                  this.replace_word(twenty_sixth_str,i,this.d1);
                                                                                                                  arr1.push(twenty_sixth_str[i]);
                                                                                                              }
                                                                                                          }
                                                                                                      }
                                                                                                  }
                                                                                              }
                                                                                          }
                                                                                      }
                                                                                  }
                                                                              }
                                                                          }
                                                                      }
                                                                  }
                                                              }
                                                          }
                                                      }
                                                  }
                                              }
                                          }
                                      }

                                  }
                              }
                          }
                      }
                  }
              }
          }
          return arr1;
    };
    this.change_code = function (code) {
        var white_list = ['map'];//js语言关键字，特殊字符等
        var tmp_a = [];
        var arr1 = this.get_code_arr(code);
        arr1 = this.Array_clean(arr1,'');
        //还原不可变字符
        for (let i in arr1){
            if (arr1[i]===':'){
                if (this.find_key_inarr(arr1,i,'{','}')){
                    this.replace_word(arr1,i-1,this.T_d1);
                }
            }
            else if (arr1[i-2]==='.'){
                if (arr1[i-3]==='this'){
                    tmp_a.push(arr1[i-1]);
                }
                else if (arr1[i-3]!=='this'&&this.find_data_fromArr(tmp_a,arr1[i-1])&&typeof this.T_d1[arr1[i-3]]==="undefined"){
                    this.replace_word(arr1,i-1,this.T_d1);
                }
                else if (arr1[i]===';'||arr1[i]===' '){
                    this.replace_word(arr1,i-1,this.T_d1);
                }
                else if (arr1[i]==='('&&this.is_in_it(this.T_d1[arr1[i-1]],white_list)){
                    this.replace_word(arr1,i-1,this.T_d1);
                }
            }
        }
        var str1 = this.reduction_code(arr1);
        return str1;
    };
    this.dict_to_str = function (map_name,d) {
        var str = map_name+' = {\n';
        for (let i in d) {
            var tmp_str = i+':'+d[i]+',\n';
            str+=tmp_str;

        }
        str+='};';
        return str;
    };
    this.extract_fun = function (fun_name,arr) {
        var first_index = -1;  //记录函数开始的位置
        var end_index = -1;   //记录函数结束的位置
        var brackets_num = 0; //{ 加1
        var brackets_num1 = 0;
        for (let i in arr){
              if (arr[i-4]==='function'&&arr[i-2]===fun_name){
                  first_index = i-4;
              }
              if (first_index>=0){//记录经过的大括号
                  if (arr[i-2]==='{'){
                      brackets_num+=1;
                  }
                  if (arr[i-2]==='}'){
                      brackets_num1+=1;
                  }
                  if (brackets_num>0&&brackets_num1>0&&brackets_num===brackets_num1){
                      if (arr[i]===';'){
                          arr[i]='';
                          end_index = i;
                          break;
                      }
                      else  if (arr[i-1]===';'){
                          arr[i-1]='';
                          end_index = i-1;
                          break;
                      }
                      else {
                          end_index = i-2;
                          break;
                      }
                  }
              }
        }
        var fun_arr = arr.slice(first_index,end_index+1);
        fun_arr[2] = '';//去掉函数名
        var tmp_arr1 = arr.slice(0,first_index);
        var tmp_arr2 = arr.slice(end_index+1,arr.length);
        arr = tmp_arr1.concat(tmp_arr2);
        return [fun_arr,arr];
    };
    this.objectSize = function(the_object) {
        /* function to validate the existence of each key
        in the object to get the number of valid keys. */
        var object_size = 0;
        for (key in the_object){
            if (the_object.hasOwnProperty(key)) {
                object_size++;
            }
        }
        return object_size;
    }
    this.change_code1 = function(code){
        var map = this.d2;
        var T_map = this.T_d2;
        var arr = this.get_code_arr(code);
        arr = this.Array_clean(arr,'');
        var tmp_arr = [];
        for (let i in arr){//对函数写法有要求，规定原函数出现在调用函数之前
            if (this.is_in_it(arr[i-2],this.d2)){
                if (this.is_in_it(arr[i-2],tmp_arr)||'return'===arr[i-4]){//已经包含这个元素
                    if (('return'===arr[i-4]&&'('===arr[i-1])||('return'===arr[i-4]&&'('===arr[i])){
                        arr[i-2] = 'map['+this.d2[arr[i-2]]+']';
                    }
                    else {
                        arr[i-2] = 'map['+this.d2[arr[i-2]]+']';
                    }
                }
                else {//加入特征判断是原函数还是调用的原函数
                    if ('function'===arr[i-4]){//因为已经去掉多余的空格所以可以这样写
                        tmp_arr.push(arr[i-2]);
                    }
                }
            }
        }

        for (let i = this.objectSize(this.T_d2)-1;i>=0;i--){//倒叙避免主函数包含所有子函数
            var ex_arr = this.extract_fun(this.T_d2[i],arr);
            if (i===0){
                var tmp_str = this.reduction_code(ex_arr[0]);
                var str2_arr  = tmp_str.split('\r\n');
                str2_arr = this.Array_clean(str2_arr,'        ');
                str2_arr = this.Array_clean(str2_arr,'');
                ex_arr[0] = this.insert_data(str2_arr,'\r\n');
            }
            arr = ex_arr[1];
            this.T_d2[i] = this.reduction_code(ex_arr[0]);
        }
        var str2 = this.dict_to_str('var map',T_map);
        var str1 = this.reduction_code(arr);
        str1 = str2+'\r\n'+str1;
        return str1;
    };
}
module.exports = {
    Tool1_for_Confuse: Tool1_for_Confuse
};
const tool = new Tool1_for_Confuse();

// 逻辑混淆代码功能
var path = 'D:\\WebstormProjects\\3.32enjs\\src\\client\\tools_for_js\\';
var code = fs.readFileSync(path+'run.js').toString();
tool.init_data1(code);
code = tool.change_code1(code);
// console.log(code);
fs.writeFileSync(path+'run2.2.js', code);

// 字符串混淆代码功能
var path = 'D:\\WebstormProjects\\3.32enjs\\src\\client\\tools_for_js\\';
var code = fs.readFileSync(path+'run2.2.js').toString();
tool.init_data(code);
var path1 = 'D:\\WebstormProjects\\3.32enjs\\src\\AntiDebugging\\';
var code1 = fs.readFileSync(path1+'index.js').toString();
tool.init_data(code1);
code = tool.change_code(code);
console.log(code);
fs.writeFileSync(path+'run2.1.js', code);

path = 'D:\\WebstormProjects\\3.32enjs\\src\\self_destory\\';
code = fs.readFileSync(path+'destory_code.js').toString();
// console.log(code);
code = tool.change_code(code);
console.log(code);
fs.writeFileSync(path+'destory_code2.1.js', code);

//字符串混淆代码功能
// console.log(code);
code1 = tool.change_code(code1);
console.log(code1);
fs.writeFileSync(path1+'index2.1.js', code1);

/*
* bug1 : 冒号之前的变量不能改，如果没有{,改变，否则不变
* bug2 : 句号后面的不要变,判断词典中是否包含句号前面的字符串
* **/
//
// var a = {'a':1,'c':2,'b':4};
// var str = 'a';
// console.log(tool.is_in_it(str,a));

// var str = ['djshdaj jhhh     jdhsjd'];
// console.log(isStr(str));
// var a = str.split(' ');
// a =  tool.Array_clean(a,'');
// a = tool.insert_data(a,' ');
// console.log(a);