import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { <%=transactionName%>Service } from './<%=transactionName%>.service';
import { DataService } from '../../../services/data.service';

class DataServiceMock{
	getAll(){
		return;
	}

	get(id){
		return;
	}
	add(transaction){
		return;
	}
}

describe('<%=transactionName%>Service', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				<%=transactionName%>Service,
				{ provide: DataService, useClass:DataServiceMock }
			]
		});
	});

	it('should set namespace',fakeAsync(inject([<%=transactionName%>Service], (service: <%=transactionName%>Service) => {
		expect(service.namespace).toContain('<%= transactionName %>');
	})));

	it('should get all <%=transactionName%> transactions',fakeAsync(inject([<%=transactionName%>Service], (service: <%=transactionName%>Service) => {
		let spy = spyOn(DataServiceMock.prototype,'getAll');

		service.getAll();
		tick();
		expect(spy.calls.argsFor(0)).toContain('<%=transactionName%>');
	})));

	it('should get <%=transactionName%> transaction',fakeAsync(inject([<%=transactionName%>Service], (service: <%=transactionName%>Service) => {
		let identifier = "<%=transactionName%>123";
		let spy = spyOn(DataServiceMock.prototype,'get');

		service.get(identifier);
		tick();
		expect(spy.calls.argsFor(0)).toContain('<%=transactionName%>');
		expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should add <%=transactionName%> transaction',fakeAsync(inject([<%=transactionName%>Service], (service: <%=transactionName%>Service) => {
		let spy = spyOn(DataServiceMock.prototype,'add');

		service.add({'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('<%=transactionName%>');
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});
	})));
});
