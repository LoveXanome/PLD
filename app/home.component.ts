import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';
import 'rxjs/Rx';

import {HttpRequest} from './classes/httpRequest'
import {Ville} from './classes/ville';

declare var $:any;

@Component({
    selector: 'my-home',
    templateUrl: 'app/html/home.html',
    styleUrls: ['app/css/home.css', 'app/css/style.css']
})

export class HomeComponent {
    villes:Ville[] = [];

    private _selectedIdVille:Number;
    private _httpRequest:HttpRequest;
    private _fileStatus:string;

    public progress:Number;
    private _interval:Number;
    private _FileUploadName:string;

    constructor(private _router:Router, routeParams:RouteParams, http:Http) {
        this.progress = 0;
        this._httpRequest = new HttpRequest(this, http);
        this._httpRequest.get('http://localhost:5000/agencies', this.getResult);


    }

    ngOnInit() {
        var _this = this;
        // si on init ici la première valeur,ça ne marche pas du tout! pourquoi ? Je sais pas
        console.debug($('#form-file'));
        $('#form-file').submit(function (e) {
            $.ajax({
                url: 'http://localhost:5000/upload/gtfs',
                type: 'POST',
                data: new FormData(this),
                contentType: 'application/octet-stream',
                success: function (data, textStatus, jqXHR) {
                    if (typeof data.error === 'undefined') {
                        // Success so call function to process the form
                        _this._fileStatus = 'debut';
                        $('#text_progress').text('upload du fichier');
                        _this.progress = 10;
                        _this._interval = setInterval(function () {
                            _this._httpRequest.get('http://localhost:5000/upload/status', _this.getStatusUpload);
                        }, 2000);
                    }
                    else {
                        // Handle errors here
                        console.log('ERRORS: ' + data.error);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Handle errors here
                    console.log('ERRORS: ' + textStatus);
                    // STOP LOADING SPINNER
                }
            });
        });
    }

    onChange(id) {
        this._selectedIdVille = id;
    }

    onChangeFile(event) {
        this._FileUploadName = event.target.value
    }

    gotoDetail() {
        this._router.navigate(['VilleDetail', {id: this._selectedIdVille}]);
    }

    uploadFile() {
    }

    getStatusUpload(_this:any, data:any) {
        if (data.status.failed === true) {
            $('#text_progress').text("L'upload à échoué");
            _this.progress = 0;

            clearInterval(_this._interval);
            return;
        }
        switch (_this._fileStatus) {
            case 'debut':
                if (data.status.nb_lines !== 0) {
                    $('#text_progress').text('Calcul du caractère urbain des lignes');
                    _this.progress = 30;
                    this._fileStatus = 'uploadDone';
                }
                else {
                    break;
                }
            case 'uploadDone':
                if (data.status.nb_urban_done === data.status.nb_lines) {
                    $('#text_progress').text('Calcul population autour des arrêts');
                    _this.progress = 75;
                    this._fileStatus = 'popDone';
                }
                else {
                    _this.progress = 30 + ((data.status.nb_urban_done / data.status.nb_lines) * 45);
                    break;
                }
            case 'popDone':
                if (data.status.nb_pop_done === data.status.nb_stops) {
                    $('#text_progress').text('Upload finis');
                    _this.progress = 100;
                    this._fileStatus = 'done';
                }
                else {
                    _this.progress = 75 + ((data.status.nb_pop_done / data.status.nb_stops) * 25);
                    break;
                }
            case 'done':
                clearInterval(_this._interval);
                break;
        }
    }

    getResult(_this:any, data:any) {
        //On appelle l'initialisation des villes/réseaux
        _this.initVille(data.agencies);
    }

    initVille(VILLES:any) {
        for (var _i = 0; _i < VILLES.length; _i++) {
            //Pour chaque nouveau réseau, ou push dans la liste
            this.villes.push({"id": VILLES[_i].id, "agency": VILLES[_i].name, "location": null, "lignes": null});
        }
        //On initialise la valeur de la comboBox au premier élément de la liste
        this._selectedIdVille = this.villes[0].id;
    }
}

