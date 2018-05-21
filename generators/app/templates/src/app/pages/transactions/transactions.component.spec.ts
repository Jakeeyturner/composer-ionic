import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { NavController } from 'ionic-angular';

import { TransactionsPage } from './transactions.component';
<% for(var x=0;x<transactionList.length;x++){ %>
	import { <%= transactionList[x].name %>Page } from '../transactions/<%= transactionList[x].name %>/<%= transactionList[x].name %>.component';<% } %>

class NavControllerMock{
	push(event,transaction){
		return;
	}
}

describe('TransactionsPage', () => {
	let fixture;
	let component;

  	beforeEach(async(() => {

    	TestBed.configureTestingModule({
			declarations: [
				TransactionsPage
			],
			imports: [
				IonicModule.forRoot(TransactionsPage)
			],
			providers: [
				{ provide : NavController, useClass: NavControllerMock }
			]
    	})
  	}));

  	beforeEach(() => {
    	fixture = TestBed.createComponent(TransactionsPage);
    	component = fixture.componentInstance;
  	});

  	it('should create TransactionsPage component', () => {
		expect(component instanceof TransactionsPage).toBe(true);
  	});

	it('should have correct title',() => {
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain('Transactions');
	});

	it('should initialize with all transactions',() => {
		expect(component.transactionList).toEqual([<% for(var x=0;x<transactionList.length;x++){ %><% if(x == transactionList.length-1){%>{'name':'<%= transactionList[x].name %>','component':<%= transactionList[x].name %>Page}<%}else{%>{'name':'<%= transactionList[x].name %>','component':<%= transactionList[x].name %>Page},<%}} %>]);
	});

	it('should push correct component for navigation',fakeAsync(() => {
		let transaction = {'component':{'some':'value'}};
		spyOn(NavControllerMock.prototype,'push');
		component.transactionTapped('',transaction);
		tick();
		expect(NavControllerMock.prototype.push).toHaveBeenCalledWith({'some':'value'});
  	}));

});
