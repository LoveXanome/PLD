System.register(['rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var HttpRequest;
    return {
        setters:[
            function (_1) {}],
        execute: function() {
            /*
            this._httpRequest.get('http://localhost:5000/', this.doResult);
            
            doResult(res: any)
            {
                console.debug(res);
            }
            
            */
            HttpRequest = (function () {
                function HttpRequest(http) {
                    this._http = http;
                    this._data = null;
                }
                HttpRequest.prototype.get = function (url, doSuccess) {
                    var _this = this;
                    return this._http.get(url)
                        .map(function (res) { return res.json(); })
                        .subscribe(
                    //En cas de succès
                    function (data) { return doSuccess(data); }, 
                    //En cas d'erreur
                    function (err) { return _this.handleError(err); });
                };
                HttpRequest.prototype.handleError = function (err) {
                    console.debug(err);
                };
                return HttpRequest;
            }());
            exports_1("HttpRequest", HttpRequest);
        }
    }
});
//# sourceMappingURL=httpRequest.js.map