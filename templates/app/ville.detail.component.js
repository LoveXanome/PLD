System.register(['angular2/core', 'angular2/router', './map.component', './ville'], function(exports_1, context_1) {
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
    var core_1, router_1, map_component_1, ville_1;
    var VilleDetailComponent, LIGNES, ARRETS_C1, ARRETS_C2, ARRETS_C3, ARRETS_C4;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (map_component_1_1) {
                map_component_1 = map_component_1_1;
            },
            function (ville_1_1) {
                ville_1 = ville_1_1;
            }],
        execute: function() {
            VilleDetailComponent = (function () {
                function VilleDetailComponent(_router, routeParams) {
                    this._router = _router;
                    this._lignes = LIGNES;
                    this._selectedVille = new ville_1.Ville();
                    this._selectedVille.nom = routeParams.get('nom');
                }
                VilleDetailComponent.prototype.ngOnInit = function () {
                    //this._selectedArret = "arrêt fictif";
                    //this._selectedLigne = "ligne fictive";
                    this._lignes[0].arrets = ARRETS_C1;
                    this._lignes[1].arrets = ARRETS_C2;
                    //console.debug(this._lignes);
                };
                VilleDetailComponent.prototype.ngAfterViewInit = function () {
                };
                VilleDetailComponent.prototype.changeArret = function () {
                    if (this._selectedArret == null) {
                        this._selectedArret = this._lignes[0].arrets[0];
                    }
                    else
                        this._selectedArret = null;
                };
                VilleDetailComponent.prototype.changeLigne = function () {
                    if (this._selectedLigne == null) {
                        this._selectedLigne = this._lignes[0];
                    }
                    else
                        this._selectedLigne = null;
                };
                VilleDetailComponent.prototype.clickLigne = function (idLigne) {
                    //TODO récupérer les informations AJAX
                    this._selectedLigne = this._lignes[0];
                };
                VilleDetailComponent.prototype.clickArret = function (idLigne) {
                    //TODO récupérer les informations AJAX
                    this._selectedArret = this._lignes[0].arrets[0];
                };
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
            LIGNES = [
                { "id": 11, "nom": "C1", "categorie": true, "arrets": ARRETS_C1 },
                { "id": 12, "nom": "C2", "categorie": false, "arrets": ARRETS_C2 },
                { "id": 13, "nom": "C3", "categorie": true, "arrets": ARRETS_C3 },
                { "id": 14, "nom": "C4", "categorie": true, "arrets": ARRETS_C4 }
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