import { Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Ligne} from './classes/ligne';
import {Arret} from './classes/arret';

declare var L: any;

@Component({
    selector: 'my-map',
    templateUrl: 'app/html/map.html',
    styleUrls:[ 'app/css/map.css']
})

export class MapComponent {
	mymap: any;
    stops = STOPS;
    lignes = LIGNES;

    @Output() onClickedArret = new EventEmitter<Arret>();
    @Output() onClickedLigne = new EventEmitter<Ligne>();

    constructor() {
    }
    
    ngOnInit(){
        this.lignes[0].stops  = this.stops [0]; 
        this.lignes[1].stops  = this.stops [1];
        this.lignes[2].stops  = this.stops [2];
    }

    ngAfterViewInit() { 
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
        
        //Boucle pour les test, requête pour la liste des lignes ( nom, id, category)
        for (var ligne of this.lignes) {
            // pour la ligne récupérer les infos
			this.displayLine(ligne);
        }
    }


    displayLine(ligne: Ligne) {
        var _this = this;
        
        var polyline2 = L.polyline(convertLigneToLatLngs(ligne.stops), { color: ligne.color, opacity: 1, weight: 8 }).addTo(this.mymap);

        polyline2.on('click', function() {
            _this.onClickedLigne.emit(ligne);
        });

		for (var arr of ligne.stops) {
            //arr.ligneId = ligne.id;
			if (arr.is_stop == true)
            {
                this.displayArret(arr, ligne);
            }
		}
	}

    displayArret(arret: Arret, ligne: Ligne){
        var _this = this;
        var coordonnee = convertArretToLatLngs(arret);
        //Création d'un cercle pour un arret donné
        var circle = L.circle(coordonnee, 15, {
            color: ligne.color,
            fillColor: 'white',
            fillOpacity: 1
        }).addTo(this.mymap);

        /*
           Appel une fonction dans ville.detail pour afficher les détail de l'arrêt sélectionner
        */  
        circle.on('click', function() {
            _this.onClickedArret.emit(arret);
        });
    }



}




function convertArretToLatLngs(arret: Arret) {
    return L.latLng(arret.location.lng , arret.location.lat);
}

function convertLigneToLatLngs(stops : Arret[]) {
    var arretConvert: Arret[] = [];
    for (var arr of stops )
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

