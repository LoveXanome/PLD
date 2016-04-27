System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var HomeComponent, VILLES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(_router) {
                    this._router = _router;
                    /*constructor(private _router: Router){}*/
                    this.villes = VILLES;
                }
                ;
                HomeComponent.prototype.onChange = function (ville) {
                    this.selectedVille = ville;
                };
                HomeComponent.prototype.gotoDetail = function () {
                    this._router.navigate(['VilleDetail', { nom: this.selectedVille }]);
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/html/home.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], HomeComponent);
                return HomeComponent;
            }());
            exports_1("HomeComponent", HomeComponent);
            VILLES = [
                { "id": 11, "nom": "Lyon" },
                { "id": 12, "nom": "Nante" },
                { "id": 13, "nom": "Bourg-en-Bress" },
                { "id": 14, "nom": "Orléant" },
                { "id": 15, "nom": "Grenoble" },
                { "id": 16, "nom": "Troyes" },
                { "id": 17, "nom": "Paris" },
                { "id": 18, "nom": "Marseille" },
                { "id": 19, "nom": "St-Etienne" },
                { "id": 20, "nom": "Lille" }
            ];
        }
    }
});
//# sourceMappingURL=home.component.js.map