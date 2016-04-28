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

        this._lignes[0].arrets = ARRETS_C1;
        this._lignes[1].arrets = ARRETS_C2;

       // console.debug(this._lignes);
    }

    ngAfterViewInit() {         
    }


    changeArret() {
        if (this._selectedArret == null) {
            this._selectedArret = this._lignes[0].arrets[0];
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
        this._selectedArret = this._lignes[0].arrets[0];
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
    { "id": 11, "nom": "C1", "categorie": true, "arrets": ARRETS_C1 , "couleur": randomColor() },
    { "id": 12, "nom": "C2", "categorie": false, "arrets": ARRETS_C2 , "couleur": randomColor()},
    { "id": 13, "nom": "C3", "categorie": true, "arrets": ARRETS_C3 , "couleur": randomColor()},
    { "id": 14, "nom": "C4", "categorie": true, "arrets": ARRETS_C4 , "couleur": randomColor()}
];


var ARRETS_C1: Arret[] = [
    { "id": 11, "nom": "Gare Part-Dieu", "longitude": 40547, "latitude": -0.04 },
    {  "id": 12, "nom": "Brotteaux", "longitude": 45.544 , "latitude":-0.01 },
    {  "id": 13, "nom": "Vitton", "longitude": 4.455 , "latitude":-0.06 } 
];

var ARRETS_C2: Arret[] = [
    { "id": 21, "nom": "Gare Part-Dieu", "longitude": 40547, "latitude": -0.04 },
    { "id": 22, "nom": "Brotteaux", "longitude": 45.544, "latitude": -0.01 },
    { "id": 23, "nom": "Charpenne", "longitude": 4.455, "latitude": -0.06 }
];

var ARRETS_C3: Arret[] = [
    { "id": 21, "nom": "Gare Part-Dieu",  "longitude":40547 , "latitude":-0.04 }, 
    {  "id": 22, "nom": "Brotteaux", "longitude": 45.544 , "latitude":-0.01 },
    {  "id": 23, "nom": "Charpenne", "longitude": 4.455 , "latitude":-0.06 } 
];

var ARRETS_C4: Arret[] = [
    { "id": 21, "nom": "Gare Part-Dieu",  "longitude":40547 , "latitude":-0.04 }, 
    {  "id": 22, "nom": "Brotteaux", "longitude": 45.544 , "latitude":-0.01 },
    {  "id": 23, "nom": "Charpenne", "longitude": 4.455 , "latitude":-0.06 } 
];