import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { Platform, Events } from 'ionic-angular';

import { PlatformService } from './platform.service';

class EventsMock{
	publish(event,value){
		return;
	}
}

class PlatformMock{
	is(value){
		return;
	}
}

describe('PlatformService', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				PlatformService,
				{ provide: Events, useClass: EventsMock },
				{ provide: Platform, useClass: PlatformMock },
			]
		});
	});

	it('should see if connected to network',fakeAsync(inject([PlatformService], (service: PlatformService) => {
		service.connection = true;
		service.isConnected();
		tick();
		expect(service.connection).toEqual(true);
	})));

	it('should set network connection to true if running in a browser', fakeAsync(inject([PlatformService], (service: PlatformService) => {
		spyOn(service,'isDevice').and.returnValue(false);
		spyOn(EventsMock.prototype,'publish');
		spyOn(service,'isConnected').and.returnValue(true);
		service.setConnection('something');
		tick();
		expect(service.connection).toEqual(true);
		expect(EventsMock.prototype.publish).toHaveBeenCalledWith('connection',true);
	})));

	it('should set connection flag if running on a device but not connected', fakeAsync(inject([PlatformService], (service: PlatformService) => {
		spyOn(service,'isDevice').and.returnValue(true);
		spyOn(EventsMock.prototype,'publish');
		spyOn(service,'isConnected').and.returnValue(false);
		service.setConnection('none');
		tick();
		expect(service.connection).toEqual(false);
		expect(EventsMock.prototype.publish).toHaveBeenCalledWith('connection',false);
	})));

	it('should set connection flag if running on a device and connected', fakeAsync(inject([PlatformService], (service: PlatformService) => {
		spyOn(service,'isDevice').and.returnValue(true);
		spyOn(EventsMock.prototype,'publish');
		spyOn(service,'isConnected').and.returnValue(true);
		service.setConnection('android');
		tick();
		expect(service.connection).toEqual(true);
		expect(EventsMock.prototype.publish).toHaveBeenCalledWith('connection',true);
	})));

	it('should detect if running in a browser', fakeAsync(inject([PlatformService], (service: PlatformService) => {
		spyOn(PlatformMock.prototype,'is').and.returnValue(true);

		let result = service.isDevice();
		tick();

		expect(result).toEqual(false);
	})));

	it('should detect if running on a device', fakeAsync(inject([PlatformService], (service: PlatformService) => {
		spyOn(PlatformMock.prototype,'is').and.returnValue(false);

		let result = service.isDevice();
		tick();

		expect(result).toEqual(true);
	})));

});
