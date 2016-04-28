System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var MapComponent, LIGNES, ARRETS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MapComponent = (function () {
                function MapComponent() {
                }
                MapComponent.prototype.ngAfterContentInit = function () {
                    //Créer le template de la map et la center sur londre
                    this.mymap = L.map('mapid', {
                        center: [51.505, -0.09],
                        zoom: 13
                    });
                    //Affiche la map pour de vrai
                    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(this.mymap);
                    //TODO affichage de données fictives : plusieurs lignes de bus, avec plusieurs arêtes.
                    //On peut cliquer sur les lignes et les arêts
                    //create a Marker
                    L.marker([51.481, -0.01]).addTo(this.mymap);
                    // create a red polyline from an array of LatLng points -> Bien pour afficher une ligne, voir multiPolyline pour afficher toute les lignes d'un coup
                    var polyline = L.polyline([[51.481, -0.01], [51.483, -0.02], [51.486, -0.1]], { color: 'red' }).addTo(this.mymap);
                    this.mymap.fitBounds(polyline.getBounds());
                };
                MapComponent = __decorate([
                    core_1.Component({
                        selector: 'my-map',
                        templateUrl: 'app/html/map.html',
                        styleUrls: ['app/css/map.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], MapComponent);
                return MapComponent;
            }());
            exports_1("MapComponent", MapComponent);
            LIGNES = [
                { "id": 11, "nom": "Lyon", "arrets": ARRETS }
            ];
            ARRETS = [
                { "longitude": 40.547, "latitude": -0.04 },
                { "longitude": 45.544, "latitude": -0.01 },
                { "longitude": 48.455, "latitude": -0.06 }
            ];
        }
    }
});
//# sourceMappingURL=map.component.js.map