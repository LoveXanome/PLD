import { Component, OnInit } from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Ville} from './classes/ville';
import {VilleDetailComponent} from './ville.detail.component';

@Component({
    selector: 'my-home',
    templateUrl: 'app/html/home.html',
    styleUrls: ['app/css/home.css']
})

export class HomeComponent {
    villes = VILLES;
    private _selectedNomVille: string;

    constructor(private _router: Router) { 
    };

    ngOnInit() {
        this._selectedNomVille = this.villes[0].agency;
    }

    onChange(ville) {
        this._selectedNomVille = ville;
        console.debug(this._selectedNomVille);
    }

    gotoDetail() {
        this._router.navigate(['VilleDetail', { nom: this._selectedNomVille } ]);
    }
}

var VILLES: Ville[] = [
    { "id": 11, "agency": "Lyon", "location":{ "lat":51.472 , "lng":-0.01}, "lignes":null },
    { "id": 12, "agency": "Nante","location":{ "lat":51.472 , "lng":-0.01}, "lignes":null },
    { "id": 13, "agency": "Bourg-en-Bress","location":{ "lat":51.472 , "lng":-0.01}, "lignes":null },
    { "id": 14, "agency": "Orléant","location":{ "lat":51.472 , "lng":-0.01}, "lignes":null },
    { "id": 15, "agency": "Grenoble","location":{ "lat":51.472 , "lng":-0.01}, "lignes":null },
    { "id": 16, "agency": "Troyes","location":{ "lat":51.472 , "lng":-0.01}, "lignes":null },
    { "id": 17, "agency": "Paris","location":{ "lat":51.472 , "lng":-0.01}, "lignes":null },
    { "id": 18, "agency": "Marseille","location":{ "lat":51.472 , "lng":-0.01}, "lignes":null },
    { "id": 19, "agency": "St-Etienne","location":{ "lat":51.472 , "lng":-0.01}, "lignes":null },
    { "id": 20, "agency": "Lille","location":{ "lat":51.472 , "lng":-0.01}, "lignes":null }
];
