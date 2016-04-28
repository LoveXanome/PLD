import {Component, Input} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {MapComponent} from './map.component';

import {Ville} from './ville';
import {Ligne} from './ligne';
import {Arret} from './arret';

@Component({
    selector: 'my-ville-detail',
    templateUrl: 'app/html/detail.html',
    styleUrls: ['app/css/detail.css'],
    directives: [MapComponent]
})

export class VilleDetailComponent {
    private _selectedVille: Ville;

    private _selectedArret: Arret;
    private _selectedLigne: Ligne;

    private _lignes = LIGNES;

    constructor(private _router: Router, routeParams: RouteParams) {
        this._selectedVille = new Ville();
        this._selectedVille.nom = routeParams.get('nom');
    }

    ngOnInit() {
        //this._selectedArret = "arrêt fictif";
        //this._selectedLigne = "ligne fictive";

        this._lignes[0].stops = STOPS_C1;
        this._lignes[1].stops = STOPS_C2;

       // console.debug(this._lignes);
    }

    ngAfterViewInit() {         
    }


    changeArret() {
        if (this._selectedArret == null) {
            this._selectedArret = this._lignes[0].stops[0];
        }
        else
            this._selectedArret = null;
    }

    changeLigne() {
        if (this._selectedLigne == null)
        {
            this._selectedLigne = this._lignes[0];
        }
        else
            this._selectedLigne = null;

    }

    clickLigne(idLigne: number) {
        //TODO récupérer les informations AJAX
        this._selectedLigne = this._lignes[0];
    }

    clickArret(idLigne: number) {
        //TODO récupérer les informations AJAX
        this._selectedArret = this._lignes[0].stops[0];
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
    { "id": 11, "name": "Gare Part-Dieu", "lng": 40547, "lat": -0.04 },
    {  "id": 12, "name": "Brotteaux", "lng": 45.544 , "lat":-0.01 },
    {  "id": 13, "name": "Vitton", "lng": 4.455 , "lat":-0.06 } 
];

var STOPS_C2: Arret[] = [
    { "id": 21, "name": "Gare Part-Dieu", "lng": 40547, "lat": -0.04 },
    { "id": 22, "name": "Brotteaux", "lng": 45.544, "lat": -0.01 },
    { "id": 23, "name": "Charpenne", "lng": 4.455, "lat": -0.06 }
];

var STOPS_C3: Arret[] = [
    { "id": 21, "name": "Gare Part-Dieu",  "lng":40547 , "lat":-0.04 }, 
    {  "id": 22, "name": "Brotteaux", "lng": 45.544 , "lat":-0.01 },
    {  "id": 23, "name": "Charpenne", "lng": 4.455 , "lat":-0.06 } 
];

var STOPS_C4: Arret[] = [
    { "id": 21, "name": "Gare Part-Dieu",  "lng":40547 , "lat":-0.04 }, 
    {  "id": 22, "name": "Brotteaux", "lng": 45.544 , "lat":-0.01 },
    {  "id": 23, "name": "Charpenne", "lng": 4.455 , "lat":-0.06 } 
];