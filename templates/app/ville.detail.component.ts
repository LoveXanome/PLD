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

@Component({
    selector: 'my-ville-detail',
    templateUrl: 'app/html/detail.html',
    styleUrls: ['app/css/detail.css'],
    directives: [MapComponent]
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

    private _httpRequest: HttpRequest;
    private _mapComponent: MapComponent;

    constructor(private _router: Router, routeParams: RouteParams, http: Http) {
        this._selectedVille = new Ville();
        
        //Le + permet de convertir en Number
        this._selectedVille.id = +routeParams.get('id');
    
        this._lignesUrbaines = [];
        this._lignesNonUrbaines = [];
        //this._lignes = [];
        this._mapComponent = new MapComponent();

        this._httpRequest = new HttpRequest(this, http);
        //this._httpRequest.get('http://localhost:5000/agencies/'+ this._selectedVille.id +'/routes' , this.httpLignesAgences);
        //this._httpRequest.get('http://localhost:5000/agencies/'+ this._selectedVille.id, this.httpInfoAgence);
                
        this._lignesUrbainesChecked = false;
        this._lignesNonUrbainesChecked = false;
        this._lignesAllChecked = false;

        this._printedLignes = {};
    }

    ngOnInit() {
       /**/
        this._lignes = LIGNES;
        this._lignes[0].points = STOPS_C1;
        this._lignes[1].points = STOPS_C2;
        this._lignes[2].points = STOPS_C3;
        this._lignes[3].points = STOPS_C4;

        for (var ligne of this._lignes)
        {
            if (ligne.category)
                this._lignesUrbaines.push(ligne);
            else
                this._lignesNonUrbaines.push(ligne);
            
        }


        //TODO à supprimer
        this._mapComponent.initMap(48.68439, 6.18496);

    }

/*
==============================================================================
                            RESULTATS HTTP
==============================================================================
*/
    httpLignesAgences(_this : any, _data : any){
        
        //recuperation des lignes
        _this._lignes = _data.routes;
       
    }

     
    httpLigneDetails(_this : any, data: any){
        //console.debug(data);
        var idLigne = data.route.id;
        //console.debug(idLigne);
        for (var ligne of _this._lignes)
        {
            if(ligne.id==idLigne)
            {   
                ligne.points = data.route.points;
                //console.debug(ligne.points);
                ligne.color = randomColor();
                
                _this._printedLignes[ligne.id] = new AffichageLigne();
                _this._printedLignes[ligne.id].isPrinted = true;
                _this._printedLignes[ligne.id].polyligne = _this._mapComponent.displayLine(ligne);
            }
        }
        console.debug(idLigne + " chargement terminé");
    }
     

    /*
    le this. est undefined, car la function est appellé par httpRequest. Il est donc passé en paramètre
    */
    httpInfoAgence(_this : any, _data : any) {
        
        //recuperation du nom du réseau
        _this._selectedVille.agency = _data.name;
        
        //console.debug(_data.agency.location.lat + " "+ _data.agency.location.lng);
        
         //Initialisation de la map
        _this._mapComponent.initMap(_data.agency.location.lat, _data.agency.location.lng);   
        
        /*
            trie des lignes entre urbaines ou pas
        */
        
       // console.debug(_this._lignes );
        for (var ligne of _this._lignes)
        {   
            _this._httpRequest.get('http://localhost:5000/agencies/'+ _this._selectedVille.id +'/routes/'+ligne.id , _this.httpLigneDetails);

            if (ligne.category == true)
                _this._lignesUrbaines.push(ligne);
            else
                _this._lignesNonUrbaines.push(ligne);
        }
    }

    /*
        Appellé lorsqu'on clique sur un arrêt pour la lignes
    */
    onChoseArretOfLine(arret: Arret) {
        if (this._selectedLigne == null)
            return;
        this._selectedArret = arret;
    }

    /*
        Appellé lorsqu'on clique sur un arrêt de la map
    */
    onClickedArret(arret: Arret) {
        this._selectedArret = arret;
        //console.debug(arret);

        //On vérifie que la ligne séléctionner appartient à l'arrêt
        if (this._selectedLigne == null)
            return;

        for (var arr of this._selectedLigne.points) {
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

        for (var arr of ligne.points) {
            if (arr == this._selectedArret) {
                return;
            }
        }
     
        this._selectedArret = null;
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
    }

    selectLigne(ligne: Ligne) {
        console.debug("selectLigne");
        ligne.isChecked = !ligne.isChecked;

        if (!ligne.isChecked && ligne.category && this._lignesUrbainesChecked)
            this._lignesUrbainesChecked = false;

        if (!ligne.isChecked && !ligne.category && this._lignesNonUrbainesChecked)
            this._lignesNonUrbainesChecked = false;
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
                    //this._httpRequest.get('http://localhost:5000/agencies/1/routes/102', this.httpLigneDetails);

                    //TODO à supprimer
                    this._printedLignes[ligne.id] = new AffichageLigne();
                    this._printedLignes[ligne.id].isPrinted = true;
                    this._printedLignes[ligne.id].polyligne = this._mapComponent.displayLine(ligne);
                }
                // la ligne à été afficher mais elle n'est pas afficher actuellement
                else if (!this._printedLignes[ligne.id].isPrinted) 
                {
                    console.debug(ligne.name + " est selectionné devrait etre affiché mais l'est pas")
                    this._printedLignes[ligne.id].isPrinted = true;
                    this._mapComponent.showPolyligne(this._printedLignes[ligne.id].polyligne);
                } 
            }
            else {
               
                if (this._printedLignes[ligne.id] !== undefined && this._printedLignes[ligne.id].isPrinted) 
                {
                    this._printedLignes[ligne.id].isPrinted = false;
                    this._mapComponent.hidePolyligne(this._printedLignes[ligne.id].polyligne);
                }
            }

            //TODO à supprimer
            //this._mapComponent.displayLine(ligne);
        
        }
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

var LIGNES: Ligne[] = [
    { "id": 11, "name": "C1", "category": true, "points": STOPS_C1, "color": randomColor(), 'isChecked': false},
    { "id": 12, "name": "C2", "category": false, "points": STOPS_C2, "color": randomColor(), 'isChecked': false},
    { "id": 13, "name": "C3", "category": true, "points": STOPS_C3, "color": randomColor(), 'isChecked': false},
    { "id": 14, "name": "C4", "category": true, "points": STOPS_C4, "color": randomColor(), 'isChecked': false}
];


var STOPS_C1: Arret[] = [
    { "id": 11, "name": "Gare Part-Dieu", "location": { "lng": 45.544, "lat": -0.1}, "is_stop": true },
    {  "id": 12, "name": "Brotteaux","location":{ "lng": 45.544 , "lat":-0.2}, "is_stop": true },
    {  "id": 13, "name": "Vitton", "location":{"lng": 4.455 , "lat":-0.3}, "is_stop": true } 
];

var STOPS_C2: Arret[] = [
    { "id": 21, "name": "Gare Part-Dieu", "location":{"lng": 40.547, "lat": -0.4}, "is_stop": true },
    { "id": 22, "name": "Brotteaux", "location":{"lng": 45.544, "lat": -0.5}, "is_stop": true },
    { "id": 23, "name": "Charpenne", "location":{"lng": 4.455, "lat": -0.6}, "is_stop": true }
];

var STOPS_C3: Arret[] = [
    { "id": 21, "name": "Gare Part-Dieu",  "location":{"lng":40.547 , "lat":-0.7}, "is_stop": true }, 
    {  "id": 22, "name": "Brotteaux", "location":{"lng": 45.544 , "lat":-0.8}, "is_stop": true },
    {  "id": 23, "name": "Charpenne", "location":{"lng": 4.455 , "lat":-0.9}, "is_stop": true } 
];

var STOPS_C4: Arret[] = [
    { "id": 21, "name": "Gare Part-Dieu",  "location":{"lng":40.547 , "lat":-0.10}, "is_stop": true }, 
    {  "id": 22, "name": "Brotteaux", "location":{"lng": 45.544 , "lat":-0.11}, "is_stop": true },
    {  "id": 23, "name": "Charpenne", "location":{"lng": 4.455 , "lat":-0.12}, "is_stop": true } 
];