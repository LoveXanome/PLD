System.register(['angular2/core', 'angular2/router', 'angular2/http', 'rxjs/Rx', './map.component', './classes/ville', './classes/affichageLigne', './classes/httpRequest', './classes/pipeFilter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, http_1, map_component_1, ville_1, affichageLigne_1, httpRequest_1, pipeFilter_1;
    var VilleDetailComponent;
    function randomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var _i = 0; _i < 6; _i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (map_component_1_1) {
                map_component_1 = map_component_1_1;
            },
            function (ville_1_1) {
                ville_1 = ville_1_1;
            },
            function (affichageLigne_1_1) {
                affichageLigne_1 = affichageLigne_1_1;
            },
            function (httpRequest_1_1) {
                httpRequest_1 = httpRequest_1_1;
            },
            function (pipeFilter_1_1) {
                pipeFilter_1 = pipeFilter_1_1;
            }],
        execute: function() {
            VilleDetailComponent = (function () {
                function VilleDetailComponent(_router, routeParams, http) {
                    var _this = this;
                    this._router = _router;
                    this.displayLine = new core_1.EventEmitter();
                    this._selectedVille = new ville_1.Ville();
                    //Le + permet de convertir en Number
                    this._selectedVille.id = +routeParams.get('id');
                    this._lignesUrbaines = [];
                    this._lignesNonUrbaines = [];
                    //this._lignes = [];
                    this._mapComponent = new map_component_1.MapComponent();
                    this._mapComponent.onClickedLigne.subscribe(function (item) { return _this.onClickedLigne(item); });
                    this._mapComponent.onClickedArret.subscribe(function (item) { return _this.onClickedArret(item); });
                    this._loadingAgence = true;
                    this._loadingRoutes = true;
                    this._httpRequest = new httpRequest_1.HttpRequest(this, http);
                    this._httpRequest.get('http://localhost:5000/agencies/' + this._selectedVille.id + '/routes', this.httpLignesAgences);
                    this._httpRequest.get('http://localhost:5000/agencies/' + this._selectedVille.id, this.httpInfoAgence);
                    this._sTimeout = setTimeout(function () { return _this.timeOutServer(); }, 15000);
                    this._boolTimeOut = false;
                    this._lignesUrbainesChecked = false;
                    this._lignesNonUrbainesChecked = false;
                    this._lignesAllChecked = false;
                    this._searchInput = "";
                    this._printedLignes = {};
                }
                VilleDetailComponent.prototype.ngOnInit = function () {
                };
                VilleDetailComponent.prototype.timeOutServer = function () {
                    this._boolTimeOut = true;
                };
                /*
                ==============================================================================
                                            RESULTATS HTTP
                ==============================================================================
                */
                VilleDetailComponent.prototype.httpGetArret = function (_thisVilleDetail, _data) {
                    _thisVilleDetail._selectedArret.routes = _data.stop.routes;
                    _thisVilleDetail._selectedArret.population_200m = _data.stop.population_200m;
                    console.debug(_thisVilleDetail._selectedArret);
                    console.debug(_thisVilleDetail._selectedArret.population_200m);
                    for (var _a = 0, _b = _thisVilleDetail._selectedArret.routes; _a < _b.length; _a++) {
                        var route = _b[_a];
                        if (_thisVilleDetail._selectedLigne.id == route.id) {
                            _thisVilleDetail._selectedArret.vitesse_Arret_ligne = Math.round(route.average_speed * 100) / 100;
                            _thisVilleDetail._selectedArret.passageW_Arret_ligne = route.passages.passagesWeek;
                            _thisVilleDetail._selectedArret.passageWE_Arret_ligne = route.passages.passagesWE;
                        }
                    }
                };
                VilleDetailComponent.prototype.httpGetPassage = function (_thisVilleDetail, _data) {
                    _thisVilleDetail._selectedArret.passagesSemaine = _data.passages.passagesSemaine;
                    _thisVilleDetail._selectedArret.passagesWE = _data.passages.passagesWE;
                };
                VilleDetailComponent.prototype.httpLignesAgences = function (_thisVilleDetail, _data) {
                    //recuperation des lignes
                    _thisVilleDetail._lignes = _data.routes;
                    for (var _a = 0, _b = _thisVilleDetail._lignes; _a < _b.length; _a++) {
                        var ligne = _b[_a];
                        ligne.interdistance = Math.floor(ligne.interdistance);
                        if (ligne.ratio != null)
                            ligne.ratio = Math.round(ligne.ratio * 100) / 100;
                    }
                    _thisVilleDetail._loadingAgence = false;
                };
                VilleDetailComponent.prototype.httpLigneDetails = function (_thisVilleDetail, data) {
                    //console.debug(data);
                    var idLigne = data.route.id;
                    //console.debug(idLigne);
                    for (var _a = 0, _b = _thisVilleDetail._lignes; _a < _b.length; _a++) {
                        var ligne = _b[_a];
                        if (ligne.id == idLigne) {
                            ligne = data.route;
                            ligne.interdistance = Math.round(data.route.interdistance * 100) / 100;
                            ligne.ratio = Math.round(data.route.ratio * 100) / 100;
                            ligne.average_speed = Math.round(data.route.average_speed * 100) / 100;
                            ligne.color = randomColor();
                            _thisVilleDetail._printedLignes[ligne.id] = new affichageLigne_1.AffichageLigne();
                            _thisVilleDetail._printedLignes[ligne.id].isPrinted = true;
                            _thisVilleDetail._printedLignes[ligne.id].leaflet = _thisVilleDetail._mapComponent.displayLine(ligne);
                        }
                    }
                    //console.debug(idLigne + " chargement terminé");
                };
                /*
                le this. est undefined, car la function est appellé par httpRequest. Il est donc passé en paramètre
                */
                VilleDetailComponent.prototype.httpInfoAgence = function (_thisVilleDetail, _data) {
                    //recuperation du nom du réseau
                    _thisVilleDetail._selectedVille.agency = _data.agency.name;
                    //Initialisation de la map
                    _thisVilleDetail._mapComponent.initMap(_data.agency.location.lat, _data.agency.location.lng);
                    /*
                        trie des lignes entre urbaines ou pas
                    */
                    for (var _a = 0, _b = _thisVilleDetail._lignes; _a < _b.length; _a++) {
                        var ligne = _b[_a];
                        if (ligne.category == true)
                            _thisVilleDetail._lignesUrbaines.push(ligne);
                        else
                            _thisVilleDetail._lignesNonUrbaines.push(ligne);
                    }
                    _thisVilleDetail._loadingRoutes = false;
                };
                /*
                ==============================================================================
                                            Indicateurs
                ==============================================================================
                */
                /*
                    Appellé lorsqu'on clique sur un arrêt pour la lignes
                */
                VilleDetailComponent.prototype.onChoseArretOfLine = function (arret) {
                    if (this._selectedLigne == null)
                        return;
                    this._selectedArret = arret;
                    if (!this._selectedArret.population_200m)
                        this.getIndicateurArret(arret);
                };
                /*
                    Appellé lorsqu'on clique sur un arrêt de la map
                */
                VilleDetailComponent.prototype.onClickedArret = function (arret) {
                    this._selectedArret = arret;
                    if (!this._selectedArret.population_200m)
                        this.getIndicateurArret(arret);
                    //On vérifie que la ligne séléctionner appartient à l'arrêt
                    if (this._selectedLigne == null)
                        return;
                    for (var _a = 0, _b = this._selectedLigne.stops; _a < _b.length; _a++) {
                        var arr = _b[_a];
                        if (arr == arret) {
                            return;
                        }
                    }
                    this._selectedLigne = null;
                };
                /*
                    Appellé lorsqu'on clique sur un arrêt de la map
                */
                VilleDetailComponent.prototype.onClickedLigne = function (ligne) {
                    this._selectedLigne = ligne;
                    //On vérifie que l'arrêt séléctionner appartient à la ligne 
                    if (this._selectedArret == null)
                        return;
                    for (var _a = 0, _b = ligne.stops; _a < _b.length; _a++) {
                        var arr = _b[_a];
                        if (arr == this._selectedArret) {
                            return;
                        }
                    }
                    this._selectedArret = null;
                };
                VilleDetailComponent.prototype.getIndicateurArret = function (arr) {
                    var requete = 'http://localhost:5000/agencies/' + this._selectedVille.id + '/stops/' + this._selectedArret.id;
                    this._httpRequest.get(requete, this.httpGetArret);
                };
                /*
                ==============================================================================
                                            Checkbox
                ==============================================================================
                */
                VilleDetailComponent.prototype.selectTous = function () {
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
                    for (var _a = 0, _b = this._lignes; _a < _b.length; _a++) {
                        var ligne = _b[_a];
                        ligne.isChecked = this._lignesAllChecked;
                    }
                    this.afficherLignes();
                };
                VilleDetailComponent.prototype.selectUrbain = function () {
                    console.debug("selectUrbain");
                    this._lignesUrbainesChecked = !this._lignesUrbainesChecked;
                    for (var _a = 0, _b = this._lignesUrbaines; _a < _b.length; _a++) {
                        var ligne = _b[_a];
                        //Impossible de faire this._lignesUrbainesChecked, car il créer une référence sur la valeur
                        if (this._lignesUrbainesChecked)
                            ligne.isChecked = true;
                        else
                            ligne.isChecked = false;
                    }
                    this.afficherLignes();
                };
                VilleDetailComponent.prototype.selectNonUrbain = function () {
                    console.debug("selectNonUrbain");
                    this._lignesNonUrbainesChecked = !this._lignesNonUrbainesChecked;
                    for (var _a = 0, _b = this._lignesNonUrbaines; _a < _b.length; _a++) {
                        var ligne = _b[_a];
                        //Impossible de faire this._lignesUrbainesChecked, car il créer une référence sur la valeur
                        if (this._lignesNonUrbainesChecked)
                            ligne.isChecked = true;
                        else
                            ligne.isChecked = false;
                    }
                    this.afficherLignes();
                };
                VilleDetailComponent.prototype.selectLigne = function (ligne) {
                    console.debug("selectLigne");
                    ligne.isChecked = !ligne.isChecked;
                    if (!ligne.isChecked && ligne.category && this._lignesUrbainesChecked)
                        this._lignesUrbainesChecked = false;
                    if (!ligne.isChecked && !ligne.category && this._lignesNonUrbainesChecked)
                        this._lignesNonUrbainesChecked = false;
                    this.afficherLignes();
                };
                //Parcours toutes les lignes et envoit la requêtes pour les affiché
                VilleDetailComponent.prototype.afficherLignes = function () {
                    for (var _a = 0, _b = this._lignes; _a < _b.length; _a++) {
                        var ligne = _b[_a];
                        if (ligne.isChecked) {
                            //La ligne n'as jamais été affiché
                            if (this._printedLignes[ligne.id] === undefined) {
                                console.debug(ligne.name + " est selectionné  mais undifined");
                                //L'affichage sera fait par le callback de la requête
                                this._httpRequest.get('http://localhost:5000/agencies/' + this._selectedVille.id + '/routes/' + ligne.id, this.httpLigneDetails);
                            }
                            else if (!this._printedLignes[ligne.id].isPrinted) {
                                console.debug(ligne.name + " est selectionné devrait etre affiché mais l'est pas");
                                this._printedLignes[ligne.id].isPrinted = true;
                                this._mapComponent.showPolyligne(this._printedLignes[ligne.id].leaflet);
                            }
                        }
                        else {
                            if (this._printedLignes[ligne.id] !== undefined && this._printedLignes[ligne.id].isPrinted) {
                                this._printedLignes[ligne.id].isPrinted = false;
                                this._mapComponent.hidePolyligne(this._printedLignes[ligne.id].leaflet);
                            }
                        }
                    }
                };
                VilleDetailComponent.prototype.toAccueil = function () {
                    var link = ['Home'];
                    this._router.navigate(link);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], VilleDetailComponent.prototype, "displayLine", void 0);
                VilleDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'my-ville-detail',
                        templateUrl: 'app/html/detail.html',
                        styleUrls: ['app/css/detail.css'],
                        directives: [map_component_1.MapComponent],
                        pipes: [pipeFilter_1.PipeFilter]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, http_1.Http])
                ], VilleDetailComponent);
                return VilleDetailComponent;
            }());
            exports_1("VilleDetailComponent", VilleDetailComponent);
        }
    }
});
//# sourceMappingURL=ville.detail.component.js.map