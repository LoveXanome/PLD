import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';

declare var $: any;

export class HttpRequest {
	private _data: any;
  	private _http: any;
  	private _this: any;

	constructor(_this:any, http: Http) {
		this._this = _this;
		this._http = http;
		this._data = null;
	}

	get(url: string, doSuccess, param:any = null) {
		this._http.get(url)
       		.map(res => res.json())
            .subscribe(
                //En cas de succès
				data => doSuccess(this._this, data, param),
                //En cas d'erreur
                err => this.handleError(err)
                //,
                //Une fois les deux finis
                //() => this.finallyRequest
        );

	}

	private handleError(err) {
		console.debug(err);
	}
}