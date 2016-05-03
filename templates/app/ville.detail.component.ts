import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';

import {MapComponent} from './map.component';

import {Ville} from './classes/ville';
import {Ligne} from './classes/ligne';
import {Arret} from './classes/arret';
import {AffichageLigne} from './classes/affichageLigne';

import {HttpRequest} from './classes/httpRequest';
import {PipeFilter} from './classes/pipeFilter';

@Component({
    selector: 'my-ville-detail',
    templateUrl: 'app/html/detail.html',
    styleUrls: ['app/css/detail.css'],
    directives: [MapComponent],
    pipes: [PipeFilter]
})

export class VilleDetailComponent {

    @Output() displayLine = new EventEmitter<Ligne>();

    private _selectedVille: Ville;
    private _selectedArret: Arret;
    private _selectedLigne: Ligne;

    private _lignes: Ligne[];
    private _printedLignes: Object;

    private _lignesUrbaines: Ligne[];
    private _lignesNonUrbaines: Ligne[];

    private _lignesAllChecked: boolean;
    private _lignesUrbainesChecked: boolean;
    private _lignesNonUrbainesChecked: boolean;
    private _searchInput: string;

    private _loadingAgence: boolean;
    private _loadingRoutes: boolean;

    private _httpRequest: HttpRequest;
    private _mapComponent: MapComponent;

    private _sTimeout: number;
    private _boolTimeOut: boolean;

    constructor(private _router: Router, routeParams: RouteParams, http: Http) {
        this._selectedVille = new Ville();
        
        //Le + permet de convertir en Number
        this._selectedVille.id = +routeParams.get('id');
    
        this._lignesUrbaines = [];
        this._lignesNonUrbaines = [];
        //this._lignes = [];
        this._mapComponent = new MapComponent();
        this._mapComponent.onClickedLigne.subscribe(item => this.onClickedLigne(item));
        this._mapComponent.onClickedArret.subscribe(item => this.onClickedArret(item));

        this._loadingAgence = true;
        this._loadingRoutes = true;

        this._httpRequest = new HttpRequest(this, http);
        this._httpRequest.get('http://localhost:5000/agencies/'+ this._selectedVille.id +'/routes' , this.httpLignesAgences);
        this._httpRequest.get('http://localhost:5000/agencies/'+ this._selectedVille.id, this.httpInfoAgence);

        this._sTimeout = setTimeout(() => this.timeOutServer(), 15000);
        this._boolTimeOut = false;
                
        this._lignesUrbainesChecked = false;
        this._lignesNonUrbainesChecked = false;
        this._lignesAllChecked = false;
        this._searchInput = "";

        this._printedLignes = {};
        
        
        
    }

    ngOnInit() {
    }
    
    timeOutServer() { 
        this._boolTimeOut = true;
    }

/*
==============================================================================
                            RESULTATS HTTP
==============================================================================
*/
     
    httpGetArret(_thisVilleDetail : any, _data : any){

        _thisVilleDetail._selectedArret.routes = _data.stop.routes;
        _thisVilleDetail._selectedArret.population_200m = _data.stop.population_200m;

        console.debug(_thisVilleDetail._selectedArret);
        
        console.debug(_thisVilleDetail._selectedArret.population_200m);
        
        for(var route of _thisVilleDetail._selectedArret.routes){
            if(_thisVilleDetail._selectedLigne.id == route.id){
                _thisVilleDetail._selectedArret.vitesse_Arret_ligne = Math.round(route.average_speed * 1000 ) / 1000;
                _thisVilleDetail._selectedArret.passageW_Arret_ligne = route.passages.passagesWeek;
                _thisVilleDetail._selectedArret.passageWE_Arret_ligne = route.passages.passagesWE;
            } 
        }
    }
     
    httpGetPassage (_thisVilleDetail : any, _data : any){
        
        _thisVilleDetail._selectedArret.passagesSemaine = _data.passages.passagesSemaine;
        _thisVilleDetail._selectedArret.passagesWE = _data.passages.passagesWE;
        
    } 
     
    httpLignesAgences(_thisVilleDetail : any, _data : any){
        //recuperation des lignes
        _thisVilleDetail._lignes = _data.routes;
        for( var ligne of _thisVilleDetail._lignes){
            ligne.interdistance = Math.floor(ligne.interdistance);
            if(ligne.ratio != null )
                ligne.ratio = Math.round(ligne.ratio * 1000) / 1000;
        }

        _thisVilleDetail._loadingAgence = false;
    }

    httpLigneDetails(_thisVilleDetail : any, data: any){
        //console.debug(data);
        var idLigne = data.route.id;
        //console.debug(idLigne);
        for (var ligne of _thisVilleDetail._lignes)
        {
            if(ligne.id==idLigne)
            {   
                ligne = data.route;
                ligne.interdistance = Math.round(data.route.interdistance * 1000) / 1000;
                ligne.ratio = Math.round(data.route.ratio * 1000) / 1000;
                ligne.average_speed = Math.round(data.route.average_speed *1000 ) /1000;

                ligne.color = randomColor();
                
                _thisVilleDetail._printedLignes[ligne.id] = new AffichageLigne();
                _thisVilleDetail._printedLignes[ligne.id].isPrinted = true;
                _thisVilleDetail._printedLignes[ligne.id].leaflet = _thisVilleDetail._mapComponent.displayLine(ligne);
            }
        }
        //console.debug(idLigne + " chargement terminé");
    }
     
