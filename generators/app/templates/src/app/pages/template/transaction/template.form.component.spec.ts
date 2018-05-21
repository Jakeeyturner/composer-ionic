import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ViewController, LoadingController, NavParams, IonicModule } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { <%=transactionName%>Form } from './<%=transactionName%>.form.component'
import { <%= transactionName %>Service } from '../../../services/transactions/<%=transactionName %>/<%=transactionName %>.service';
import { <%= transactionName %>} from '../../../<%=namespace%>';
import { mockView } from "ionic-angular/util/mock-providers";


let <%=transactionName%>One = new <%=transactionName%>();
<%=transactionName%>One.<%=transactionIdentifier%> = "<%=transactionName%>1";


class service<%=transactionName%>{
	get(transactionId){
		return new Promise((resolve,reject)=>{
			resolve(<%=transactionName%>One);
		});
	}
	add(form){
		return new Promise((resolve,reject) => {
			resolve();
		})
	}

	update(identifierValue, form){
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
	value;

	constructor(){
		this.value = {<%=transactionIdentifier%>:'test'}
	}
	get(key){
		return new FormObjectMock();
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
}

class FormObjectMock{
	enable(){
		return;
	}
	disable(){
		return;
	}
}

let transactionId;
let transactionType;
let properties = [];
let formType;

class NavParamsMock{
	get(value){
		if(value == 'transactionId'){
			return transactionId;
		}
		else if(value == 'properties'){
			return properties;
		}
		else if(value == 'formType'){
			return formType;
		}
		else{
			return transactionType;
		}
	}
}

describe('<%=transactionName%>Form', () => {
	let fixture;
	let component;

	let loadingMock = new LoadingMock();
	let ViewControllerMock = mockView();

  	beforeEach(async(() => {

    	TestBed.configureTestingModule({
			declarations: [
				<%=transactionName%>Form
			],
			imports: [
				IonicModule.forRoot(<%=transactionName%>Form)
			],
			providers: [
				{ provide: NavParams, useClass: NavParamsMock },
				{ provide: FormBuilder, useClass: FormBuilderMock },
				{ provide: LoadingController, useClass: LoadingControllerMock },
				{ provide: ViewController, useValue: ViewControllerMock },
				{ provide: <%=transactionName%>Service, useClass:service<%=transactionName%> }
			]
    	})
  	}));

  	beforeEach(() => {
		transactionType = '<%=transactionName%>';
    	fixture = TestBed.createComponent(<%=transactionName%>Form);
    	component = fixture.componentInstance;
  	});

  	it('should create <%=transactionName%>Form component', () => {
		expect(component instanceof <%=transactionName%>Form).toBe(true);
	});

	it('should have correct title for <%=transactionName%>Form',() => {
		component.formType = 'Add';
		let expectedTitle = 'Add <%=transactionName%>';
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain(expectedTitle);
	});


	it('should submit a <%=transactionName%> transaction', fakeAsync(() => {
		component.formType = 'Add';
		fixture.detectChanges();

		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');
		spyOn(service<%=transactionName%>.prototype,'add').and.returnValue(new Promise((resolve,reject)=>{resolve()}));
		spyOn(ViewControllerMock,'dismiss');
		component.addTransaction();
		tick();

		expect(LoadingControllerMock.prototype.create).toHaveBeenCalledWith({
			content: 'Adding <%=transactionName%>...'
		});

		expect(LoadingMock.prototype.present).toHaveBeenCalled();
		expect(service<%=transactionName%>.prototype.add).toHaveBeenCalled();
		expect(ViewControllerMock.dismiss).toHaveBeenCalled();
	}));


	it('should throw an error for an invalid <%=transactionName%> transaction', fakeAsync(() => {
		component.formType = 'Add';
		fixture.detectChanges();

		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');
		let json = JSON.stringify({error:{message:'Some error'}});
		spyOn(service<%=transactionName%>.prototype,'add').and.returnValue(new Promise((resolve,reject) => {
			reject({_body:json})
		}));
		spyOn(ViewControllerMock,'dismiss');
		component.addTransaction();
		tick();

		expect(LoadingControllerMock.prototype.create).toHaveBeenCalledWith({
			content: 'Adding <%=transactionName%>...'
		});

		expect(LoadingMock.prototype.present).toHaveBeenCalled();
		expect(service<%=transactionName%>.prototype.add).toHaveBeenCalled();
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
		expect(component.error).toEqual('Some error');
	}));

	it('should be able to dismiss <%=transactionName%>Form component', fakeAsync(() => {
		spyOn(ViewControllerMock,'dismiss');
		component.dismiss();
		tick();
		expect(ViewControllerMock.dismiss).toHaveBeenCalled();
	}));

});
