import { Component, OnInit } from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';
import 'rxjs/Rx';

import {HttpRequest} from './classes/httpRequest'
import {Ville} from './classes/ville';
import {VilleDetailComponent} from './ville.detail.component';

@Component({
    selector: 'my-home',
    templateUrl: 'app/html/home.html',
    styleUrls: ['app/css/home.css', 'app/css/style.css']
})

export class HomeComponent {
    villes : Ville[] = [];
    private _selectedNomVille: string;
    private _selectedIdVille: Number;
    private _httpRequest: HttpRequest;

    private _FileUploadName: string;


    constructor(private _router: Router, routeParams: RouteParams, http: Http) {
        this._httpRequest = new HttpRequest(this, http);
        this._httpRequest.get('http://localhost:5000/agencies', this.getResult);
        //console.debug(this.villes[0].agency);
    }

    ngOnInit() {
        // si on init ici la première valeur,ça ne marche pas du tout! pourquoi ? Je sais pas
    }

    onChange(id) {
        this._selectedIdVille = id;
    }

    onChangeFile(name){
        this._FileUploadName = name  
    }

    gotoDetail() {
        this._router.navigate(['VilleDetail', { id: this._selectedIdVille } ]);
    }

    uploadFile(){

    }

    getResult(_this : any, data: any) {
        //On appelle l'initialisation des villes/réseaux
        _this.initVille(data.agencies);
    }

    initVille( VILLES: any ){
        for(var _i = 0 ; _i <VILLES.length; _i++)
        {
            //Pour chaque nouveau réseau, ou push dans la liste 
            this.villes.push({"id": VILLES[_i].id, "agency": VILLES[_i].name, "location":null, "lignes":null });
        }
        //On initialise la valeur de la comboBox au premier élément de la liste
        this._selectedIdVille = this.villes[0].id;
    }
}

