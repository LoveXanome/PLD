System.register(['angular2/core', 'angular2/router', 'angular2/http', 'rxjs/Rx', './map.component', './ville', './httpRequest'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1, map_component_1, ville_1, httpRequest_1;
    var VilleDetailComponent, LIGNES, ARRETS_C1, ARRETS_C2, ARRETS_C3, ARRETS_C4;
    function randomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var _i = 0; _i < 6; _i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
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
            function (map_component_1_1) {
                map_component_1 = map_component_1_1;
            },
            function (ville_1_1) {
                ville_1 = ville_1_1;
            },
            function (httpRequest_1_1) {
                httpRequest_1 = httpRequest_1_1;
            }],
        execute: function() {
            VilleDetailComponent = (function () {
                function VilleDetailComponent(_router, routeParams, http) {
                    this._router = _router;
                    this._lignes = LIGNES;
                    this._httpRequest = new httpRequest_1.HttpRequest(http);
                    this._httpRequest.get('http://localhost:5000/', this.doResult);
                    this._selectedVille = new ville_1.Ville();
                    this._selectedVille.nom = routeParams.get('nom');
                }
                VilleDetailComponent.prototype.doResult = function (res) {
                    console.debug(res);
                };
                VilleDetailComponent.prototype.ngOnInit = function () {
                    this._lignes[0].arrets = ARRETS_C1;
                    this._lignes[1].arrets = ARRETS_C2;
                };
                VilleDetailComponent.prototype.clickArret = function (arret) {
                    if (this._selectedLigne == null)
                        return;
                    this._selectedArret = arret;
                };
                /*
                    Appellé lorsqu'on clique sur un arrêt de la map
                */
                VilleDetailComponent.prototype.onClickedArret = function (arret) {
                    this._selectedArret = arret;
                    //console.debug(arret);
                    //On vérifie que la ligne séléctionner appartient à l'arrêt
                    if (this._selectedLigne == null)
                        return;
                    for (var _a = 0, _b = this._selectedLigne.arrets; _a < _b.length; _a++) {
                        var arr = _b[_a];
                        if (arr == arret) {
                            return;
                        }
                    }
                    this._selectedLigne = null;
                };
                /*
                    Appellé lorsqu'on clique sur un arrêt de la map
                */
                VilleDetailComponent.prototype.onClickedLigne = function (ligne) {
                    this._selectedLigne = ligne;
                    //On vérifie que l'arrêt séléctionner appartient à la ligne 
                    if (this._selectedArret == null)
                        return;
                    for (var _a = 0, _b = ligne.arrets; _a < _b.length; _a++) {
                        var arr = _b[_a];
                        if (arr == this._selectedArret) {
                            return;
                        }
                    }
                    this._selectedArret = null;
                };
                VilleDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'my-ville-detail',
                        templateUrl: 'app/html/detail.html',
                        styleUrls: ['app/css/detail.css'],
                        directives: [map_component_1.MapComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, http_1.Http])
                ], VilleDetailComponent);
                return VilleDetailComponent;
            }());
            exports_1("VilleDetailComponent", VilleDetailComponent);
            LIGNES = [
                { "id": 11, "nom": "C1", "categorie": true, "arrets": ARRETS_C1, "couleur": randomColor() },
                { "id": 12, "nom": "C2", "categorie": false, "arrets": ARRETS_C2, "couleur": randomColor() },
                { "id": 13, "nom": "C3", "categorie": true, "arrets": ARRETS_C3, "couleur": randomColor() },
                { "id": 14, "nom": "C4", "categorie": true, "arrets": ARRETS_C4, "couleur": randomColor() }
            ];
            ARRETS_C1 = [
                { "id": 11, "nom": "Gare Part-Dieu", "longitude": 40547, "latitude": -0.04 },
                { "id": 12, "nom": "Brotteaux", "longitude": 45.544, "latitude": -0.01 },
                { "id": 13, "nom": "Vitton", "longitude": 4.455, "latitude": -0.06 }
            ];
            ARRETS_C2 = [
                { "id": 21, "nom": "Gare Part-Dieu", "longitude": 40547, "latitude": -0.04 },
                { "id": 22, "nom": "Brotteaux", "longitude": 45.544, "latitude": -0.01 },
                { "id": 23, "nom": "Charpenne", "longitude": 4.455, "latitude": -0.06 }
            ];
            ARRETS_C3 = [
                { "id": 21, "nom": "Gare Part-Dieu", "longitude": 40547, "latitude": -0.04 },
                { "id": 22, "nom": "Brotteaux", "longitude": 45.544, "latitude": -0.01 },
                { "id": 23, "nom": "Charpenne", "longitude": 4.455, "latitude": -0.06 }
            ];
            ARRETS_C4 = [
                { "id": 21, "nom": "Gare Part-Dieu", "longitude": 40547, "latitude": -0.04 },
                { "id": 22, "nom": "Brotteaux", "longitude": 45.544, "latitude": -0.01 },
                { "id": 23, "nom": "Charpenne", "longitude": 4.455, "latitude": -0.06 }
            ];
        }
    }
});
//# sourceMappingURL=ville.detail.component.js.map