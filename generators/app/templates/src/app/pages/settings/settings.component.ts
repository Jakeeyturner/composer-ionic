import { Component } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'page-settings',
	templateUrl: 'settings.component.html'
})

export class SettingsPage {
	restApiUrl: string;
	form: FormGroup;

	constructor(
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public formBuilder: FormBuilder,
		private storage: Storage

	){
		this.form = this.formBuilder.group({
			configURL: [Validators.required]
		})
	}

	ionViewWillEnter(){

		let loading = this.loadingCtrl.create({
			content: 'Fetching configuration'
		});
		loading.present();
		return this.getConfig().then((value) => {
			this.restApiUrl = value;
			loading.dismiss();
		});

	}

	getConfig(){
		return this.storage.get('apiURL');
	}

	setConfig(){
		let alert = this.alertCtrl.create({
			title: 'Updated Configuration',
			subTitle: 'REST API URL has been updated',
			buttons: ['OK']
		});

		let newApiUrl = this.form.get('configURL').value;
		return this.storage.set('apiURL',newApiUrl).then(() => {
			alert.present();
			this.restApiUrl = newApiUrl;
		});
	}

}
