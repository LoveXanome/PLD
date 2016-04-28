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

    _selectedArret: Arret;
    private _selectedLigne: Ligne;

    private _lignes = LIGNES;

    constructor(private _router: Router, routeParams: RouteParams) {
        this._selectedVille = new Ville();
        this._selectedVille.nom = routeParams.get('nom');
    }

    ngOnInit() {
        this._lignes[0].arrets = ARRETS_C1;
        this._lignes[1].arrets = ARRETS_C2;
    }

    clickArret(arret: Arret) {
        if (this._selectedLigne == null)
            return;

        this._selectedArret = arret;
    }

    /*
        Appellé lorsqu'on clique sur un arrêt de la map
    */
    onClickedArret(arret: Arret) {
        this._selectedArret = arret;
        console.debug(arret);

        //On vérifie que la ligne séléctionner appartient à l'arrêt
        if (this._selectedLigne == null)
            return;

        for (var arr of this._selectedLigne.arrets) {
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

        for (var arr of ligne.arrets) {
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