import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { LoadingController, ViewController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import {mockView} from 'ionic-angular/util/mock-providers';

import { TransactionViewPage } from './transaction-view.component';

let transactionId;
let transactionType;
class NavParamsMock{
	get(value){
		if(value == 'transactionId'){
			return transactionId;
		}
		else{
			return transactionType;
		}
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

class DataServiceMock{
	get(arg1, arg2){
		return new Promise((resolve,reject) => {
			resolve({'key1':'value1','key2':'value2'})
		});
	}
}

describe('TransactionViewPage', () => {
	let fixture;
	let component;
	let loadingMock = new LoadingMock();
	let ViewControllerMock = mockView();
  	beforeEach(async(() => {
		transactionId = 'transactionIdPassedFromAnotherComponent';
		transactionType = 'transactionTypePassedFromAnotherComponent';

    	TestBed.configureTestingModule({
			declarations: [
				TransactionViewPage
			],
			imports: [
				IonicModule.forRoot(TransactionViewPage)
			],
			providers: [
				{ provide: NavParams, useClass: NavParamsMock },
				{ provide: ViewController, useValue: ViewControllerMock },
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: LoadingController, useClass: LoadingControllerMock}
			]
    	})
  	}));

  	beforeEach(() => {
    	fixture = TestBed.createComponent(TransactionViewPage);
    	component = fixture.componentInstance;
  	});

  	it('should create TransactionViewPage component', () => {
		expect(component instanceof TransactionViewPage).toBe(true);
  	});

	it('should have correct title',() => {
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain(transactionType+' // ' +transactionId);
	});

	it('should get correct transaction id',() => {
		expect(component.transactionId).toEqual('transactionIdPassedFromAnotherComponent');
  	});

	it('should get correct transaction type',() => {
		expect(component.transactionType).toEqual('transactionTypePassedFromAnotherComponent')
	});

	it('should fetch data and prepare the view', fakeAsync(() => {

		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');
		spyOn(component, 'getTransaction').and.returnValue(new Promise((resolve,reject)=>{
			resolve({'$class':'class','property1':'value1','property2':'value2'})
		}));

		component.ionViewWillEnter();
		tick();

		expect(LoadingControllerMock.prototype.create).toHaveBeenCalledWith({
			content: 'Fetching transactionIdPassedFromAnotherComponent'
		});

		expect(LoadingMock.prototype.present).toHaveBeenCalled();

		expect(component.loadedTransaction).toEqual({'$class':'class','property1':'value1','property2':'value2'});
		expect(component.loadedTransactionKeys).toEqual(['property1','property2']);

		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();


	}));

	it('should call dataservice with correct arguments', () => {
		component.transactionId = transactionId;
		component.transactionType = transactionType;
		spyOn(DataServiceMock.prototype,'get');
		component.getTransaction();
		expect(DataServiceMock.prototype.get).toHaveBeenCalledWith(transactionType,transactionId);
	});

	it('should dismiss modal', () => {
		spyOn(ViewControllerMock,'dismiss');
		component.dismiss();
		expect(ViewControllerMock.dismiss).toHaveBeenCalled();
	});
});
