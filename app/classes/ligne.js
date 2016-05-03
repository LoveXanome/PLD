System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Ligne;
    function randomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var _i = 0; _i < 6; _i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    return {
        setters:[],
        execute: function() {
            Ligne = (function () {
                function Ligne() {
                }
                return Ligne;
            }());
            exports_1("Ligne", Ligne);
        }
    }
});
//# sourceMappingURL=ligne.js.map