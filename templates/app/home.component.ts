import { Component, OnInit } from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Ville} from './ville';
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
        this._selectedNomVille = this.villes[0].nom;
    }

    onChange(ville) {
        this._selectedNomVille = ville;
    }

    gotoDetail() {
        this._router.navigate(['VilleDetail', { nom: this._selectedNomVille } ]);
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