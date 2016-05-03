System.register(['angular2/core', 'angular2/router', 'angular2/http', 'rxjs/Rx', './classes/httpRequest'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1, httpRequest_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (httpRequest_1_1) {
                httpRequest_1 = httpRequest_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(_router, routeParams, http) {
                    this._router = _router;
                    this.villes = [];
                    this._httpRequest = new httpRequest_1.HttpRequest(this, http);
                    this._httpRequest.get('http://localhost:5000/agencies', this.getResult);
                    //console.debug(this.villes[0].agency);
                }
                HomeComponent.prototype.ngOnInit = function () {
                    // si on init ici la première valeur,ça ne marche pas du tout! pourquoi ? Je sais pas
                };
                HomeComponent.prototype.onChange = function (id) {
                    this._selectedIdVille = id;
                };
                HomeComponent.prototype.onChangeFile = function (name) {
                    this._FileUploadName = name;
                };
                HomeComponent.prototype.gotoDetail = function () {
                    this._router.navigate(['VilleDetail', { id: this._selectedIdVille }]);
                };
                HomeComponent.prototype.uploadFile = function () {
                };
                HomeComponent.prototype.getResult = function (_this, data) {
                    //On appelle l'initialisation des villes/réseaux
                    _this.initVille(data.agencies);
                };
                HomeComponent.prototype.initVille = function (VILLES) {
                    for (var _i = 0; _i < VILLES.length; _i++) {
                        //Pour chaque nouveau réseau, ou push dans la liste 
                        this.villes.push({ "id": VILLES[_i].id, "agency": VILLES[_i].name, "location": null, "lignes": null });
                    }
                    //On initialise la valeur de la comboBox au premier élément de la liste
                    this._selectedIdVille = this.villes[0].id;
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: 'my-home',
                        templateUrl: 'app/html/home.html',
                        styleUrls: ['app/css/home.css', 'app/css/style.css']
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, http_1.Http])
                ], HomeComponent);
                return HomeComponent;
            }());
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map