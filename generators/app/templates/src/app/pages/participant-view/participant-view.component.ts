import { Component } from '@angular/core';
import { LoadingController, ViewController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'page-participant-view',
	templateUrl: 'participant-view.component.html'
})

export class ParticipantViewPage {

	participantId: string = "";
	participantType: string = "";
	loadedParticipant: any;
	loadedParticipantKeys: string[] = [];

	loading: any;
	constructor(
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public dataService: DataService,
		public loadingCtrl: LoadingController
	){
		this.participantId = navParams.get('participantId');
		this.participantType = navParams.get('participantType');
	}

	ionViewWillEnter(): any {

		this.loading = this.loadingCtrl.create({
			content: 'Fetching '.concat(this.participantId)
		});
		this.loading.present();
		return this.getParticipant().then((participant) => {
			this.loadedParticipant = participant;
			this.loadedParticipantKeys = Object.keys(participant);
			this.loadedParticipantKeys.splice(0,1); // No need to show $class
			this.loading.dismiss();
		});

	}

	getParticipant(): Promise<any> {
		return this.dataService.get(this.participantType,this.participantId);
	}

	dismiss(){
		this.viewCtrl.dismiss();
	}
}
