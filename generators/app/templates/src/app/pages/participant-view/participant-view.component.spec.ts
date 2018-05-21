import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { LoadingController, ViewController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import {mockView} from "ionic-angular/util/mock-providers";

import { ParticipantViewPage } from './participant-view.component';

let participantId;
let participantType;
class NavParamsMock{
	get(value){
		if(value == 'participantId'){
			return participantId;
		}
		else{
			return participantType;
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

describe('ParticipantViewPage', () => {
	let fixture;
	let component;
	let loadingMock = new LoadingMock();
	let ViewControllerMock = mockView();
  	beforeEach(async(() => {
		participantId = 'participantIdPassedFromAnotherComponent';
		participantType = 'participantTypePassedFromAnotherComponent';

    	TestBed.configureTestingModule({
			declarations: [
				ParticipantViewPage
			],
			imports: [
				IonicModule.forRoot(ParticipantViewPage)
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
    	fixture = TestBed.createComponent(ParticipantViewPage);
    	component = fixture.componentInstance;
  	});

  	it('should create ParticipantViewPage component', () => {
		expect(component instanceof ParticipantViewPage).toBe(true);
  	});

	it('should have correct title',() => {
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain(participantType+' // ' +participantId);
	});

	it('should get correct participant id',() => {
		expect(component.participantId).toEqual('participantIdPassedFromAnotherComponent');
  	});

	it('should get correct participant type',() => {
		expect(component.participantType).toEqual('participantTypePassedFromAnotherComponent')
	});

	it('should fetch data and prepare the view', fakeAsync(() => {

		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');
		spyOn(component, 'getParticipant').and.returnValue(new Promise((resolve,reject)=>{
			resolve({'$class':'class','property1':'value1','property2':'value2'})
		}));

		component.ionViewWillEnter();
		tick();

		expect(LoadingControllerMock.prototype.create).toHaveBeenCalledWith({
			content: 'Fetching participantIdPassedFromAnotherComponent'
		});

		expect(LoadingMock.prototype.present).toHaveBeenCalled();

		expect(component.loadedParticipant).toEqual({'$class':'class','property1':'value1','property2':'value2'});
		expect(component.loadedParticipantKeys).toEqual(['property1','property2']);

		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();


	}));

	it('should call dataservice with correct arguments', () => {
		component.participantId = participantId;
		component.participantType = participantType;
		spyOn(DataServiceMock.prototype,'get');
		component.getParticipant();
		expect(DataServiceMock.prototype.get).toHaveBeenCalledWith(participantType,participantId);
	});

	it('should dismiss modal', () => {
		spyOn(ViewControllerMock,'dismiss');
		component.dismiss();
		expect(ViewControllerMock.dismiss).toHaveBeenCalled();
	});
});
