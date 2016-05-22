import {Component, OnInit, Output, EventEmitter, forwardRef} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';
import 'rxjs/Rx';

import {VilleDetailComponent} from './ville.detail.component';

import {Ligne} from './classes/ligne';
import {Arret} from './classes/arret';
import {HttpRequest} from './classes/httpRequest'

declare var L: any;

@Component({
    selector: 'my-map',
    templateUrl: 'app/html/map.html',
    styleUrls: ['app/css/map.css'],
    directives: [forwardRef(() => VilleDetailComponent)]
})

export class MapComponent {
	mymap: any;
    /*stops = STOPS;
    lignes = LIGNES;*/

    private _httpRequest: HttpRequest;
    private _center_map_lat : any;
    private _center_map_lng : any;
    private _lignes: Ligne[];

    private _selectedArret: any;

    @Output() onClickedArret = new EventEmitter();
    @Output() onClickedLigne = new EventEmitter();

    constructor() {
    }
    
    ngOnInit(){
        //TODO à supprimer quand les HTTP sont fait
        /*this.lignes[0].points = this.stops[0]; 
        this.lignes[1].points  = this.stops[1];
        this.lignes[2].points  = this.stops[2];*/
    }


    initMap(_center_map_lat: any, _center_map_lng : any)
    {
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

    }

    displayLine(ligne: Ligne) {
        var _this = this;
        
        var polyline;
        if(ligne.points.length != 0 ){
            if (ligne.category) {
                polyline = L.polyline(convertLigneToLatLngs(ligne.points), { color: ligne.color, opacity: 1, weight: 8 }).addTo(this.mymap);
            }
            else {
                polyline = L.polyline(convertLigneToLatLngs(ligne.points), { color: ligne.color, opacity: 1, weight: 8, dashArray: [3, 10] }).addTo(this.mymap);
            }

            polyline.on('click', function() {
                    _this.onClickedLigne.emit(ligne);
            });
        }
        else {
            if (ligne.category) {
                polyline = L.polyline(convertLigneToLatLngs(ligne.stops), { color: ligne.color, opacity: 1, weight: 8 }).addTo(this.mymap);
            }
            else {
                polyline = L.polyline(convertLigneToLatLngs(ligne.stops), { color: ligne.color, opacity: 1, weight: 8, dashArray: [3, 10] }).addTo(this.mymap);
            }

            polyline.on('click', function() {
                _this.onClickedLigne.emit(ligne);
            }); 
        }
        
        var arrets = [];
		
        for (var arr of ligne.stops) {
            arrets.push(this.displayArret(arr, ligne));
		}

        return { 'polyligne': polyline, 'arrets': arrets} ;
    }

    displayArret(arret: Arret, ligne: Ligne) {
        var _this = this;
        var coordonnee = convertArretToLatLngs(arret);
        //Création d'un cercle pour un arret donné
        var circle = L.circle(coordonnee, 15, {
            color: ligne.color,
            fillColor: 'white',
            fillOpacity: 1
        }).addTo(this.mymap);

        circle.bindPopup(arret.name);

        circle.on('mouseover', function(e) {
            this.openPopup();
        });

        circle.on('mouseout', function(e) {
            if (_this._selectedArret != this)
            {
                this.closePopup();
            }
        });

        /*
           Appel une fonction dans ville.detail pour afficher les détail de l'arrêt sélectionner
        */
        circle.on('click', function() {
            _this.onClickedArret.emit(arret);
        });

        return circle;
    }

    showPolyligne(leaflet: any) {
        this.mymap.addLayer(leaflet.polyligne);

        for (var arr of leaflet.arrets) {
            this.mymap.addLayer(arr);
        }

    }

    hidePolyligne(leaflet: any) {
        this.mymap.removeLayer(leaflet.polyligne);

        for (var arr of leaflet.arrets) {
            this.mymap.removeLayer(arr);
        }
    }
}

function convertArretToLatLngs(arret: Arret) {
    return L.latLng(arret.location.lat , arret.location.lng);
}

function convertLigneToLatLngs(points : Arret[]) {
    var arretConvert: Location[] = [];
    for (var arr of points )
    {
        var coordonnee = convertArretToLatLngs(arr)
        arretConvert.push(coordonnee);
    }
    return arretConvert;
}

function randomColor(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var _i = 0; _i < 6; _i++ ) 
    {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;    
}

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
