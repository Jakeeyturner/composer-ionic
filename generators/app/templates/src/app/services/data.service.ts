import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
	constructor(private storage: Storage, public http: Http){}

	getAll(namespace:string){
		return this.getApiUrl().then((apiURL) => {
			return this.http.get(apiURL + namespace).toPromise().then(this.getBody);
		});
	}

	get(namespace:string,identifier:string){
		return this.getApiUrl().then((apiURL) => {
			return this.http.get(apiURL + namespace + '/' + identifier).toPromise().then(this.getBody);
		});
	}

	delete(namespace:string,identifier:string){
		return this.getApiUrl().then((apiURL) => {
			return this.http.delete(apiURL + namespace + '/' + identifier).toPromise().then(this.getBody);
		});
	}

	add(namespace:string, assetData:any){
		return this.getApiUrl().then((apiURL) => {
			return this.http.post(apiURL + namespace, assetData).toPromise().then(this.getBody);
		});
	}

	update(namespace:string, identifier:string, assetData:any){
		return this.getApiUrl().then((apiURL) => {
			return this.http.put(apiURL + namespace + '/' + identifier, assetData).toPromise().then(this.getBody);
		});
	}

  	getBody(res: Response) {
		  return res.json();
	}

	getApiUrl(){
		return this.storage.get('apiURL');
	}
}
