System.register(['angular2/core', 'angular2-google-maps/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, core_2;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            core_1.Component({
                selector: 'my-app',
                //directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
                directives: [core_2.SebmGoogleMap],
                // the following line sets the height of the map - Important: if you don't set a height, you won't see a map!!
                styles: ["\n\t.sebm-google-map-container {\n\t     height: 300px;\n\t   }\n\t"],
                template: "\n\t<h1>My first angular-google-maps app!</h1>\n\n\t<!-- this creates a google map on the page with the given lat/lng from the component as the initial center of the map: -->\n\n\t   <sebm-google-map [latitude]=\"lat\" [longitude]=\"lng\">\n\t   </sebm-google-map>\n\t"
            });
            AppComponent = (function () {
                function AppComponent() {
                    this.lat = 51.678418;
                    this.number = 7.809007;
                }
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map