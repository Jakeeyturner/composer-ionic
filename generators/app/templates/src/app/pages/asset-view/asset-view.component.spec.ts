import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { LoadingController, ViewController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import {mockView} from "ionic-angular/util/mock-providers";

import { AssetViewPage } from './asset-view.component';

let assetId;
let assetType;
class NavParamsMock{
	get(value){
		if(value == 'assetId'){
			return assetId;
		}
		else{
			return assetType;
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

describe('AssetViewPage', () => {
	let fixture;
	let component;
	let loadingMock = new LoadingMock();
	let ViewControllerMock = mockView();
  	beforeEach(async(() => {
		assetId = 'assetIdPassedFromAnotherComponent';
		assetType = 'assetTypePassedFromAnotherComponent';

    	TestBed.configureTestingModule({
			declarations: [
				AssetViewPage
			],
			imports: [
				IonicModule.forRoot(AssetViewPage)
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
    	fixture = TestBed.createComponent(AssetViewPage);
    	component = fixture.componentInstance;
  	});

  	it('should create AssetViewPage component', () => {
		expect(component instanceof AssetViewPage).toBe(true);
  	});

	it('should have correct title',() => {
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain(assetType+' // ' +assetId);
	});

	it('should get correct asset id',() => {
		expect(component.assetId).toEqual('assetIdPassedFromAnotherComponent');
  	});

	it('should get correct asset type',() => {
		expect(component.assetType).toEqual('assetTypePassedFromAnotherComponent')
	});

	it('should fetch data and prepare the view', fakeAsync(() => {

		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');
		spyOn(component, 'getAsset').and.returnValue(new Promise((resolve,reject)=>{
			resolve({'$class':'class','property1':'value1','property2':'value2'})
		}));

		component.ionViewWillEnter();
		tick();

		expect(LoadingControllerMock.prototype.create).toHaveBeenCalledWith({
			content: 'Fetching assetIdPassedFromAnotherComponent'
		});

		expect(LoadingMock.prototype.present).toHaveBeenCalled();

		expect(component.loadedAsset).toEqual({'$class':'class','property1':'value1','property2':'value2'});
		expect(component.loadedAssetKeys).toEqual(['property1','property2']);

		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();


	}));

	it('should call dataservice with correct arguments', () => {
		component.assetId = assetId;
		component.assetType = assetType;
		spyOn(DataServiceMock.prototype,'get');
		component.getAsset();
		expect(DataServiceMock.prototype.get).toHaveBeenCalledWith(assetType,assetId);
	});

	it('should dismiss modal', () => {
		spyOn(ViewControllerMock,'dismiss');
		component.dismiss();
		expect(ViewControllerMock.dismiss).toHaveBeenCalled();
	});
});
