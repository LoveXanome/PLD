System.register(['angular2/core', 'angular2/router', './ville', './map.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, ville_1, map_component_1;
    var VilleDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ville_1_1) {
                ville_1 = ville_1_1;
            },
            function (map_component_1_1) {
                map_component_1 = map_component_1_1;
            }],
        execute: function() {
            VilleDetailComponent = (function () {
                function VilleDetailComponent(_router, routeParams) {
                    this._router = _router;
                    /*if(routeParams.get('nom') !== null)
                    {*/
                    this._selectedVille = new ville_1.Ville();
                    this._selectedVille.nom = routeParams.get('nom');
                    this._selectedArret = "arrêt fictif";
                    this._selectedLigne = "ligne fictive";
                    //}
                }
                VilleDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'my-ville-detail',
                        templateUrl: 'app/html/detail.html',
                        styleUrls: ['app/css/detail.css'],
                        directives: [map_component_1.MapComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams])
                ], VilleDetailComponent);
                return VilleDetailComponent;
            }());
            exports_1("VilleDetailComponent", VilleDetailComponent);
        }
    }
});
//# sourceMappingURL=ville.detail.component.js.map