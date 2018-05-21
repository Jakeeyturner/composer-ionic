import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { <%=participantName%>Service } from './<%=participantName%>.service';
import { DataService } from '../../../services/data.service';

class DataServiceMock{
	getAll(){
		return;
	}
	delete(id){
		return;
	}
	get(id){
		return;
	}
	add(){
		return;
	}
	update(id,participant){
		return;
	}
}

describe('<%=participantName%>Service', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				<%=participantName%>Service,
				{ provide: DataService, useClass:DataServiceMock }
			]
		});
	});

	it('should set namespace',fakeAsync(inject([<%=participantName%>Service], (service: <%=participantName%>Service) => {
		expect(service.namespace).toContain('<%= participantName %>');
	})));

	it('should get all <%=participantName%> participants',fakeAsync(inject([<%=participantName%>Service], (service: <%=participantName%>Service) => {
		let spy = spyOn(DataServiceMock.prototype,'getAll');

		service.getAll();
		tick();
		expect(spy.calls.argsFor(0)).toContain('<%=participantName%>');
	})));

	it('should delete <%=participantName%> participant',fakeAsync(inject([<%=participantName%>Service], (service: <%=participantName%>Service) => {
			let identifier = "<%=participantName%>123";
			let spy = spyOn(DataServiceMock.prototype,'delete');

			service.delete(identifier);
			tick();
			expect(spy.calls.argsFor(0)).toContain('<%=participantName%>');
			expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should get <%=participantName%> participant',fakeAsync(inject([<%=participantName%>Service], (service: <%=participantName%>Service) => {
		let identifier = "<%=participantName%>123";
		let spy = spyOn(DataServiceMock.prototype,'get');

		service.get(identifier);
		tick();
		expect(spy.calls.argsFor(0)).toContain('<%=participantName%>');
		expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should add <%=participantName%> participant',fakeAsync(inject([<%=participantName%>Service], (service: <%=participantName%>Service) => {
		let spy = spyOn(DataServiceMock.prototype,'add');

		service.add({'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('<%=participantName%>');
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});
	})));

	it('should update <%=participantName%> participant',fakeAsync(inject([<%=participantName%>Service], (service: <%=participantName%>Service) => {
		let identifier = "<%=participantName%>123";

		let spy = spyOn(DataServiceMock.prototype,'update');

		service.update(identifier,{'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('<%=participantName%>');
		expect(spy.calls.argsFor(0)).toContain(identifier);
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});

	})));

});
