import { Component, OnInit } from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

declare var L: any;

@Component({
    selector: 'my-map',
    templateUrl: 'app/html/map.html',
    styleUrls:[ 'app/css/map.css']
})

export class MapComponent {
	mymap: any;
 
    constructor() {
    }

    ngAfterContentInit() { 
    	//Créer le template de la map et la center sur londre
		this.mymap = L.map('mapid', {
			center: [51.505, -0.09],
			zoom: 13
		});

		//Affiche la map pour de vrai
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
				ttribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(this.mymap);

		//TODO affichage de données fictives : plusieurs lignes de bus, avec plusieurs arêtes.
		//On peut cliquer sur les lignes et les arêts
    }
}