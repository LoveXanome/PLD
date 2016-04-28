import { Component, OnInit } from 'angular2/core';
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
 
    constructor() {
    }
    
    ngOnInit(){
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

		//circle.bindPopup("<b>Arret Gaston Berger</b><br><img src=\"/picture/bus.png\" alt=\"metro\" style=\"width:30px;height: 28px; \">  T1 et T4");

		//ajout d'une action sur l'arret
		circle.on('click', function() {
			//non de la fonction : changeArret();
		});



        //var marker = L.marker([51.481, -0.01]).addTo(this.mymap);
        //marker.bindPopup("Arrêt: République");
       
        
        // create a red polyline from an array of LatLng points -> Bien pour afficher une ligne, voir multiPolyline pour afficher toute les lignes d'un coup     
        for(var ligne of this.lignes)
        {

            var arretConvert: Arret[] = [];
            for (var arr of ligne.arrets)
            {
                var coordonnee = convertToLatLngs(arr)
                arretConvert.push(coordonnee);
                
                //Création d'un cercle pour un arret donné
                L.circle(coordonnee, 3, {
                    color: ligne.couleur,
                    fillColor: ligne.couleur,
                    fillOpacity: 1
                }).addTo(this.mymap).bindPopup("<b>" + arr.nom + "</b><br><img src=\"/picture/bus.png\" alt=\"metro\" style=\"width:30px;height: 28px; \">  T1 et T4");
            }
            
            var polyline = L.polyline( arretConvert, {color: ligne.couleur , opacity:1 }).addTo(this.mymap)
            //this.mymap.fitBounds(polyline.getBounds());  // Permet de cibler sur un element donnée
            polyline.bindPopup("<b>Ligne:</b> "+ ligne.nom); 
            
        }
        
    }
}

function convertToLatLngs(arret: Arret) {
    return L.latLng(arret.lon , arret.lat);
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
        { "id": 1, "nom": "Arret République" ,"lon":51.478 , "lat":-0.04 }, 
        { "id": 2, "nom": "Arret Marie Curie" ,"lon":51.459 , "lat":-0.01 },
        { "id": 3, "nom": "Arret BelleCourt" ,"lon":51.428 , "lat":-0.06 } 
    ],
    [
        { "id": 1, "nom": "Arret Perrache" ,"lon":51.472 , "lat":-0.01 }, 
        { "id": 2, "nom": "Arret Confluence" ,"lon":51.442 , "lat":-0.02 },
        { "id": 3, "nom": "Arret INSA" ,"lon":51.440, "lat":-0.01 }, 
        { "id": 4, "nom": "Arret Part Dieu" ,"lon":51.435, "lat":-0.02 }
    ],
    [
        { "id": 1, "nom": "Arret Perrache", "lon":51.481 , "lat":-0.01 }, 
        { "id": 2, "nom": "Arret Haribot" ,"lon":51.483 , "lat":-0.02 },
        { "id": 3, "nom": "Arret Fourvière" ,"lon":51.486, "lat":-0.02 }, 
    ]
];

var LIGNES: Ligne[] = [
    { "id": 1, "nom": "A" , "arrets": ARRETS[0] , "couleur": randomColor()},
    { "id": 2, "nom": "B" , "arrets": ARRETS[1] , "couleur": randomColor()},
    { "id": 3, "nom": "C" , "arrets": ARRETS[2] , "couleur": randomColor()},
];

