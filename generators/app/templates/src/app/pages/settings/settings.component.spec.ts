import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { SettingsPage } from './settings.component';

class StorageMock{
	ready(){
		return Promise.resolve();
	}
	set(url){
		return;
	}
	length(){
		return;
	}
	get(val){
		return;
	}
}

class AlertControllerMock{
	create(value){
		return new AlertMock();
	}
}

class AlertMock{
	present(){
		return;
	}
}

class LoadingControllerMock{
	create(value){
		return new LoadingMock();
	}
}

class LoadingMock{
	present(){
		return;
	}
	dismiss(){
		return;
	}
}

class FormBuilderMock{
	group(obj){
		return new FormMock();
	}
}

class FormMock{

	constructor(){

	}
	get(key){
		return;
	}
	setValue(value){
		return;
	}
	_updateTreeValidity(){
		return;
	}
	_registerOnCollectionChange(){
		return;
	}
	_registerOnChange(){
		return;
	}
}

describe('SettingsPage', () => {
	let fixture;
	let component;
	let alertMock = new AlertMock();
	let loadingMock = new LoadingMock();
	let formMock = new FormMock();

  	beforeEach(() => {

    	TestBed.configureTestingModule({
			declarations: [
				SettingsPage
			],
			imports: [
				IonicModule.forRoot(SettingsPage)
			],
			providers: [
				{ provide: Storage, useClass: StorageMock },
				{ provide: FormBuilder, useClass: FormBuilderMock },
				{ provide: AlertController, useClass: AlertControllerMock },
				{ provide: LoadingController, useClass: LoadingControllerMock }
			]
    	})
  	});

  	beforeEach(() => {
    	fixture = TestBed.createComponent(SettingsPage);
    	component = fixture.componentInstance;
  	});

  	it('should create SettingsPage component', () => {
		expect(component instanceof SettingsPage).toBe(true);
  	});

	it('should have correct title',() => {
		let title = fixture.debugElement.query(By.css('ion-title'));
		expect(title.nativeElement.textContent).toContain('Settings');
	});

	it('should initialize configuration form', fakeAsync(() => {
		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');
		spyOn(component,'getConfig').and.returnValue(Promise.resolve('http://restapi/url'));

		spyOn(FormBuilderMock.prototype,'group').and.returnValue(formMock);
		// spyOn(FormMock.prototype,'get').and.returnValue(formObjectMock);

		component.ionViewWillEnter();
		tick();

		expect(LoadingControllerMock.prototype.create).toHaveBeenCalled();
		expect(LoadingMock.prototype.present).toHaveBeenCalled();
		expect(component.getConfig).toHaveBeenCalled();
		expect(component.restApiUrl).toEqual('http://restapi/url');
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
	}));

	it('should get config value', fakeAsync(() => {
		spyOn(StorageMock.prototype,'get');
		component.getConfig();
		tick();
		expect(StorageMock.prototype.get).toHaveBeenCalledWith('apiURL');
	}))

	it('should set config value', fakeAsync(() => {
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(FormMock.prototype,'get').and.returnValue({value:'http://restapi/url'})
		spyOn(StorageMock.prototype,'set').and.returnValue(Promise.resolve());
		spyOn(AlertMock.prototype,'present');

		component.setConfig();
		tick();

		expect(AlertControllerMock.prototype.create).toHaveBeenCalledWith({
			title: 'Updated Configuration',
			subTitle: 'REST API URL has been updated',
			buttons: ['OK']
		});
		expect(FormMock.prototype.get).toHaveBeenCalledWith('configURL');
		expect(StorageMock.prototype.set).toHaveBeenCalledWith('apiURL','http://restapi/url');
		expect(AlertMock.prototype.present).toHaveBeenCalled();
		expect(component.restApiUrl).toEqual('http://restapi/url');

	}));
});
