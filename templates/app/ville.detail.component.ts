import {Component, Input} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Ville} from './ville';

@Component({
    selector: 'my-ville-detail',
    templateUrl: 'app/html/detail.html',
    styleUrls: ['app/css/detail.css']
})

export class VilleDetailComponent {
    private _selectedVille: Ville;

    private _selectedArret: string;
    private _selectedLigne: string;
    
      constructor(
      private _router: Router,
      routeParams: RouteParams) {
        /*if(routeParams.get('nom') !== null)
        {*/
            this._selectedVille = new Ville();
            this._selectedVille.nom = routeParams.get('nom');

            this._selectedArret = "arrêt fictif";
            this._selectedLigne = "ligne fictive";
        //}

    }
}