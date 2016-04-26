import {Component, Input} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Ville} from './ville';

@Component({
    selector: 'my-ville-detail',
    templateUrl: 'app/html/detail.html'
})

export class VilleDetailComponent {
    private _selectedVille: Ville;
    
    constructor(
      private _router: Router,
      routeParams: RouteParams) {
        /*if(routeParams.get('nom') !== null)
        {*/
            this._selectedVille = new Ville();
            this._selectedVille.nom = routeParams.get('nom');
        //}

    }
}