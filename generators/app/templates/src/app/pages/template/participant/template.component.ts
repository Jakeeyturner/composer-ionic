import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams, PopoverController } from 'ionic-angular';
import { <%= participantName %>Service } from '../../../services/participants/<%=participantName %>/<%=participantName %>.service';
import { <%= participantName %>} from '../../../<%=namespace%>';
import { <%= participantName %>Form } from './<%= participantName %>.form.component';
import { ParticipantViewPage } from '../../participant-view/participant-view.component';
import { PopoverPage } from '../../popover/popover.component';
@Component({
	selector: 'page-<%= participantName %>',
	templateUrl: '<%= participantName %>.component.html'
})

export class <%= participantName %>Page {
	searchQuery: string = '';
	items: <%= participantName %>[] = [];
	itemsLoaded: boolean = false; //This is to ensure that 'no participants' message doesn't appear when data is being retrieved
	currentItems: <%= participantName %>[] = [];
	properties: any[] = <%-JSON.stringify(properties)%>;

	constructor(
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public modalCtrl: ModalController,
		public popoverCtrl: PopoverController,
		public service<%= participantName %>:<%= participantName %>Service
	){
		this.service<%= participantName %>.getAll().then((participants) => {
			this.currentItems = participants;
			this.items = participants;
			this.itemsLoaded = true;
		});
	}

	ionViewWillEnter(): any {

		let loading = this.loadingCtrl.create({
			content: 'Fetching all <%=participantName%> participants'
		});
		loading.present();
		return this.service<%= participantName %>.getAll().then((participants) => {
			this.currentItems = participants;
			this.items = participants;
			this.itemsLoaded = true;
			loading.dismiss();
		});

	}

	getItems(ev: any): void {
		this.service<%= participantName %>.getAll().then((participants) => {
			this.currentItems = participants;
			this.items = participants;
			// set val to the value of the searchbar
			let val = ev.target.value;

			// if the value is an empty string don't filter the items
			if (val && val.trim() != '') {
				this.items = this.items.filter((item) => {
					return (item['<%=currentParticipant.identifier%>'].toLowerCase().indexOf(val.toLowerCase()) > -1);
				});
			}
		});
	}

	refreshItems(refresher): Promise<void>{
		return this.service<%= participantName %>.getAll().then((participants) => {
			this.currentItems = participants;
			this.items = participants;
			refresher.complete();
		});
	}

	viewParticipant(participantId){
		let modal = this.modalCtrl.create(ParticipantViewPage, {
			participantId: participantId, participantType: '<%= participantName %>'
		});
		modal.present();
	}

	addParticipant(){
		let modal = this.modalCtrl.create(<%= participantName %>Form, {
			participantId: '<%=participantIdentifier%>', participantType: '<%=participantName%>', properties: this.properties, formType: 'Add'
		});
		modal.present();

		modal.onDidDismiss(data => {

			if(data !== undefined && data.participantId && data.loading){
				let participantIdValue = data.participantId;
				let loading = data.loading;


				this.service<%= participantName %>.getAll().then((participants) => {
					this.currentItems = participants;
					this.items = participants;

					loading.dismiss(); // Dismiss loading animation
					let alert = this.alertCtrl.create({
						title: 'Added <%= participantName %>',
						subTitle: participantIdValue.concat(' has been added'),
						buttons: ['OK']
					});

					alert.present(); // Present successful participant deletion message
				});
			}

		})
	}

	updateParticipant(participantId){
		let modal = this.modalCtrl.create(<%= participantName %>Form, {
			participantId: participantId, participantType: '<%=participantName%>',properties: this.properties, formType: 'Update'
		});
		modal.present();

		modal.onDidDismiss(data => {

			if(data !== undefined && data.participantId && data.loading){
				let participantIdValue = data.participantId;
				let loading = data.loading;


				this.service<%= participantName %>.getAll().then((participants) => {
					this.currentItems = participants;
					this.items = participants;

					loading.dismiss(); // Dismiss loading animation
					let alert = this.alertCtrl.create({
						title: 'Updated <%= participantName %>',
						subTitle: participantIdValue.concat(' has been updated'),
						buttons: ['OK']
					});

					alert.present(); // Present successful participant deletion message
				});
			}

		})

	}


	deleteParticipant(participantId) {
		let message = "Are you sure you want to delete ".concat(participantId).concat('?');
		let confirm = this.alertCtrl.create({
			title: 'Delete <%= participantName %>?',
			message: message,
			buttons: [{
				text: 'Yes',
				handler: () => {

					let loading = this.loadingCtrl.create({
						content: 'Deleting <%= participantName %>...'
					});

					loading.present(); // Show loading animation

					this.service<%= participantName %>.delete(participantId).then(() => {

						// We have deleted the participant, now we need to get all of the participants and update the view
						this.service<%= participantName %>.getAll().then((participants) => {
							this.currentItems = participants;
							this.items = participants;

							loading.dismiss(); // Dismiss loading animation

							let alert = this.alertCtrl.create({
								title: 'Deleted <%= participantName %>',
								subTitle: participantId.concat(' has been deleted'),
								buttons: ['OK']
							});

							alert.present(); // Present successful participant deletion message
						});
					})
				}
			},
			{
				text: 'No',
				handler: () => {}
			}]
		});

		confirm.present();
	}

	sortParticipants(){
		let tempCurrentItems = [];
		let tempItems = [];
		console.log('pre reverse',this.currentItems,this.items);
		for(let x=this.currentItems.length-1;x>=0;x--){
			tempCurrentItems.push(this.currentItems[x]);
		}
		for(let x=this.items.length-1;x>=0;x--){
			tempItems.push(this.items[x]);
		}
		this.currentItems = tempCurrentItems;
		this.items = tempItems;
		console.log('post reverse',this.currentItems,this.items);
	}

	presentPopover(event) {
		let popover = this.popoverCtrl.create(PopoverPage,);
		popover.present({
			ev: event
		});
		popover.onDidDismiss(data => {
			if(data == 'sort'){
				this.sortParticipants();
			}
		})
	}


}
