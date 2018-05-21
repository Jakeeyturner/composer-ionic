import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';

import 'rxjs/add/operator/map';

@Injectable()
export class <%= participantName %>Service {

	<% if(apiNamespace == 'always'){ %>
		namespace: string = '<%= namespace %>.<%= participantName %>';
	<% }else{ %>
		namespace: string = '<%= participantName %>';
	<% } %>

	constructor(private dataService: DataService){}



	getAll(): any{
		return this.dataService.getAll(this.namespace);
	}

	get(participantIdentifier): any{
		return this.dataService.get(this.namespace, participantIdentifier);
	}

	delete(participantIdentifier): any{
		return this.dataService.delete(this.namespace, participantIdentifier);
	}

	add(participant): any{
		return this.dataService.add(this.namespace, participant);
	}

	update(participantId,participant): any{
		return this.dataService.update(this.namespace, participantId, participant);
	}
}
