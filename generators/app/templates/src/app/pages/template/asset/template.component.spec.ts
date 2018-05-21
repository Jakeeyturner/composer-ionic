import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AlertController, LoadingController, NavParams, ModalController, IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { <%=assetName%>Page} from './<%=assetName%>.component';
import { <%=assetName%>Form } from './<%=assetName%>.form.component'
import { <%= assetName %>Service } from '../../../services/assets/<%=assetName %>/<%=assetName %>.service';
import { <%= assetName %>} from '../../../<%=namespace%>';
import { AssetViewPage } from '../../asset-view/asset-view.component';


let <%=assetName%>One = new <%=assetName%>();
<%=assetName%>One.<%=assetIdentifier%> = "<%=assetName%>1"
let <%=assetName%>Two = new <%=assetName%>();
<%=assetName%>Two.<%=assetIdentifier%> = "<%=assetName%>2"
let <%=assetName%>Three = new <%=assetName%>();
<%=assetName%>Three.<%=assetIdentifier%> = "<%=assetName%>3"

class service<%=assetName%>PageMock{
	getAll(){
		return new Promise((resolve,reject)=>{
			resolve([<%=assetName%>One,<%=assetName%>Two,<%=assetName%>Three]);
		});
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

class AlertControllerMock{
	create(value){
		return new AlertMock();
	}
}

class AlertMock{
	present(){
		return;
	}
	dismiss(){
		return;
	}
}

// class ModalControllerMock{
// 	create(value){
// 		return new ModalMock();
// 	}
// }

class ModalMock{
	present(){
		return;
	}
	dismiss(){
		return;
	}
	onDidDismiss(){
		return;
	}
}

class ModalControllerMock {
	public presentableRef = {
	  present: () => Promise.resolve(),
	  dismiss: (data?: any) => {
		if (this.dismissCallbackFn) {
		  this.dismissCallbackFn(data);
		}
		return Promise.resolve({});
	  },
	  onDidDismiss: (fn) => {
		this.dismissCallbackFn = fn;
	  }
	};

	public dismissCallbackFn = null;

	public create(options?) {
	  return Object.assign(this.presentableRef, options);
	}
  }



describe('<%=assetName%>Page', () => {
	let fixture;
	let component;
	let loadingMock = new LoadingMock();
	let alertMock = new AlertMock();
	let modalMock = new ModalMock();

  	beforeEach(async(() => {

    	TestBed.configureTestingModule({
			declarations: [
				<%=assetName%>Page
			],
			imports: [
				IonicModule.forRoot(<%=assetName%>Page)
			],
			providers: [
				{ provide: NavParams },
				{ provide: AlertController, useClass: AlertControllerMock },
				{ provide: LoadingController, useClass: LoadingControllerMock },
				{ provide: ModalController, useClass: ModalControllerMock },
				{ provide: <%=assetName%>Service, useClass:service<%=assetName%>PageMock }
			]
    	})
  	}));

  	beforeEach(() => {
		spyOn(service<%=assetName%>PageMock.prototype,'getAll').and.callThrough();
    	fixture = TestBed.createComponent(<%=assetName%>Page);
    	component = fixture.componentInstance;
  	});

  	it('should create <%=assetName%>Page component', () => {
		expect(component instanceof <%=assetName%>Page).toBe(true);
	});

	it('should have correct title',() => {
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain('<%=assetName%>');
	});

	it('should return <%=assetName%> assets', fakeAsync(() => {
		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');

		component.ionViewWillEnter();
		tick();

		expect(component.currentItems.length).toEqual(3);
		expect(component.items.length).toEqual(3);
	}));

	it('<%=assetName%> assets should be a <%=assetName%> type', fakeAsync(() => {
		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');

		component.ionViewWillEnter();
		tick();

		expect(component.currentItems[0] instanceof <%=assetName%>).toBe(true);
		expect(component.currentItems[1] instanceof <%=assetName%>).toBe(true);
		expect(component.currentItems[2] instanceof <%=assetName%>).toBe(true);
	  }));

	it('should present and dismiss loading alert', fakeAsync(() => {
		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');

		component.ionViewWillEnter();
		tick();

		expect(LoadingControllerMock.prototype.create).toHaveBeenCalled();
		expect(LoadingMock.prototype.present).toHaveBeenCalled();
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
		expect(component.itemsLoaded).toEqual(true);
	}));

	it('should get same items when no search text', fakeAsync(() => {
		let ev = {target:{value:""}};
		component.getItems(ev);
		tick();

		expect(component.currentItems).toEqual([<%=assetName%>One,<%=assetName%>Two,<%=assetName%>Three]);

	}));

	it('should get some items when there is partially matching search text', fakeAsync(() => {
		let ev = {target:{value:"3"}};
		component.getItems(ev);
		tick();

		expect(component.items).toEqual([<%=assetName%>Three]);

	}));

	it('should get no items when there is no matching search text', fakeAsync(() => {
		let ev = {target:{value:"randomstring"}};
		component.getItems(ev);
		tick();

		expect(component.items).toEqual([]);

	}));

	it('should refresh and fetch latest items', fakeAsync(() => {
		let refresher = {complete:function(){return;}};

		spyOn(refresher,'complete');
		component.refreshItems(refresher);
		tick();

		expect(component.currentItems).toEqual([<%=assetName%>One,<%=assetName%>Two,<%=assetName%>Three]);
		expect(component.items).toEqual([<%=assetName%>One,<%=assetName%>Two,<%=assetName%>Three]);
		expect(refresher.complete).toHaveBeenCalled();

	}));

	it('should open model to view asset', fakeAsync(() => {
		spyOn(ModalControllerMock.prototype,'create').and.returnValue(modalMock);
		spyOn(ModalMock.prototype,'present');
		let assetIdentifier = 'assetIdentifier';
		component.viewAsset(assetIdentifier);
		tick();
		expect(ModalControllerMock.prototype.create).toHaveBeenCalledWith(
			AssetViewPage, {
				assetId: assetIdentifier, assetType: '<%= assetName %>'
			}
		)
		expect(ModalMock.prototype.present).toHaveBeenCalled();
	}));

	it('should show delete asset alert', fakeAsync(() => {
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		let assetIdentifier = 'assetIdentifier'
		component.deleteAsset(assetIdentifier);
		tick();
		expect(AlertMock.prototype.present).toHaveBeenCalled();
	}));

	it('should open model to add asset', fakeAsync(() => {
		spyOn(ModalControllerMock.prototype,'create').and.returnValue(modalMock);
		spyOn(ModalMock.prototype,'present');
		spyOn(ModalMock.prototype,'onDidDismiss');

		component.addAsset();

		tick();

		expect(ModalControllerMock.prototype.create).toHaveBeenCalledWith(
			<%= assetName %>Form, {
				assetType: '<%=assetName%>',
				properties: <%-JSON.stringify(properties)%>,
				formType: 'Add'
			}
		)
		expect(ModalMock.prototype.present).toHaveBeenCalled();
		expect(ModalMock.prototype.onDidDismiss).toHaveBeenCalled();

	}));

	it('should open model to update asset', fakeAsync(() => {
		spyOn(ModalControllerMock.prototype,'create').and.returnValue(modalMock);
		spyOn(ModalMock.prototype,'present');
		spyOn(ModalMock.prototype,'onDidDismiss');
		let assetIdentifier = 'assetIdentifier';

		component.updateAsset(assetIdentifier);

		tick();

		expect(ModalControllerMock.prototype.create).toHaveBeenCalledWith(
			<%= assetName %>Form, {
				assetId: assetIdentifier,
				assetType: '<%=assetName%>',
				properties: <%-JSON.stringify(properties)%>,
				formType: 'Update'
			}
		)
		expect(ModalMock.prototype.present).toHaveBeenCalled();
		expect(ModalMock.prototype.onDidDismiss).toHaveBeenCalled();

	}));


	it('should get all <%=assetName%> assets after an add <%=assetName%> form is completed', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.addAsset();
		tick();

		modal.dismiss({ loading: new LoadingMock(), assetId: 'assetIdAdded' });
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(service<%=assetName%>PageMock.prototype.getAll).toHaveBeenCalled();
		expect(component.currentItems).toEqual([<%=assetName%>One,<%=assetName%>Two,<%=assetName%>Three]);
		expect(component.items).toEqual([<%=assetName%>One,<%=assetName%>Two,<%=assetName%>Three]);
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).toHaveBeenCalledWith({
			title: 'Added <%=assetName%>',
			subTitle: 'assetIdAdded has been added',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).toHaveBeenCalled();

	}));

	it('should handle add <%=assetName%> form dismissal', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.addAsset();
		tick();

		modal.dismiss({});
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(component.currentItems).not.toEqual([<%=assetName%>One,<%=assetName%>Two,<%=assetName%>Three]);
		expect(component.items).not.toEqual([<%=assetName%>One,<%=assetName%>Two,<%=assetName%>Three]);
		expect(LoadingMock.prototype.dismiss).not.toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).not.toHaveBeenCalledWith({
			title: 'Added <%=assetName%>',
			subTitle: 'assetIdAdded has been added',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).not.toHaveBeenCalled();

	}));



	it('should get all <%=assetName%> assets after an update <%=assetName%> form is completed', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.updateAsset('value');
		tick();

		modal.dismiss({ loading: new LoadingMock(), assetId: 'assetIdAdded' });
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(service<%=assetName%>PageMock.prototype.getAll).toHaveBeenCalled();
		expect(component.currentItems).toEqual([<%=assetName%>One,<%=assetName%>Two,<%=assetName%>Three]);
		expect(component.items).toEqual([<%=assetName%>One,<%=assetName%>Two,<%=assetName%>Three]);
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).toHaveBeenCalledWith({
			title: 'Updated <%=assetName%>',
			subTitle: 'assetIdAdded has been updated',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).toHaveBeenCalled();

	}));

	it('should handle update <%=assetName%> form dismissal', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.updateAsset('value');
		tick();

		modal.dismiss({});
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(component.currentItems).not.toEqual([<%=assetName%>One,<%=assetName%>Two,<%=assetName%>Three]);
		expect(component.items).not.toEqual([<%=assetName%>One,<%=assetName%>Two,<%=assetName%>Three]);
		expect(LoadingMock.prototype.dismiss).not.toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).not.toHaveBeenCalledWith({
			title: 'Updated <%=assetName%>',
			subTitle: 'assetIdAdded has been updated',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).not.toHaveBeenCalled();

	}));


});
