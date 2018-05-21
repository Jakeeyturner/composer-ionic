import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { IonicModule, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { PlatformService } from './services/platform.service';
import { Toast } from '@ionic-native/toast';
import { MyApp } from './app.component';
import { HomePage } from './pages/home/home.component';
import { SettingsPage } from './pages/settings/settings.component';
import { AssetsPage } from './pages/assets/assets.component';
import { ParticipantsPage } from './pages/participants/participants.component';
import { TransactionsPage } from './pages/transactions/transactions.component';

import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../test-config/mocks-ionic';
import { Observable } from 'rxjs/Observable';




class NetworkMock{
	type;
	constructor(){this.type = 'sometype'}
	onConnect(){
		return;
	}
	onDisconnect(){
		return;
	}
}

class PlatformServiceMock{
	isDevice(){
		return;
	}
	setConnection(type){
		return;
	}
}

class ToastMock{
	show(){
		return;
	}
}

let mockObservable;
class MockObservable{
	subscribe(){return;}
}
let mockNullObservable;
class MockNullObservable{
	subscribe(){return;}
}

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
}

describe('AppComponent', () => {
	let fixture;
  	let component;

  	beforeEach(async(() => {
    	TestBed.configureTestingModule({
			declarations: [
				MyApp,
				HomePage,
				SettingsPage,
				AssetsPage,
				ParticipantsPage,
				TransactionsPage
			],
			imports: [
				IonicModule.forRoot(MyApp)
			],
			providers: [
				{ provide: Network, useClass: NetworkMock },
				{ provide: PlatformService, useClass: PlatformServiceMock },
				{ provide: Toast, useClass: ToastMock },
				{ provide: StatusBar, useClass: StatusBarMock },
				{ provide: SplashScreen, useClass: SplashScreenMock },
				{ provide: Platform, useClass: PlatformMock },
				{ provide: Storage, useClass: StorageMock }
			]
    	})
  	}));

  	beforeEach(() => {
		mockObservable = new MockObservable();
		mockNullObservable = new MockNullObservable();

    	fixture = TestBed.createComponent(MyApp);
    	component = fixture.componentInstance;
  	});

  	it('should be created', fakeAsync(() => {
		spyOn(PlatformMock.prototype,'ready').and.returnValue(Promise.resolve());
		spyOn(StorageMock.prototype,'length').and.returnValue(Promise.resolve(1));
		spyOn(StatusBarMock.prototype,'styleDefault');
		spyOn(SplashScreenMock.prototype,'hide');
		spyOn(PlatformServiceMock.prototype,'isDevice').and.returnValue(true);

		spyOn(NetworkMock.prototype,'onDisconnect').and.returnValue(mockObservable);
		spyOn(NetworkMock.prototype,'onConnect').and.returnValue(mockObservable);
		tick();
		expect(component instanceof MyApp).toBe(true);
	}));

	it('should initialize with correct navigation pages', fakeAsync(() => {
		spyOn(PlatformMock.prototype,'ready').and.returnValue(Promise.resolve());
		spyOn(StorageMock.prototype,'length').and.returnValue(Promise.resolve(1));
		spyOn(StatusBarMock.prototype,'styleDefault');
		spyOn(SplashScreenMock.prototype,'hide');
		spyOn(PlatformServiceMock.prototype,'isDevice').and.returnValue(true);

		spyOn(NetworkMock.prototype,'onDisconnect').and.returnValue(mockObservable);
		spyOn(NetworkMock.prototype,'onConnect').and.returnValue(mockObservable);
		tick();
		expect(component.pages).toEqual([
			{ title: 'Home', component: HomePage },
			{ title: 'Assets', component: AssetsPage },
			{ title: 'Participants' ,component: ParticipantsPage},
			{ title: 'Transactions', component: TransactionsPage },
			{ title: 'Settings', component: SettingsPage}
		]);
	}));

	it('should set REST API url is unset', fakeAsync(() => {
		spyOn(PlatformMock.prototype,'ready').and.returnValue(Promise.resolve());
		spyOn(StorageMock.prototype,'length').and.returnValue(Promise.resolve(0));
		spyOn(StorageMock.prototype,'set');
		spyOn(StatusBarMock.prototype,'styleDefault');
		spyOn(SplashScreenMock.prototype,'hide');
		spyOn(PlatformServiceMock.prototype,'isDevice').and.returnValue(true);

		spyOn(NetworkMock.prototype,'onDisconnect').and.returnValue(mockObservable);
		spyOn(NetworkMock.prototype,'onConnect').and.returnValue(mockObservable);
		component.initializeApp();
		tick();
		expect(StorageMock.prototype.set).toHaveBeenCalledWith("apiURL","<%= apiIP %>:<%= apiPort %>/api/");
	}));

	it('should ignore setting REST API url if it has been set already', fakeAsync(() =>{
		spyOn(PlatformMock.prototype,'ready').and.returnValue(Promise.resolve());
		spyOn(StorageMock.prototype,'length').and.returnValue(Promise.resolve(1));
		spyOn(StorageMock.prototype,'set');
		spyOn(StatusBarMock.prototype,'styleDefault');
		spyOn(SplashScreenMock.prototype,'hide');
		spyOn(PlatformServiceMock.prototype,'isDevice').and.returnValue(true);

		spyOn(NetworkMock.prototype,'onDisconnect').and.returnValue(mockObservable);
		spyOn(NetworkMock.prototype,'onConnect').and.returnValue(mockObservable);
		component.initializeApp();
		tick();
		expect(StorageMock.prototype.set).not.toHaveBeenCalled();
	}))

	it('should detect if running in a browser', fakeAsync(() => {
		spyOn(PlatformMock.prototype,'ready').and.returnValue(Promise.resolve());
		spyOn(StorageMock.prototype,'length').and.returnValue(Promise.resolve(1));
		spyOn(StatusBarMock.prototype,'styleDefault');
		spyOn(SplashScreenMock.prototype,'hide');
		spyOn(PlatformServiceMock.prototype,'isDevice').and.returnValue(false);

		spyOn(NetworkMock.prototype,'onDisconnect').and.returnValue(mockObservable);
		spyOn(NetworkMock.prototype,'onConnect').and.returnValue(mockObservable);

		spyOn(MockNullObservable.prototype,'subscribe').and.returnValue(null);

		component.initializeApp();
		tick();


		expect(StatusBarMock.prototype.styleDefault).not.toHaveBeenCalled();
		expect(SplashScreenMock.prototype.hide).not.toHaveBeenCalled();

	}));

	it('should detect if running on a mobile device', fakeAsync(() => {
		spyOn(PlatformMock.prototype,'ready').and.returnValue(Promise.resolve());
		spyOn(StorageMock.prototype,'length').and.returnValue(Promise.resolve(1));
		spyOn(StatusBarMock.prototype,'styleDefault');
		spyOn(SplashScreenMock.prototype,'hide');
		spyOn(PlatformServiceMock.prototype,'isDevice').and.returnValue(true);

		spyOn(NetworkMock.prototype,'onDisconnect').and.returnValue(mockObservable);
		spyOn(NetworkMock.prototype,'onConnect').and.returnValue(mockObservable);

		spyOn(MockNullObservable.prototype,'subscribe').and.returnValue(null);

		component.initializeApp();
		tick();


		expect(StatusBarMock.prototype.styleDefault).toHaveBeenCalled();
		expect(SplashScreenMock.prototype.hide).toHaveBeenCalled();

	}))

	it('should detect if disconnected from a network', fakeAsync(() => {
		spyOn(PlatformMock.prototype,'ready').and.returnValue(Promise.resolve());
		spyOn(StorageMock.prototype,'length').and.returnValue(Promise.resolve(1));
		spyOn(StatusBarMock.prototype,'styleDefault');
		spyOn(SplashScreenMock.prototype,'hide');
		spyOn(PlatformServiceMock.prototype,'isDevice').and.returnValue(true);
		spyOn(PlatformServiceMock.prototype,'setConnection');
		spyOn(ToastMock.prototype,'show').and.returnValue(Observable.of('show toast'))

		spyOn(NetworkMock.prototype,'onDisconnect').and.returnValue(Observable.of('disconnection event'));
		spyOn(NetworkMock.prototype,'onConnect').and.returnValue(mockNullObservable);

		spyOn(MockNullObservable.prototype,'subscribe').and.returnValue(null);

		component.initializeApp();
		tick();


		expect(StatusBarMock.prototype.styleDefault).toHaveBeenCalled();
		expect(SplashScreenMock.prototype.hide).toHaveBeenCalled();
		expect(ToastMock.prototype.show).toHaveBeenCalledWith('Disconnected from Network', '3000', 'bottom');

		expect(PlatformServiceMock.prototype.setConnection).toHaveBeenCalledWith('sometype');
	}));

	it('should detect if reconnected to a network', fakeAsync(() => {
		spyOn(PlatformMock.prototype,'ready').and.returnValue(Promise.resolve());
		spyOn(StorageMock.prototype,'length').and.returnValue(Promise.resolve(1));
		spyOn(StatusBarMock.prototype,'styleDefault');
		spyOn(SplashScreenMock.prototype,'hide');
		spyOn(PlatformServiceMock.prototype,'isDevice').and.returnValue(true);
		spyOn(PlatformServiceMock.prototype,'setConnection');
		spyOn(ToastMock.prototype,'show').and.returnValue(Observable.of('show toast'))

		spyOn(NetworkMock.prototype,'onDisconnect').and.returnValue(mockNullObservable);
		spyOn(NetworkMock.prototype,'onConnect').and.returnValue(Observable.of('reconnection event'));

		spyOn(MockNullObservable.prototype,'subscribe').and.returnValue(null);

		component.initializeApp();
		tick();


		expect(StatusBarMock.prototype.styleDefault).toHaveBeenCalled();
		expect(SplashScreenMock.prototype.hide).toHaveBeenCalled();
		expect(ToastMock.prototype.show).toHaveBeenCalledWith('Reconnected to Network', '3000', 'bottom');

		expect(PlatformServiceMock.prototype.setConnection).toHaveBeenCalledWith('sometype');
	}));



});