    /*
    le this. est undefined, car la function est appellé par httpRequest. Il est donc passé en paramètre
    */
    httpInfoAgence(_thisVilleDetail : any, _data : any) {
        
        //recuperation du nom du réseau
        _thisVilleDetail._selectedVille.agency = _data.agency.name;
        
         //Initialisation de la map
        _thisVilleDetail._mapComponent.initMap(_data.agency.location.lat, _data.agency.location.lng);   
        
        /*
            trie des lignes entre urbaines ou pas
        */
        for (var ligne of _thisVilleDetail._lignes)
        {   

            if (ligne.category == true)
                _thisVilleDetail._lignesUrbaines.push(ligne);
            else
                _thisVilleDetail._lignesNonUrbaines.push(ligne);
        }

        _thisVilleDetail._loadingRoutes = false;
    }

/*
==============================================================================
                            Indicateurs
==============================================================================
*/
    /*
        Appellé lorsqu'on clique sur un arrêt pour la lignes
    */
    onChoseArretOfLine(arret: Arret) {
        if (this._selectedLigne == null)
            return;
        this._selectedArret = arret;
        
        if (!this._selectedArret.population_200m)
            this.getIndicateurArret(arret);
    }

     
    /*
        Appellé lorsqu'on clique sur un arrêt de la map
    */
    onClickedArret(arret: Arret) {
        this._selectedArret = arret;

        if (!this._selectedArret.population_200m)
            this.getIndicateurArret(arret);
        
        //On vérifie que la ligne séléctionner appartient à l'arrêt
        if (this._selectedLigne == null)
            return;

        for (var arr of this._selectedLigne.stops) {
            if (arr == arret) {
                return;
            }
        }
        
        this._selectedLigne = null;
    }

    /*
        Appellé lorsqu'on clique sur un arrêt de la map
    */
    onClickedLigne(ligne: Ligne) {
        this._selectedLigne = ligne;

        //On vérifie que l'arrêt séléctionner appartient à la ligne 
        if (this._selectedArret == null)
            return;

        for (var arr of ligne.stops) {
            if (arr == this._selectedArret) {
                return;
            }
        }
     
        this._selectedArret = null;
    }
    

    getIndicateurArret( arr : Arret){
        var requete : string = 'http://localhost:5000/agencies/'+ this._selectedVille.id +'/stops/'+this._selectedArret.id;        
        this._httpRequest.get(requete, this.httpGetArret);
    }

/*
==============================================================================
                            Checkbox
==============================================================================
*/

    selectTous() {
        this._lignesAllChecked = !this._lignesAllChecked;

        //Impossible de faire this._lignesUrbainesChecked = this._lignesAllChecked, car il créer une référence sur la valeur
        if (this._lignesAllChecked) {
            this._lignesUrbainesChecked = true;
            this._lignesNonUrbainesChecked = true;
        }    
        else {
            this._lignesUrbainesChecked = false;
            this._lignesNonUrbainesChecked = false;
        }

        for (var ligne of this._lignes)
        { 
            ligne.isChecked = this._lignesAllChecked;
        }
        
        this.afficherLignes();
    }

    selectUrbain() {
        console.debug("selectUrbain");
        this._lignesUrbainesChecked = !this._lignesUrbainesChecked;
        for (var ligne of this._lignesUrbaines)
        {
            //Impossible de faire this._lignesUrbainesChecked, car il créer une référence sur la valeur
            if (this._lignesUrbainesChecked)
                ligne.isChecked = true;
            else
                ligne.isChecked = false;
        }
        
        this.afficherLignes();
    }

    selectNonUrbain() {
        console.debug("selectNonUrbain");
        this._lignesNonUrbainesChecked = !this._lignesNonUrbainesChecked;
        for (var ligne of this._lignesNonUrbaines) {
            //Impossible de faire this._lignesUrbainesChecked, car il créer une référence sur la valeur
            if (this._lignesNonUrbainesChecked)
                ligne.isChecked = true;
            else
                ligne.isChecked = false;
        }
        
        this.afficherLignes();
    }

    selectLigne(ligne: Ligne) {
        console.debug("selectLigne");
        ligne.isChecked = !ligne.isChecked;

        if (!ligne.isChecked && ligne.category && this._lignesUrbainesChecked)
            this._lignesUrbainesChecked = false;

        if (!ligne.isChecked && !ligne.category && this._lignesNonUrbainesChecked)
            this._lignesNonUrbainesChecked = false;
        
        this.afficherLignes();
    }

    //Parcours toutes les lignes et envoit la requêtes pour les affiché
    afficherLignes() {

        for (var ligne of this._lignes) {
            if(ligne.isChecked)
            {
                //La ligne n'as jamais été affiché
                if (this._printedLignes[ligne.id] === undefined) 
                {
                     console.debug(ligne.name + " est selectionné  mais undifined")
                    //L'affichage sera fait par le callback de la requête
                    this._httpRequest.get('http://localhost:5000/agencies/'+ this._selectedVille.id +'/routes/'+ligne.id , this.httpLigneDetails);
                }
                // la ligne à été afficher mais elle n'est pas afficher actuellement
                else if (!this._printedLignes[ligne.id].isPrinted) 
                {
                    console.debug(ligne.name + " est selectionné devrait etre affiché mais l'est pas")
                    this._printedLignes[ligne.id].isPrinted = true;
                    this._mapComponent.showPolyligne(this._printedLignes[ligne.id].leaflet);
                }
            }
            else {
               
                if (this._printedLignes[ligne.id] !== undefined && this._printedLignes[ligne.id].isPrinted) 
                {
                    this._printedLignes[ligne.id].isPrinted = false;
                    this._mapComponent.hidePolyligne(this._printedLignes[ligne.id].leaflet);
                }
            }
        
        }
    }
     
     toAccueil(){
        let link = ['Home'];
        this._router.navigate(link);
     }
     
}

function randomColor ( ){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var _i = 0; _i < 6; _i++ ) 
    {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;    
}
