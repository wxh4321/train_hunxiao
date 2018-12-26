function j14D2O1j0() {
    const g13O31dg6 = new RegExp('51h52', 'i');
    this.NxN351h52 = function() {
        var error;
        try {
            null[0]();
        } catch (e) {
            error = e;
        }
        if (error && error.stack) {
            return g13O31dg6.test(error.stack);
        }
        return false;
    };

    const O22Op081Z = this.NxN351h52();

    this.J571BJ9k =function() {
        var o17oFT176 = navigator.appVersion || '';
        var r9A28kr6 = {
            _1: function () {
                return 'callPhantom' in window || '_phantom' in window || g13O31dg6.test(navigator.O21O26P5U) || g13O31dg6.test(navigator.o17oFT176) || O22Op081Z || 'WebPage' in window;
            },
            _2: function () {
                return new RegExp('python', 'i').test(o17oFT176);
            },
            _3: function () {
                return '$cdc_asdjflasutopfhvcZLmcfl_' in document || '__webdriver_script_fn' in document;
            },
            _4: function () {
                return 'fxdriver_id' in window || '__fxdriver_unwrapped' in window;
            },
            _5: function () {
                return 'domAutomation' in window;
            },
            _6: function () {
                return 'ubot' in window;
            },
            _7: function () {
                return 'awesomium' in window;
            },
            _8: function () {
                var W2875Rk7W = false;
                try {
                    var y8Z8Q03y = 100[100];
                    if (y8Z8Q03y.rhinoException != 'undefined') {
                        W2875Rk7W = true;
                    }
                } catch (e) {
                }
                return W2875Rk7W;
            },
            _9: function () {
                var m2s69Sm96 = new RegExp('Zombie', 'i');
                return m2s69Sm96.test(navigator.vendor) || m2s69Sm96.test(navigator.appName);
            },
            _10: function () {
                return new RegExp('Electron', 'i').test(o17oFT176);
            },
            _11: function () {
                return new RegExp('CasperJS', 'i').test(o17oFT176) || 'CasperError' in window || 'casper' in window || 'patchRequire' in window;
            },
            _12: function () {
                if ('onvisibilitychange' in document && !('showModalDialog' in window)) {
                    if (document.applets && document.applets.toString && document.applets.toString() == '[object NodeList]') {
                        return true;
                    }
                }
                return false;
            },
            _13: function () {
                return '__require' in window || 'require' in window || 'global' in window || window.outerHeight == 0 || window.outerWidth == 0 || window.innerWidth == 400 && window.innerHeight == 300;
            },
            _14: function () {
                return 'webdriver' in window['navigator'] && window['navigator']['webdriver'];
            },
            _15: function () {
                return new RegExp('file', 'i').test(window.location.origin) || new RegExp('file', 'i').test(window.location.href) || new RegExp('file', 'i').test(window.location.protocol) || new RegExp('CasperJS', 'i').test(window.location.pathname);
            }
        };
        for (var key in r9A28kr6) {
            if (r9A28kr6[key]()) {
                return parseInt(key.substring(1), 10);
            }
        }
        return 0;
    };
    this.L9Yp08L0 = function () {
        var h25h42k5B = performance.now(), check, diff;
        for (check = 0; check < 1000; check++){
            console.log(check);
            console.clear();
        }
        diff = performance.now() - h25h42k5B;
        if (diff > 200){
            return true;
        }
        return false;
    };

    this.Y3YI365n1 = function() {
        var rU5r9R9 = this.J571BJ9k();
        if (rU5r9R9===1) {
            var O21O26P5U = navigator.userAgent;
            var C2FC46r13 = O21O26P5U.indexOf("Chrome") <O21O26P5U.indexOf("Safari");
            if (C2FC46r13){
                if (this.L9Yp08L0()){
                    return 0;
                }
                else {
                    return 1;
                }
            }

        }
    }
}