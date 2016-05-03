import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';

/*
this._httpRequest.get('http://localhost:5000/', this.doResult);

doResult(res: any)
{
    console.debug(res);
}

*/
export class HttpRequest {
	private _data: any;
  	private _http: any;

	constructor(http: Http) {
		this._http = http;
		this._data = null;
	}

	get(url: string, doSuccess) {
		return this._http.get(url)
       		.map(res => res.json())
            .subscribe(
                //En cas de succès
				data => doSuccess(data),
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