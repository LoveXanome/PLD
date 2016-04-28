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
       this.lignes[0].arrets = this.arrets; 
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
        var marker = L.marker([51.481, -0.01]).addTo(this.mymap);
        marker.bindPopup("Arrêt: République");
        
        
        // create a red polyline from an array of LatLng points -> Bien pour afficher une ligne, voir multiPolyline pour afficher toute les lignes d'un coup
       
        for(var ligne of this.lignes)
        {
            //console.debug(ligne);
            var arretConvert: Arret[] = [];
            for (var arr of ligne.arrets)
            {
                arretConvert.push(convertToLatLngs(arr));
            }
            
            var polyline = L.polyline( arretConvert, {color: '#E515B6'}).addTo(this.mymap)
            this.mymap.fitBounds(polyline.getBounds());
            polyline.bindPopup("Ligne: "+ ligne.nom); 
        }
        
        
        
    }
}

function convertToLatLngs(arret: Arret) {
    return L.latLng(arret.lon , arret.lat);
}

var ARRETS: Arret[] = [ 
    { "lon":51.478 , "lat":-0.04 }, 
    { "lon":51.459 , "lat":-0.01 },
    { "lon":51.428 , "lat":-0.06 } 
];

var LIGNES: Ligne[] = [
    { "id": 1, "nom": "B" , "arrets": ARRETS}
];

