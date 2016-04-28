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
    var MapComponent, ARRETS, LIGNES;
    function convertToLatLngs(arret) {
        return L.latLng(arret.lon, arret.lat);
    }
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
            }],
        execute: function() {
            MapComponent = (function () {
                function MapComponent() {
                    this.arrets = ARRETS;
                    this.lignes = LIGNES;
                }
                MapComponent.prototype.ngOnInit = function () {
                    this.lignes[0].arrets = this.arrets[0];
                    this.lignes[1].arrets = this.arrets[1];
                    this.lignes[2].arrets = this.arrets[2];
                };
                MapComponent.prototype.ngAfterViewInit = function () {
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
                    //L.marker([51.481, -0.01]).addTo(this.mymap);
                    // create a red polyline from an array of LatLng points -> Bien pour afficher une ligne, voir multiPolyline pour afficher toute les lignes d'un coup
                    //var polyline = L.polyline([[51.481, -0.01], [51.483, -0.02], [51.486, -0.1]], { color: 'red' }).addTo(this.mymap);
                    // this.mymap.fitBounds(polyline.getBounds());
                    // var marker = L.marker([51.481, -0.01]).addTo(this.mymap);
                    // marker.bindPopup("Arrêt: République");
                    // create a red polyline from an array of LatLng points -> Bien pour afficher une ligne, voir multiPolyline pour afficher toute les lignes d'un coup     
                    for (var _a = 0, _b = this.lignes; _a < _b.length; _a++) {
                        var ligne = _b[_a];
                        var arretConvert = [];
                        for (var _c = 0, _d = ligne.arrets; _c < _d.length; _c++) {
                            var arr = _d[_c];
                            var coordonnee = convertToLatLngs(arr);
                            arretConvert.push(coordonnee);
                            //Création d'un cercle pour un arret donné
                            L.circle(coordonnee, 3, {
                                color: ligne.couleur,
                                fillColor: ligne.couleur,
                                fillOpacity: 1
                            }).addTo(this.mymap).bindPopup("<b>" + arr.nom + "</b><br>T1 et T4");
                        }
                        var polyline = L.polyline(arretConvert, { color: ligne.couleur, opacity: 1 }).addTo(this.mymap);
                        //this.mymap.fitBounds(polyline.getBounds());  // Permet de cibler sur un element donnée
                        polyline.bindPopup("<b>Ligne:</b> " + ligne.nom);
                    }
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
            ARRETS = [
                [
                    { "id": 1, "nom": "Arret République", "lon": 51.478, "lat": -0.04 },
                    { "id": 2, "nom": "Arret Marie Curie", "lon": 51.459, "lat": -0.01 },
                    { "id": 3, "nom": "Arret BelleCourt", "lon": 51.428, "lat": -0.06 }
                ],
                [
                    { "id": 1, "nom": "Arret Perrache", "lon": 51.472, "lat": -0.01 },
                    { "id": 2, "nom": "Arret Confluence", "lon": 51.442, "lat": -0.02 },
                    { "id": 3, "nom": "Arret INSA", "lon": 51.440, "lat": -0.01 },
                    { "id": 4, "nom": "Arret Part Dieu", "lon": 51.435, "lat": -0.02 }
                ],
                [
                    { "id": 1, "nom": "Arret Perrache", "lon": 51.481, "lat": -0.01 },
                    { "id": 2, "nom": "Arret Haribot", "lon": 51.483, "lat": -0.02 },
                    { "id": 3, "nom": "Arret Fourvière", "lon": 51.486, "lat": -0.02 },
                ]
            ];
            LIGNES = [
                { "id": 1, "nom": "A", "arrets": ARRETS[0], "couleur": randomColor() },
                { "id": 2, "nom": "B", "arrets": ARRETS[1], "couleur": randomColor() },
                { "id": 3, "nom": "C", "arrets": ARRETS[2], "couleur": randomColor() },
            ];
        }
    }
});
//# sourceMappingURL=map.component.js.map