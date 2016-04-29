import {Component, Input, Output, EventEmitter} from 'angular2/core';
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

    @Output() displayLine = new EventEmitter<Ligne>();

    private _selectedVille: Ville;
    private _selectedArret: Arret;
    private _selectedLigne: Ligne;

    private _lignes: Ligne[];

    private _lignesUrbaines: Ligne[];
    private _lignesNonUrbaines: Ligne[];

    private _lignesAllChecked: boolean;
    private _lignesUrbainesChecked: boolean;
    private _lignesNonUrbainesChecked: boolean;

    private _httpRequest: HttpRequest;
    private _mapComponent: MapComponent;

    constructor(private _router: Router, routeParams: RouteParams, http: Http) {
        this._selectedVille = new Ville();

        this._selectedVille.agency = routeParams.get('nom');
    
        this._lignesUrbaines = [];
        this._lignesNonUrbaines = [];

        this._mapComponent = new MapComponent();

        this._httpRequest = new HttpRequest(this, http);
        this._httpRequest.get('http://localhost:5000/agencies/1/routes', this.getHttpResult);

        this._httpRequest.get('http://localhost:5000/agencies/1/routes/102', this.getLigneDetails);


        this._lignesUrbainesChecked = false;
        this._lignesNonUrbainesChecked = false;
        this._lignesAllChecked = false;
    }

    ngOnInit() {
        /*this._lignes[0].stops = STOPS_C1;
        this._lignes[1].stops = STOPS_C2;
        this._lignes[2].stops = STOPS_C3;
        this._lignes[3].stops = STOPS_C4;*/
    }
    getLigneDetails(_this : any, data: any)
    {
        console.debug(data);
        var idLigne = data.route.id;
        console.debug(idLigne);
        for (var ligne of _this._lignes)
        {
            if(ligne.id==idLigne)
            {              
                ligne.stops = data.route.points;
                console.debug(ligne.stops);
                _this._mapComponent.displayLine(ligne);
            }
        }
    }

    /*
    le this. est undefined, car la function est appellé par httpRequest. Il est donc passé en paramètre
    */
    getHttpResult(_this : any, _data : any) {
        var data = _data.data;

         //Initialisation de la map
        _this._mapComponent.initMap(data.location.lat, data.location.lng);

        //recuperation des lignes
        _this._lignes = data.routes; 

        /*
            trie des lignes entre urbaines ou pas
        */
        for (var ligne of _this._lignes)
        {
            if (ligne.category)
                _this._lignesUrbaines.push(ligne);
            else
                _this._lignesNonUrbaines.push(ligne);
        }
    }

    /*
        Appellé lorsqu'on clique sur un arrêt pour la lignes
    */
    onChoseArretOfLine(arret: Arret) {
        if (this._selectedLigne == null)
            return;
        this._selectedArret = arret;
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

    selectTous() {
        console.debug(this._lignesAllChecked);
        this._lignesAllChecked = !this._lignesAllChecked;
        
        this._lignesUrbainesChecked = this._lignesAllChecked;
        this._lignesNonUrbainesChecked = this._lignesAllChecked;

        for (var ligne of this._lignes)
        {
            ligne.isChecked = this._lignesAllChecked;
        }
    }

    selectUrbain() {
        this._lignesUrbainesChecked = !this._lignesUrbainesChecked;
        for (var ligne of this._lignesUrbaines)
        {
            ligne.isChecked = this._lignesUrbainesChecked;
        }
    }

    selectNonUrbain() {
        this._lignesNonUrbainesChecked = !this._lignesNonUrbainesChecked;
        for (var ligne of this._lignesNonUrbaines) {
            ligne.isChecked = this._lignesNonUrbainesChecked;
        }
    }

    selectLigne(ligne: Ligne) {
        ligne.isChecked = !ligne.isChecked;
        if (!ligne.isChecked && ligne.category && this._lignesUrbainesChecked)
            this._lignesUrbainesChecked = false;
        if (!ligne.isChecked && !ligne.category && this._lignesNonUrbainesChecked)
            this._lignesNonUrbainesChecked = false;
    }

    printLines() {

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
    { "id": 11, "name": "C1", "category": true, "stops": STOPS_C1, "color": randomColor(), 'isChecked': false},
    { "id": 12, "name": "C2", "category": false, "stops": STOPS_C2, "color": randomColor(), 'isChecked': false},
    { "id": 13, "name": "C3", "category": true, "stops": STOPS_C3, "color": randomColor(), 'isChecked': false},
    { "id": 14, "name": "C4", "category": true, "stops": STOPS_C4, "color": randomColor(), 'isChecked': false}
];


var STOPS_C1: Arret[] = [
    { "id": 11, "name": "Gare Part-Dieu", "location":{"lng": 40547, "lat": -0.04}, "is_stop": true },
    {  "id": 12, "name": "Brotteaux","location":{ "lng": 45.544 , "lat":-0.01}, "is_stop": true },
    {  "id": 13, "name": "Vitton", "location":{"lng": 4.455 , "lat":-0.06}, "is_stop": true } 
];

var STOPS_C2: Arret[] = [
    { "id": 21, "name": "Gare Part-Dieu", "location":{"lng": 40547, "lat": -0.04}, "is_stop": true },
    { "id": 22, "name": "Brotteaux", "location":{"lng": 45.544, "lat": -0.01}, "is_stop": true },
    { "id": 23, "name": "Charpenne", "location":{"lng": 4.455, "lat": -0.06}, "is_stop": true }
];

var STOPS_C3: Arret[] = [
    { "id": 21, "name": "Gare Part-Dieu",  "location":{"lng":40547 , "lat":-0.04}, "is_stop": true }, 
    {  "id": 22, "name": "Brotteaux", "location":{"lng": 45.544 , "lat":-0.01}, "is_stop": true },
    {  "id": 23, "name": "Charpenne", "location":{"lng": 4.455 , "lat":-0.06}, "is_stop": true } 
];

var STOPS_C4: Arret[] = [
    { "id": 21, "name": "Gare Part-Dieu",  "location":{"lng":40547 , "lat":-0.04}, "is_stop": true }, 
    {  "id": 22, "name": "Brotteaux", "location":{"lng": 45.544 , "lat":-0.01}, "is_stop": true },
    {  "id": 23, "name": "Charpenne", "location":{"lng": 4.455 , "lat":-0.06}, "is_stop": true } 
];