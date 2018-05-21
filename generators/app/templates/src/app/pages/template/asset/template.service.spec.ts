import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { <%=assetName%>Service } from './<%=assetName%>.service';
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
	update(id,asset){
		return;
	}
}

describe('<%=assetName%>Service', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				<%=assetName%>Service,
				{ provide: DataService, useClass:DataServiceMock }
			]
		});
	});

	it('should set namespace',fakeAsync(inject([<%=assetName%>Service], (service: <%=assetName%>Service) => {
		expect(service.namespace).toContain('<%= assetName %>');
	})));

	it('should get all <%=assetName%> assets',fakeAsync(inject([<%=assetName%>Service], (service: <%=assetName%>Service) => {
		let spy = spyOn(DataServiceMock.prototype,'getAll');

		service.getAll();
		tick();
		expect(spy.calls.argsFor(0)).toContain('<%=assetName%>');
	})));

	it('should delete <%=assetName%> asset',fakeAsync(inject([<%=assetName%>Service], (service: <%=assetName%>Service) => {
			let identifier = "<%=assetName%>123";
			let spy = spyOn(DataServiceMock.prototype,'delete');

			service.delete(identifier);
			tick();
			expect(spy.calls.argsFor(0)).toContain('<%=assetName%>');
			expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should get <%=assetName%> asset',fakeAsync(inject([<%=assetName%>Service], (service: <%=assetName%>Service) => {
		let identifier = "<%=assetName%>123";
		let spy = spyOn(DataServiceMock.prototype,'get');

		service.get(identifier);
		tick();
		expect(spy.calls.argsFor(0)).toContain('<%=assetName%>');
		expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should add <%=assetName%> asset',fakeAsync(inject([<%=assetName%>Service], (service: <%=assetName%>Service) => {
		let spy = spyOn(DataServiceMock.prototype,'add');

		service.add({'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('<%=assetName%>');
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});
	})));

	it('should update <%=assetName%> asset',fakeAsync(inject([<%=assetName%>Service], (service: <%=assetName%>Service) => {
		let identifier = "<%=assetName%>123";

		let spy = spyOn(DataServiceMock.prototype,'update');

		service.update(identifier,{'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('<%=assetName%>');
		expect(spy.calls.argsFor(0)).toContain(identifier);
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});

	})));

});
