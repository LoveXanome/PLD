import { Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Ligne} from './ligne';
import {Arret} from './arret';

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
        
        //create a Marker
        //L.marker([51.481, -0.01]).addTo(this.mymap);

        // create a red polyline from an array of LatLng points -> Bien pour afficher une ligne, voir multiPolyline pour afficher toute les lignes d'un coup

        var polyline = L.polyline([[51.481, -0.01], [51.483, -0.02], [51.486, -0.1]], { color: 'red' }).addTo(this.mymap);
        this.mymap.fitBounds(polyline.getBounds());

       	//Pour afficher les arrêts
		var circle = L.circle([51.481, -0.08], 100, {
    		  color: 'red',
    		  fillColor: '#f03',
    		  fillOpacity: 1
    	}).addTo(this.mymap);

		circle.bindPopup("<b>Arret Gaston Berger</b><br><img src=\"/picture/bus.png\" alt=\"metro\" style=\"width:30px;height: 28px; \">  T1 et T4");

        var marker = L.marker([51.481, -0.01]).addTo(this.mymap);
        marker.bindPopup("Arrêt: République");

        //var marker = L.marker([51.481, -0.01]).addTo(this.mymap);
        //marker.bindPopup("Arrêt: République");

        // create a red polyline from an array of LatLng points -> Bien pour afficher une ligne, voir multiPolyline pour afficher toute les lignes d'un coup   
        for (var ligne of this.lignes) {
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
			var coordonnee = convertArretToLatLngs(arr);
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
                _this.onClickedArret.emit(arr);
            });
		}
	}
}

function convertArretToLatLngs(arret: Arret) {
    return L.latLng(arret.lng , arret.lat);
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
        { "id": 1, "name": "Arret République" ,"lng":51.478 , "lat":-0.04 }, 
        { "id": 2, "name": "Arret Marie Curie" ,"lng":51.459 , "lat":-0.01 },
        { "id": 3, "name": "Arret BelleCourt" ,"lng":51.428 , "lat":-0.06 } 
    ],
    [
        { "id": 1, "name": "Arret Perrache" ,"lng":51.472 , "lat":-0.01 }, 
        { "id": 2, "name": "Arret Confluence" ,"lng":51.442 , "lat":-0.02 },
        { "id": 3, "name": "Arret INSA" ,"lng":51.440, "lat":-0.01 }, 
        { "id": 4, "name": "Arret Part Dieu" ,"lng":51.435, "lat":-0.02 }
    ],
    [
        { "id": 1, "name": "Arret Perrache", "lng":51.481 , "lat":-0.01 }, 
        { "id": 2, "name": "Arret Haribot" ,"lng":51.483 , "lat":-0.02 },    
        { "id": 3, "name": "Arret Fourvière" ,"lng":51.486, "lat":-0.02 }, 
    ]
];

var LIGNES: Ligne[] = [
    { "id": 1, "name": "A" ,"category": true, "stops": STOPS[0] , "color": randomColor()},
    { "id": 2, "name": "B" ,"category": false, "stops": STOPS[1] , "color": randomColor()},
    { "id": 3, "name": "C" ,"category": true, "stops": STOPS[2] , "color": randomColor()},
];

