import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { Http, Response, ResponseOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';

class StorageMock{
	get(value){
		return;
	}
}

class HttpMock{
	get(value){
		return;
	}
	delete(value){
		return;
	}
	post(value){
		return;
	}
	put(value){
		return;
	}
}

class MockResponse extends Response{
	constructor(options){
		super(options)
	}
	json(){
		return;
	}
}

describe('DataService', () => {
	let mockResponse = new MockResponse(new ResponseOptions({
		body: '{"hello":"world"}'
	}));
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DataService,
				{ provide: Storage, useClass: StorageMock },
				{ provide: Http, useClass: HttpMock }
			]
		});
	});

	it('should get all',fakeAsync(inject([DataService], (service: DataService) => {
		spyOn(service,'getApiUrl').and.returnValue(Promise.resolve('http://restapi/url/'));
		spyOn(HttpMock.prototype,'get').and.returnValue(Observable.of(''));
		spyOn(service,'getBody');

		service.getAll('value');
		tick();

		expect(service.getApiUrl).toHaveBeenCalled();
		expect(HttpMock.prototype.get).toHaveBeenCalledWith('http://restapi/url/value');
		expect(service.getBody).toHaveBeenCalled();
	})));

	it('should get single',fakeAsync(inject([DataService], (service: DataService) => {
		spyOn(service,'getApiUrl').and.returnValue(Promise.resolve('http://restapi/url/'));
		spyOn(HttpMock.prototype,'get').and.returnValue(Observable.of(''));
		spyOn(service,'getBody');

		service.get('value','identifier');
		tick();

		expect(service.getApiUrl).toHaveBeenCalled();
		expect(HttpMock.prototype.get).toHaveBeenCalledWith('http://restapi/url/value/identifier');
		expect(service.getBody).toHaveBeenCalled();
	})));

	it('should delete single',fakeAsync(inject([DataService], (service: DataService) => {
		spyOn(service,'getApiUrl').and.returnValue(Promise.resolve('http://restapi/url/'));
		spyOn(HttpMock.prototype,'delete').and.returnValue(Observable.of(''));
		spyOn(service,'getBody');

		service.delete('value','identifier');
		tick();

		expect(service.getApiUrl).toHaveBeenCalled();
		expect(HttpMock.prototype.delete).toHaveBeenCalledWith('http://restapi/url/value/identifier');
		expect(service.getBody).toHaveBeenCalled();
	})));


	it('should add single',fakeAsync(inject([DataService], (service: DataService) => {
		spyOn(service,'getApiUrl').and.returnValue(Promise.resolve('http://restapi/url/'));
		spyOn(HttpMock.prototype,'post').and.returnValue(Observable.of(''));
		spyOn(service,'getBody');

		service.add('value',{'asset':'data'});
		tick();

		expect(service.getApiUrl).toHaveBeenCalled();
		expect(HttpMock.prototype.post).toHaveBeenCalledWith('http://restapi/url/value',{'asset':'data'});
		expect(service.getBody).toHaveBeenCalled();
	})));


	it('should update single',fakeAsync(inject([DataService], (service: DataService) => {
		spyOn(service,'getApiUrl').and.returnValue(Promise.resolve('http://restapi/url/'));
		spyOn(HttpMock.prototype,'put').and.returnValue(Observable.of(''));
		spyOn(service,'getBody');

		service.update('value','identifier',{'asset':'data'});
		tick();

		expect(service.getApiUrl).toHaveBeenCalled();
		expect(HttpMock.prototype.put).toHaveBeenCalledWith('http://restapi/url/value/identifier',{'asset':'data'});
		expect(service.getBody).toHaveBeenCalled();
	})));

	it('should return body',fakeAsync(inject([DataService], (service: DataService) => {
		spyOn(MockResponse.prototype,'json');


		service.getBody(mockResponse);
		tick();

		expect(MockResponse.prototype.json).toHaveBeenCalled();
	})));

	it('should get REST API url from storage',fakeAsync(inject([DataService], (service: DataService) => {
		spyOn(StorageMock.prototype,'get').and.returnValue(Promise.resolve('restapiurl'));


		let promise = service.getApiUrl();
		tick();
		promise.then((value) => {
			tick();
			expect(StorageMock.prototype.get).toHaveBeenCalledWith('apiURL');
			expect(value).toEqual('restapiurl');
		});

	})));

});
