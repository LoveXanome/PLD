import {Component, Input} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';

import {MapComponent} from './map.component';

import {Ville} from './classes/ville';
import {Ligne} from './classes/ligne';
import {Arret} from './classes/arret';
import {HttpRequest} from './classes/httpRequest';

@Component({
    selector: 'my-ville-detail',
    templateUrl: 'app/html/detail.html',
    styleUrls: ['app/css/detail.css'],
    directives: [MapComponent]
})

export class VilleDetailComponent {
    private _selectedVille: Ville;

    private _selectedArret: Arret;
    result: Object;

    private _selectedLigne: Ligne;
    private _lignes = LIGNES;

    private _httpRequest: HttpRequest;

    constructor(private _router: Router, routeParams: RouteParams, http: Http) {
        this._httpRequest = new HttpRequest(http);

        this._selectedVille = new Ville();
        this._selectedVille.nom = routeParams.get('nom');
    }


    ngOnInit() {
        this._lignes[0].stops = STOPS_C1;
        this._lignes[1].stops = STOPS_C2;
    }

    clickArret(arret: Arret) {
        if (this._selectedLigne == null)
            return;
    }


    /*
        Appellé lorsqu'on clique sur un arrêt de la map
    */
    onClickedArret(arret: Arret) {
        this._selectedArret = arret;
        //console.debug(arret);

        //On vérifie que la ligne séléctionner appartient à l'arrêt
        if (this._selectedLigne == null)
            return;

        for (var arr of this._selectedLigne.stops) {
            if (arr == arret) {
                return;
            }
        }

        this._selectedLigne = null;
    }

    /*
        Appellé lorsqu'on clique sur un arrêt de la map
    */
    onClickedLigne(ligne: Ligne) {
        this._selectedLigne = ligne;

        //On vérifie que l'arrêt séléctionner appartient à la ligne 
        if (this._selectedArret == null)
            return;

        for (var arr of ligne.stops) {
            if (arr == this._selectedArret) {
                return;
            }
        }
     
        this._selectedArret = null;
    }
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

var LIGNES: Ligne[] = [
    { "id": 11, "name": "C1", "category": true, "stops": STOPS_C1 , "color": randomColor() },
    { "id": 12, "name": "C2", "category": false, "stops": STOPS_C2 , "color": randomColor()},
    { "id": 13, "name": "C3", "category": true, "stops": STOPS_C3 , "color": randomColor()},
    { "id": 14, "name": "C4", "category": true, "stops": STOPS_C4 , "color": randomColor()}
];


var STOPS_C1: Arret[] = [
    { "id": 11, "name": "Gare Part-Dieu", "lng": 40547, "lat": -0.04, "is_stop": true },
    {  "id": 12, "name": "Brotteaux", "lng": 45.544 , "lat":-0.01, "is_stop": true },
    {  "id": 13, "name": "Vitton", "lng": 4.455 , "lat":-0.06, "is_stop": true } 
];

var STOPS_C2: Arret[] = [
    { "id": 21, "name": "Gare Part-Dieu", "lng": 40547, "lat": -0.04, "is_stop": true },
    { "id": 22, "name": "Brotteaux", "lng": 45.544, "lat": -0.01, "is_stop": true },
    { "id": 23, "name": "Charpenne", "lng": 4.455, "lat": -0.06, "is_stop": true }
];

var STOPS_C3: Arret[] = [
    { "id": 21, "name": "Gare Part-Dieu",  "lng":40547 , "lat":-0.04, "is_stop": true }, 
    {  "id": 22, "name": "Brotteaux", "lng": 45.544 , "lat":-0.01, "is_stop": true },
    {  "id": 23, "name": "Charpenne", "lng": 4.455 , "lat":-0.06, "is_stop": true } 
];

var STOPS_C4: Arret[] = [
    { "id": 21, "name": "Gare Part-Dieu",  "lng":40547 , "lat":-0.04, "is_stop": true }, 
    {  "id": 22, "name": "Brotteaux", "lng": 45.544 , "lat":-0.01, "is_stop": true },
    {  "id": 23, "name": "Charpenne", "lng": 4.455 , "lat":-0.06, "is_stop": true } 
];