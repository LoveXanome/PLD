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
    arrets = ARRETS;
    lignes = LIGNES;

    @Output() onClickedArret = new EventEmitter<Arret>();
    @Output() onClickedLigne = new EventEmitter<Ligne>();

    constructor() {
    }

    ngOnInit() {
        this.lignes[0].arrets = this.arrets[0];
        this.lignes[1].arrets = this.arrets[1];
        this.lignes[2].arrets = this.arrets[2];
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
        
        var polyline2 = L.polyline(convertLigneToLatLngs(ligne.arrets), { color: ligne.couleur, opacity: 1, weight: 8 }).addTo(this.mymap);

        polyline2.on('click', function() {
            _this.onClickedLigne.emit(ligne);
        });

		for (var arr of ligne.arrets) {
            arr.ligneId = ligne.id;
			var coordonnee = convertArretToLatLngs(arr);
			//Création d'un cercle pour un arret donné
            var circle = L.circle(coordonnee, 15, {
                color: ligne.couleur,
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
    return L.latLng(arret.longitude , arret.latitude);
}

function convertLigneToLatLngs(arrets: Arret[]) {
    var arretConvert: Arret[] = [];
    for (var arr of arrets)
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
var ARRETS: Arret[][] = [ 
    [
        { "id": 1, "nom": "Arret République" ,"longitude":51.478 , "latitude":-0.04 }, 
        { "id": 2, "nom": "Arret Marie Curie" ,"longitude":51.459 , "latitude":-0.01 },
        { "id": 3, "nom": "Arret BelleCourt" ,"longitude":51.428 , "latitude":-0.06 } 
    ],
    [
        { "id": 1, "nom": "Arret Perrache" ,"longitude":51.472 , "latitude":-0.01 }, 
        { "id": 2, "nom": "Arret Confluence" ,"longitude":51.442 , "latitude":-0.02 },
        { "id": 3, "nom": "Arret INSA" ,"longitude":51.440, "latitude":-0.01 }, 
        { "id": 4, "nom": "Arret Part Dieu" ,"longitude":51.435, "latitude":-0.02 }
    ],
    [
        { "id": 1, "nom": "Arret Perrache", "longitude":51.481 , "latitude":-0.01 }, 
        { "id": 2, "nom": "Arret Haribot" ,"longitude":51.483 , "latitude":-0.02 },    
        { "id": 3, "nom": "Arret Fourvière" ,"longitude":51.486, "latitude":-0.02 }, 
    ]
];

var LIGNES: Ligne[] = [
    { "id": 1, "nom": "A" ,"categorie": true, "arrets": ARRETS[0] , "couleur": randomColor()},
    { "id": 2, "nom": "B" ,"categorie": false, "arrets": ARRETS[1] , "couleur": randomColor()},
    { "id": 3, "nom": "C" ,"categorie": true, "arrets": ARRETS[2] , "couleur": randomColor()},
];

