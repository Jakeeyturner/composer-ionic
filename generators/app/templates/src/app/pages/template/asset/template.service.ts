import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';

import 'rxjs/add/operator/map';

@Injectable()
export class <%= assetName %>Service {

	<% if(apiNamespace == 'always'){ %>
		namespace: string = '<%= namespace %>.<%= assetName %>';
	<% }else{ %>
		namespace: string = '<%= assetName %>';
	<% } %>

	constructor(private dataService: DataService){}



	getAll(): any{
		return this.dataService.getAll(this.namespace);
	}

	get(assetIdentifier): any{
		return this.dataService.get(this.namespace, assetIdentifier);
	}

	delete(assetIdentifier): any{
		return this.dataService.delete(this.namespace, assetIdentifier);
	}

	add(asset): any{
		return this.dataService.add(this.namespace, asset);
	}

	update(assetId,asset): any{
		return this.dataService.update(this.namespace, assetId, asset);
	}
}
