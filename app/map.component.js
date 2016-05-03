System.register(['angular2/core', 'rxjs/Rx', './ville.detail.component'], function(exports_1, context_1) {
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
    var core_1, ville_detail_component_1;
    var MapComponent;
    function convertArretToLatLngs(arret) {
        return L.latLng(arret.location.lat, arret.location.lng);
    }
    function convertLigneToLatLngs(points) {
        var arretConvert = [];
        for (var _a = 0, points_1 = points; _a < points_1.length; _a++) {
            var arr = points_1[_a];
            var coordonnee = convertArretToLatLngs(arr);
            arretConvert.push(coordonnee);
        }
        return arretConvert;
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
            },
            function (_1) {},
            function (ville_detail_component_1_1) {
                ville_detail_component_1 = ville_detail_component_1_1;
            }],
        execute: function() {
            MapComponent = (function () {
                function MapComponent() {
                    this.onClickedArret = new core_1.EventEmitter();
                    this.onClickedLigne = new core_1.EventEmitter();
                }
                MapComponent.prototype.ngOnInit = function () {
                    //TODO à supprimer quand les HTTP sont fait
                    /*this.lignes[0].points = this.stops[0];
                    this.lignes[1].points  = this.stops[1];
                    this.lignes[2].points  = this.stops[2];*/
                };
                MapComponent.prototype.initMap = function (_center_map_lat, _center_map_lng) {
                    //Créer le template de la map
                    this.mymap = L.map('mapid', {
                        center: [_center_map_lat, _center_map_lng],
                        zoom: 13
                    });
                    //Affiche la map pour de vrai
                    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(this.mymap);
                };
                MapComponent.prototype.displayLine = function (ligne) {
                    var _this = this;
                    var polyline;
                    if (ligne.points.length != 0) {
                        polyline = L.polyline(convertLigneToLatLngs(ligne.points), { color: ligne.color, opacity: 1, weight: 8 }).addTo(this.mymap);
                        polyline.on('click', function () {
                            _this.onClickedLigne.emit(ligne);
                        });
                    }
                    else {
                        polyline = L.polyline(convertLigneToLatLngs(ligne.stops), { color: ligne.color, opacity: 1, weight: 8 }).addTo(this.mymap);
                        polyline.on('click', function () {
                            _this.onClickedLigne.emit(ligne);
                        });
                    }
                    var arrets = [];
                    for (var _a = 0, _b = ligne.stops; _a < _b.length; _a++) {
                        var arr = _b[_a];
                        arrets.push(this.displayArret(arr, ligne));
                    }
                    return { 'polyligne': polyline, 'arrets': arrets };
                };
                MapComponent.prototype.displayArret = function (arret, ligne) {
                    var _this = this;
                    var coordonnee = convertArretToLatLngs(arret);
                    //Création d'un cercle pour un arret donné
                    var circle = L.circle(coordonnee, 15, {
                        color: ligne.color,
                        fillColor: 'white',
                        fillOpacity: 1
                    }).addTo(this.mymap);
                    circle.bindPopup(arret.name);
                    circle.on('mouseover', function (e) {
                        this.openPopup();
                    });
                    circle.on('mouseout', function (e) {
                        if (_this._selectedArret != this) {
                            this.closePopup();
                        }
                    });
                    /*
                       Appel une fonction dans ville.detail pour afficher les détail de l'arrêt sélectionner
                    */
                    circle.on('click', function () {
                        _this.onClickedArret.emit(arret);
                    });
                    return circle;
                };
                MapComponent.prototype.showPolyligne = function (leaflet) {
                    this.mymap.addLayer(leaflet.polyligne);
                    for (var _a = 0, _b = leaflet.arrets; _a < _b.length; _a++) {
                        var arr = _b[_a];
                        this.mymap.addLayer(arr);
                    }
                };
                MapComponent.prototype.hidePolyligne = function (leaflet) {
                    this.mymap.removeLayer(leaflet.polyligne);
                    for (var _a = 0, _b = leaflet.arrets; _a < _b.length; _a++) {
                        var arr = _b[_a];
                        this.mymap.removeLayer(arr);
                    }
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], MapComponent.prototype, "onClickedArret", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], MapComponent.prototype, "onClickedLigne", void 0);
                MapComponent = __decorate([
                    core_1.Component({
                        selector: 'my-map',
                        templateUrl: 'app/html/map.html',
                        styleUrls: ['app/css/map.css'],
                        directives: [core_1.forwardRef(function () { return ville_detail_component_1.VilleDetailComponent; })]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MapComponent);
                return MapComponent;
            }());
            exports_1("MapComponent", MapComponent);
        }
    }
});
/*
var STOPS: Arret[][] = [
    [
        { "id": 1, "name": "Arret République" ,"location":{ "lng":51.478 , "lat":-0.04} , "is_stop": true },
        { "id": 2, "name": "Arret Marie Curie" ,"location":{ "lng":51.459 , "lat":-0.01} , "is_stop": false },
        { "id": 3, "name": "Arret BelleCourt" ,"location":{ "lng":51.428 , "lat":-0.06} , "is_stop": true }
    ],
    [
        { "id": 1, "name": "Arret Perrache" ,"location":{ "lng":51.472 , "lat":-0.01}, "is_stop": true },
        { "id": 2, "name": "Arret Confluence" ,"location":{ "lng":51.442 , "lat":-0.02}, "is_stop": false},
        { "id": 3, "name": "Arret INSA" ,"location":{ "lng":51.440, "lat":-0.01}, "is_stop": true },
        { "id": 4, "name": "Arret Part Dieu" ,"location":{ "lng":51.435, "lat":-0.02}, "is_stop": true }
    ],
    [
        { "id": 1, "name": "Arret Perrache", "location":{ "lng":51.481 , "lat":-0.01} , "is_stop": true },
        { "id": 2, "name": "Arret Haribot" ,"location":{ "lng":51.483 , "lat":-0.02}, "is_stop": true },
        { "id": 3, "name": "Arret Fourvière" ,"location":{ "lng":51.486, "lat":-0.02}, "is_stop": true },
    ]
];

var LIGNES: Ligne[] = [
    { "id": 1, "name": "A" ,"category": true, "stops": STOPS[0] , "color": randomColor()},
    { "id": 2, "name": "B" ,"category": false, "stops": STOPS[1] , "color": randomColor()},
    { "id": 3, "name": "C" ,"category": true, "stops": STOPS[2] , "color": randomColor()},
];
*/
//# sourceMappingURL=map.component.js.map