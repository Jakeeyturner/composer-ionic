import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { NavController } from 'ionic-angular';

import { ParticipantsPage } from './participants.component';
<% for(var x=0;x<participantList.length;x++){ %>
	import { <%= participantList[x].name %>Page } from '../participants/<%= participantList[x].name %>/<%= participantList[x].name %>.component';<% } %>

class NavControllerMock{
	push(event,participant){
		return;
	}
}

describe('ParticipantsPage', () => {
	let fixture;
	let component;

  	beforeEach(async(() => {

    	TestBed.configureTestingModule({
			declarations: [
				ParticipantsPage
			],
			imports: [
				IonicModule.forRoot(ParticipantsPage)
			],
			providers: [
				{ provide : NavController, useClass: NavControllerMock }
			]
    	})
  	}));

  	beforeEach(() => {
    	fixture = TestBed.createComponent(ParticipantsPage);
    	component = fixture.componentInstance;
  	});

  	it('should create ParticipantsPage component', () => {
		expect(component instanceof ParticipantsPage).toBe(true);
  	});

	it('should have correct title',() => {
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain('Participants');
	});

	it('should initialize with all participants',() => {
		expect(component.participantList).toEqual([<% for(var x=0;x<participantList.length;x++){ %><% if(x == participantList.length-1){%>{'name':'<%= participantList[x].name %>','component':<%= participantList[x].name %>Page}<%}else{%>{'name':'<%= participantList[x].name %>','component':<%= participantList[x].name %>Page},<%}} %>]);
	});

	it('should push correct component for navigation',fakeAsync(() => {
		let participant = {'component':{'some':'value'}};
		spyOn(NavControllerMock.prototype,'push');
		component.participantTapped('',participant);
		tick();
		expect(NavControllerMock.prototype.push).toHaveBeenCalledWith({'some':'value'});
  	}));

});
