import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AlertController, LoadingController, NavParams, ModalController, IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { <%=transactionName%>Page} from './<%=transactionName%>.component';
import { <%=transactionName%>Form } from './<%=transactionName%>.form.component';
import { <%= transactionName %>Service } from '../../../services/transactions/<%=transactionName %>/<%=transactionName %>.service';
import { <%= transactionName %>} from '../../../<%=namespace%>';
import { TransactionViewPage } from '../../transaction-view/transaction-view.component';


let <%=transactionName%>One = new <%=transactionName%>();
<%=transactionName%>One.<%=transactionIdentifier%> = "<%=transactionName%>1"
let <%=transactionName%>Two = new <%=transactionName%>();
<%=transactionName%>Two.<%=transactionIdentifier%> = "<%=transactionName%>2"
let <%=transactionName%>Three = new <%=transactionName%>();
<%=transactionName%>Three.<%=transactionIdentifier%> = "<%=transactionName%>3"

class service<%=transactionName%>PageMock{
	getAll(){
		return new Promise((resolve,reject)=>{
			resolve([<%=transactionName%>One,<%=transactionName%>Two,<%=transactionName%>Three]);
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

describe('<%=transactionName%>Page', () => {
	let fixture;
	let component;
	let loadingMock = new LoadingMock();
	let alertMock = new AlertMock();
	let modalMock = new ModalMock();

  	beforeEach(async(() => {

    	TestBed.configureTestingModule({
			declarations: [
				<%=transactionName%>Page
			],
			imports: [
				IonicModule.forRoot(<%=transactionName%>Page)
			],
			providers: [
				{ provide: NavParams },
				{ provide: AlertController, useClass: AlertControllerMock },
				{ provide: LoadingController, useClass: LoadingControllerMock },
				{ provide: ModalController, useClass: ModalControllerMock },
				{ provide: <%=transactionName%>Service, useClass:service<%=transactionName%>PageMock }
			]
    	})
  	}));

  	beforeEach(() => {
		spyOn(service<%=transactionName%>PageMock.prototype,'getAll').and.callThrough();
    	fixture = TestBed.createComponent(<%=transactionName%>Page);
    	component = fixture.componentInstance;
  	});

  	it('should create <%=transactionName%>Page component', () => {
		expect(component instanceof <%=transactionName%>Page).toBe(true);
	});

	it('should have correct title',() => {
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain('<%=transactionName%>');
	});

	it('should return <%=transactionName%> transactions', fakeAsync(() => {
		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');

		component.ionViewWillEnter();
		tick();

		expect(component.currentTransactions.length).toEqual(3);
		expect(component.transactions.length).toEqual(3);
	}));

	it('<%=transactionName%> transactions should be a <%=transactionName%> type', fakeAsync(() => {
		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');

		component.ionViewWillEnter();
		tick();

		expect(component.currentTransactions[0] instanceof <%=transactionName%>).toBe(true);
		expect(component.currentTransactions[1] instanceof <%=transactionName%>).toBe(true);
		expect(component.currentTransactions[2] instanceof <%=transactionName%>).toBe(true);
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
		expect(component.transactionsLoaded).toEqual(true);
	}));

	it('should get same items when no search text', fakeAsync(() => {
		let ev = {target:{value:""}};
		component.getTransactions(ev);
		tick();

		expect(component.currentTransactions).toEqual([<%=transactionName%>One,<%=transactionName%>Two,<%=transactionName%>Three]);

	}));

	it('should get some items when there is partially matching search text', fakeAsync(() => {
		let ev = {target:{value:"3"}};
		component.getTransactions(ev);
		tick();

		expect(component.transactions).toEqual([<%=transactionName%>Three]);

	}));

	it('should get no transactions when there is no matching search text', fakeAsync(() => {
		let ev = {target:{value:"randomstring"}};
		component.getTransactions(ev);
		tick();

		expect(component.transactions).toEqual([]);

	}));

	it('should refresh and fetch latest items', fakeAsync(() => {
		let refresher = {complete:function(){return;}};

		spyOn(refresher,'complete');
		component.refreshTransactions(refresher);
		tick();

		expect(component.currentTransactions).toEqual([<%=transactionName%>One,<%=transactionName%>Two,<%=transactionName%>Three]);
		expect(component.transactions).toEqual([<%=transactionName%>One,<%=transactionName%>Two,<%=transactionName%>Three]);
		expect(refresher.complete).toHaveBeenCalled();

	}));

	it('should open model to view transaction', fakeAsync(() => {
		spyOn(ModalControllerMock.prototype,'create').and.returnValue(modalMock);
		spyOn(ModalMock.prototype,'present');
		let transactionIdentifier = 'transactionIdentifier';
		component.viewTransaction(transactionIdentifier);
		tick();
		expect(ModalControllerMock.prototype.create).toHaveBeenCalledWith(
			TransactionViewPage, {
				transactionId: transactionIdentifier, transactionType: '<%= transactionName %>'
			}
		)
		expect(ModalMock.prototype.present).toHaveBeenCalled();
	}));

	it('should open model to add <%=transactionName%> transaction', fakeAsync(() => {
		spyOn(ModalControllerMock.prototype,'create').and.returnValue(modalMock);
		spyOn(ModalMock.prototype,'present');
		spyOn(ModalMock.prototype,'onDidDismiss');

		component.addTransaction();

		tick();

		expect(ModalControllerMock.prototype.create).toHaveBeenCalledWith(
			<%= transactionName %>Form, {
				transactionType: '<%=transactionName%>',
				properties: <%-JSON.stringify(properties)%>,
				formType: 'Add'
			}
		)
		expect(ModalMock.prototype.present).toHaveBeenCalled();
		expect(ModalMock.prototype.onDidDismiss).toHaveBeenCalled();

	}));


	it('should get all <%=transactionName%> transactions after an add <%=transactionName%> form is completed', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.addTransaction();
		tick();

		modal.dismiss({ loading: new LoadingMock(), response: {transactionId:'transactionIdAdded'} });
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(service<%=transactionName%>PageMock.prototype.getAll).toHaveBeenCalled();
		expect(component.currentTransactions).toEqual([<%=transactionName%>One,<%=transactionName%>Two,<%=transactionName%>Three]);
		expect(component.transactions).toEqual([<%=transactionName%>One,<%=transactionName%>Two,<%=transactionName%>Three]);
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).toHaveBeenCalledWith({
			title: 'Added <%=transactionName%>',
			subTitle: 'The <%= transactionName %> transaction has been submitted with the ID: transactionIdAdded',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).toHaveBeenCalled();

	}));

	it('should handle add <%=transactionName%> form dismissal', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.addTransaction();
		tick();

		modal.dismiss({});
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(component.currentTransactions).not.toEqual([<%=transactionName%>One,<%=transactionName%>Two,<%=transactionName%>Three]);
		expect(component.transactions).not.toEqual([<%=transactionName%>One,<%=transactionName%>Two,<%=transactionName%>Three]);
		expect(LoadingMock.prototype.dismiss).not.toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).not.toHaveBeenCalledWith({
			title: 'Added <%=transactionName%>',
			subTitle: 'transactionIdAdded has been added',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).not.toHaveBeenCalled();

	}));


});
