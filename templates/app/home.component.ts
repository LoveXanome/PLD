import { Component, OnInit } from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Ville} from './ville';
import {VilleDetailComponent} from './ville.detail.component';


@Component({
    selector: 'my-home',
    templateUrl: 'app/html/home.html'
})


export class HomeComponent {
    constructor(private _router: Router) { };

    villes = VILLES;
    selectedVille: Ville;

    onChange(ville: Ville) {
        this.selectedVille = ville;
    }

    gotoDetail() {
        this._router.navigate(['VilleDetail', {nom: this.selectedVille} ]);
    }
}

var VILLES: Ville[] = [
    { "id": 11, "nom": "Lyon" },
    { "id": 12, "nom": "Nante" },
    { "id": 13, "nom": "Bourg-en-Bress" },
    { "id": 14, "nom": "Orléant" },
    { "id": 15, "nom": "Grenoble" },
    { "id": 16, "nom": "Troyes" },
    { "id": 17, "nom": "Paris" },
    { "id": 18, "nom": "Marseille" },
    { "id": 19, "nom": "St-Etienne" },
    { "id": 20, "nom": "Lille" }
];