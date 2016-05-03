System.register(['rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var HttpRequest;
    return {
        setters:[
            function (_1) {}],
        execute: function() {
            HttpRequest = (function () {
                function HttpRequest(_this, http) {
                    this._this = _this;
                    this._http = http;
                    this._data = null;
                }
                HttpRequest.prototype.get = function (url, doSuccess) {
                    var _this = this;
                    this._http.get(url)
                        .map(function (res) { return res.json(); })
                        .subscribe(
                    //En cas de succès
                    function (data) { return doSuccess(_this._this, data); }, 
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