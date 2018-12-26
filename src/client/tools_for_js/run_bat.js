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
function str_trans_num(str1) {
    var num = 0;
    for (let i =0;i<str1.length;i++){
        num += str1.charCodeAt(i);
    }
    return num;
}
function numpy() {
    this.argmax = function (arr) {
        var max_value = arr[0];
        var index = 0;
        for (let i = 1;i<arr.length; i++){
            if (max_value<arr[i]){
                a+=3;
                max_value = arr[i];
                index = i;
            }
        }
        return index;
    };
    this.dot = function (A,B) {
        var result = [];
        if (str_trans_num(typeof B[0][0])===str_trans_num('number')) {
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
        if (str_trans_num(typeof B[0][0])!==str_trans_num('number')) {
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

}
function network(iii,para) {
    var np = new numpy();
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
}
function Tools_for_init(iii,para) {
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
                    if(str_trans_num(typeof this.d[X[i][j]])===str_trans_num("undefined"))
                    {
                        ls.push(0.0);
                    }
                    if(str_trans_num(typeof this.d[X[i][j]])!==str_trans_num("undefined"))
                    {
                        ls.push(parseFloat(this.d[X[i][j]])/30003);
                    }
                }
                catch (e) {
                    console.log("error");
                    ls.push(0.0);
                }
            }
        }
        return [ls];
    }
}

function g_n_i(list,para1,para2){
    var ls = [];
    for (let i = 0;i<3;i++){
        var nn = new network(i,para1);
        var tt = new Tools_for_init(i,para2);
        var X1 = tt.transform([list]);
        var pre_y = nn.predict(X1[0]);
        var y1 = tt.data_inverse([pre_y]);
        ls.push(y1[0]);
    }
    return ls;
}

function start_run()
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
        table = data11.jc.name;
        init_arr = data11.jc.init_arr;
        function eval1 (str) {
            var script = document.createElement('script');
            script.type="text/javascript";
            script.text=str;
            document.getElementsByTagName('head')[0].appendChild(script);
            script = null;
        }

        function init_destory_area() {
            code ='';
            ret = [];
            tmp_num =index;//保存出错位置
            index = 0;
            index1 = 2;
        }
        function get_code(arr,index,index1) {
            var str = '';
            ret = [];
            for (let i = 0; i < arr[index].length; i++) {
                var w_num = arr[index][i]^arr[index1][i];
                ret.push(w_num);
                s_c+=1;
            }
            str += ret.map(e=>String.fromCharCode(e)).join('');
            return str;
        }
        code += get_code(table,7,11);
        function run_antidebug_code(table,n_a) {
            var result = g_n_i(n_a,para1,para2);
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
                        script.text=code;
                        document.getElementsByTagName('head')[0].appendChild(script);
                        var func1 = new start();
                        var s = func1.run();
                        script = null;
                        if(parseInt(s[0])===1){
                            code = '';
                            ret = [];
                            code +=get_code(table,result[0],result[1]);
                            return run_normal_code(table,[result[0],result[1],result1[0]]);
                        }
                        if(parseInt(s[0])!==1){
                            init_destory_area();
                            return run_self_destory_code(table,[result[0],result[1],result1[0]]);
                        }
                    }
                    code +=get_code(table,result[0],result[1]);
                    return run_antidebug_code(table,[result[0],result[1],result1[0]]);
                }
                if (index!==1)
                {
                    init_destory_area();
                    return run_self_destory_code(table,[result[0],result[1],result1[0]]);
                }
            });

        }

        function run_normal_code(table,n_a) {
            var result = g_n_i(n_a,para1,para2);
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
                if (result1[1]) {
                    if (index === 4) {
                        eval1(code);
                        return 0;
                    }
                    code += get_code(table, result[0], result[1]);
                    return run_normal_code(table, [result[0], result[1], result1[0]]);
                }
                if (!result1[1]) {
                    init_destory_area();
                    return run_self_destory_code(table, [result[0], result[1], result1[0]]);
                }
            });
        }
        function run_self_destory_code(table,n_a) {
            var result = g_n_i(n_a,para1,para2);
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
                var code1 = get_code(table, result[0], result[1]);
                a.push(code1);
                code += code1;
                index += 1;
                if (index < 4) {
                    if (index === index1) {
                        try {
                            eval1(code);
                            return 0;
                        }
                        catch (e) {
                            code = a[1] + a[0];
                            eval1(code);
                            return 0;
                        }
                    }
                    return run_self_destory_code(table, [result[0], result[1], result1[0]]);
                }
            });
        }
        run_antidebug_code(table,init_arr);
    });
};
