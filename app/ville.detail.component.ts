import {Component, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';
import 'rxjs/Rx';

import {MapComponent} from './map.component';

import {Ville} from './classes/ville';
import {Ligne} from './classes/ligne';
import {Arret} from './classes/arret';
import {AffichageLigne} from './classes/affichageLigne';

import {HttpRequest} from './classes/httpRequest';
import {PipeFilterLigne} from './classes/pipeFilterLigne';
import {PipeFilterArret} from './classes/pipeFilterArret';

declare var $: any;

@Component({
    selector: 'my-ville-detail',
    templateUrl: 'app/html/detail.html',
    styleUrls: ['app/css/detail.css'],
    directives: [MapComponent],
    pipes: [PipeFilterLigne, PipeFilterArret]
})

export class VilleDetailComponent {
    @Output()
    displayLine = new EventEmitter<Ligne>();

    private _selectedVille:Ville;
    private _selectedArret:Arret;
    private _selectedLigne:Ligne;

    private _lignes:Ligne[];
    private _printedLignes:Object;

    private _lignesUrbaines:Ligne[];
    private _lignesNonUrbaines:Ligne[];

    private _lignesAllChecked:boolean;
    private _lignesUrbainesChecked:boolean;
    private _lignesNonUrbainesChecked:boolean;
    private _searchInputLigne:string;
    private _searchInputArret:string;

    private _loadingAgence:boolean;
    private _loadingRoutes:boolean;

    private _httpRequest:HttpRequest;
    private _mapComponent:MapComponent;

    private _sTimeout:number;
    private _boolTimeOut:boolean;

    constructor(private _router:Router, routeParams:RouteParams, http:Http) {
        this._selectedVille = new Ville();

        //Le + permet de convertir en Number
        this._selectedVille.id = +routeParams.get('id');

        this._lignesUrbaines = [];
        this._lignesNonUrbaines = [];

        this._mapComponent = new MapComponent();
        this._mapComponent.onClickedLigne.subscribe(item => this.onClickedLigne(item));
        this._mapComponent.onClickedArret.subscribe(item => this.onClickedArret(item));

        this._loadingAgence = true;
        this._loadingRoutes = true;

        this._httpRequest = new HttpRequest(this, http);
        this._httpRequest.get('http://localhost:5000/agencies/' + this._selectedVille.id + '/routes', this.httpLignesAgences);
        this._httpRequest.get('http://localhost:5000/agencies/' + this._selectedVille.id, this.httpInfoAgence);

        this._sTimeout = setTimeout(() => this.timeOutServer(), 15000);
        this._boolTimeOut = false;

        this._lignesUrbainesChecked = false;
        this._lignesNonUrbainesChecked = false;
        this._lignesAllChecked = false;
        this._searchInputLigne = "";
        this._searchInputArret = "";

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

    //Récupère les informations d'un arrêt
    httpGetArret(_thisVilleDetail:any, _data:any) {
        _thisVilleDetail._selectedArret.routes = _data.stop.routes;
        _thisVilleDetail._selectedArret.population_200m = _data.stop.population_200m;

        //Si on à séléctionner une ligne précedemment
        if (_thisVilleDetail._selectedLigne != null) {
            //Et si cette ligne fait partie des ligne du dis arrêt
            for (var route of _thisVilleDetail._selectedArret.routes) {
                if (_thisVilleDetail._selectedLigne.id == route.id) {
                    //Alors on complet les informations de l'arrêt
                    _thisVilleDetail._selectedArret.vitesse_Arret_ligne = Math.round(route.average_speed * 100) / 100;
                    _thisVilleDetail._selectedArret.passageW_Arret_ligne = route.passages.passagesWeek;
                    _thisVilleDetail._selectedArret.passageWE_Arret_ligne = route.passages.passagesWE;
                }
            }
        }
    }

    //récupère toutes les lignes d'une agence
    httpLignesAgences(_thisVilleDetail:any, _data:any) {
        //recuperation des lignes
        _thisVilleDetail._lignes = _data.routes;
        for (var ligne of _thisVilleDetail._lignes) {
            //On y recalcule l'interdistance et le ratio
            ligne.interdistance = round(Math.floor(ligne.interdistance), 2);
            ligne.ratio = (ligne.ratio != null ) ? round(ligne.ratio * 100, 2) / 100 : 999;

            console.debug(ligne.interdistance, ligne.ratio);

            ligne.category = ((ligne.ratio < 2.5) && (ligne.interdistance < 500));

            //Puis on met la ligne dans le bon tableau
            if (ligne.category == true)
                _thisVilleDetail._lignesUrbaines.push(ligne);
            else
                _thisVilleDetail._lignesNonUrbaines.push(ligne);
        }

        _thisVilleDetail._loadingAgence = false;
    }

    //Récupère des informations plus complète de la ligne
    httpLigneDetails(_thisVilleDetail:any, data:any, param:any) {
        var idLigne = data.route.id;

        //On parcours toutes les lignes pour recherche  celle dont on vient de récupérer les informations
        for (var ligne of _thisVilleDetail._lignes) {
            if (ligne.id == idLigne) {
                ligne.getted = true;
                ligne = data.route;
                ligne.average_speed = Math.round(data.route.average_speed * 100) / 100;

                //Affichage la ligne
                if (param.print && _thisVilleDetail._printedLignes[ligne.id] === undefined) {
                    ligne.color = randomColor();

                    //noinspection TypeScriptUnresolvedFunction
                    $("#loader_"+ligne.id).addClass("hide");
                    //noinspection TypeScriptUnresolvedFunction
                    $("#checkbox_"+ligne.id).removeClass("hide");
                    //noinspection TypeScriptUnresolvedFunction
                    $("#ligne_"+ligne.id).css('color', ligne.color);

                    _thisVilleDetail._printedLignes[ligne.id] = new AffichageLigne();
                    _thisVilleDetail._printedLignes[ligne.id].isPrinted = true;
                    _thisVilleDetail._printedLignes[ligne.id].leaflet = _thisVilleDetail._mapComponent.displayLine(ligne);
                }

                return;
            }
        }
    }

    /*
     le this. est undefined, car la function est appellé par httpRequest. Il est donc passé en paramètre
     */
    httpInfoAgence(_thisVilleDetail:any, _data:any) {
        //recuperation du nom du réseau
        _thisVilleDetail._selectedVille.agency = _data.agency.name;

        //Initialisation de la map
        _thisVilleDetail._mapComponent.initMap(_data.agency.location.lat, _data.agency.location.lng);

        _thisVilleDetail._loadingRoutes = false;
    }

    getArret(arr:Arret) {
        //On test avant de faire la requête si les informations n'ont pas été déjà récupérées
        if (!arr.getted) {
            var requete:string = 'http://localhost:5000/agencies/' + this._selectedVille.id + '/stops/' + this._selectedArret.id;
            this._httpRequest.get(requete, this.httpGetArret);
        }
    }

    getLine(ligne:Ligne, print:boolean) {
        //On test avant de faire la requête si les informations n'ont pas été déjà récupérées
        if (!ligne.getted) {
            ligne.getted = true;
            this._httpRequest.get('http://localhost:5000/agencies/' + this._selectedVille.id + '/routes/' + ligne.id,
                this.httpLigneDetails, {'print': print});
        }
    }

    /*
     ==============================================================================
     Indicateurs
     ==============================================================================
     */
    /*
     Appellé lorsqu'on clique sur un arrêt pour une ligne déjà séléctionnée
     */
    onChoseArretOfLine(arret:Arret) {
        if (this._selectedLigne == null)
            return;

        this._selectedArret = arret;
        this.getArret(arret);
    }

    /*
     Appelé lorsqu'on on a clique sur une ligne pour un arrêt déjà séléctionnée
     */
    onChoseLineofArret(ligne:any) {
        this._selectedLigne = ligne;

        this.getLine(this._selectedLigne, false);

        if (this._selectedArret == null)
            return;
    }

    /*
     Appellé lorsqu'on clique sur un arrêt de la map
     */
    onClickedArret(arret:Arret) {
        this._selectedArret = arret;

        this.getArret(arret);

        if (this._selectedLigne !== null && this._selectedLigne !== undefined) {
            //On vérifie que la ligne séléctionner appartient à l'arrêt
            for (var arr of this._selectedLigne.stops) {
                if (arr == arret) {
                    return;
                }
            }

            this._selectedLigne = null;
        }
    }

    /*
     Appellé lorsqu'on clique sur une ligne de la map
     */
    onClickedLigne(ligne:Ligne) {
        this._selectedLigne = ligne;

        //On vérifie que l'arrêt séléctionner appartient à la ligne 
        if (this._selectedArret !== null && this._selectedArret !== undefined) {
            for (var arr of ligne.stops) {
                if (arr == this._selectedArret) {
                    return;
                }
            }

            this._selectedArret = null;
        }
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

        for (var ligne of this._lignes) {
            ligne.isChecked = this._lignesAllChecked;
        }

        this.afficherLignes();
    }

    selectUrbain() {
        this._lignesUrbainesChecked = !this._lignesUrbainesChecked;
        for (var ligne of this._lignesUrbaines) {
            //Impossible de faire this._lignesUrbainesChecked, car il créer une référence sur la valeur
            ligne.isChecked = this._lignesUrbainesChecked;
        }

        this.afficherLignes();
    }

    selectNonUrbain() {
        this._lignesNonUrbainesChecked = !this._lignesNonUrbainesChecked;
        for (var ligne of this._lignesNonUrbaines) {
            //Impossible de faire this._lignesUrbainesChecked, car il créer une référence sur la valeur
            ligne.isChecked = this._lignesNonUrbainesChecked;
        }

        this.afficherLignes();
    }

    selectLigne(ligne:Ligne) {
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
            if (ligne.isChecked) {
                //La ligne n'as jamais été affiché
                if (this._printedLignes[ligne.id] === undefined) {
                    //L'affichage sera fait par le callback de la requête

                    //noinspection TypeScriptUnresolvedFunction
                    $("#loader_"+ligne.id).removeClass("hide");
                    //noinspection TypeScriptUnresolvedFunction
                    $("#checkbox_"+ligne.id).addClass("hide");
                    this.getLine(ligne, true);
                }
                // la ligne à été afficher mais elle n'est pas afficher actuellement
                else if (!this._printedLignes[ligne.id].isPrinted) {
                    this._printedLignes[ligne.id].isPrinted = true;
                    this._mapComponent.showPolyligne(this._printedLignes[ligne.id].leaflet);
                }
            }
            else {
                //Si elle est actuellement affiché mais n'est plus coché, alors on la masque
                if (this._printedLignes[ligne.id] !== undefined && this._printedLignes[ligne.id].isPrinted) {
                    this._printedLignes[ligne.id].isPrinted = false;
                    this._mapComponent.hidePolyligne(this._printedLignes[ligne.id].leaflet);
                }
            }

        }
    }

    toAccueil() {
        let link = ['Home'];
        this._router.navigate(link);
    }

}

function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var _i = 0; _i < 6; _i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
