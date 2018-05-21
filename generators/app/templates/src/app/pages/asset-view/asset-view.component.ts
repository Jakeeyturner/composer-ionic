import { Component } from '@angular/core';
import { LoadingController, ViewController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'page-asset-view',
	templateUrl: 'asset-view.component.html'
})

export class AssetViewPage {

	assetId: string = "";
	assetType: string = "";
	loadedAsset: any;
	loadedAssetKeys: string[] = [];

	loading: any;
	constructor(
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public dataService: DataService,
		public loadingCtrl: LoadingController
	){
		this.assetId = navParams.get('assetId');
		this.assetType = navParams.get('assetType');
	}

	ionViewWillEnter(): any {

		this.loading = this.loadingCtrl.create({
			content: 'Fetching '.concat(this.assetId)
		});
		this.loading.present();
		return this.getAsset().then((asset) => {
			this.loadedAsset = asset;
			this.loadedAssetKeys = Object.keys(asset);
			this.loadedAssetKeys.splice(0,1); // No need to show $class
			this.loading.dismiss();
		});

	}

	getAsset(): Promise<any> {
		return this.dataService.get(this.assetType,this.assetId);
	}

	dismiss(){
		this.viewCtrl.dismiss();
	}
}
