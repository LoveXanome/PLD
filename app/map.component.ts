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

    private _selectedArret: any;

    @Output() onClickedArret = new EventEmitter();
    @Output() onClickedLigne = new EventEmitter();

    constructor() {
    }
    
    ngOnInit(){
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
