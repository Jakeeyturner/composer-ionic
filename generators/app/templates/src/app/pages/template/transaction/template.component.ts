import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams, PopoverController } from 'ionic-angular';
import { <%= transactionName %>Service } from '../../../services/transactions/<%=transactionName %>/<%=transactionName %>.service';
import { <%= transactionName %>} from '../../../<%=namespace%>';
import { <%= transactionName %>Form } from './<%= transactionName %>.form.component';
import { TransactionViewPage } from '../../transaction-view/transaction-view.component';
import { PopoverPage } from '../../popover/popover.component';
@Component({
	selector: 'page-<%= transactionName %>',
	templateUrl: '<%= transactionName %>.component.html'
})

export class <%= transactionName %>Page {
	searchQuery: string = '';
	transactions: <%= transactionName %>[] = [];
	transactionsLoaded: boolean = false; //This is to ensure that 'no transactions' message doesn't appear when data is being retrieved
	currentTransactions: <%= transactionName %>[] = [];
	properties: any[] = <%-JSON.stringify(properties)%>;

	constructor(
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public modalCtrl: ModalController,
		public popoverCtrl: PopoverController,
		public service<%= transactionName %>:<%= transactionName %>Service
	){
		this.service<%= transactionName %>.getAll().then((transactions) => {
			this.currentTransactions = transactions;
			this.transactions = transactions;
			this.transactionsLoaded = true;
		});
	}

	ionViewWillEnter(): any {

		let loading = this.loadingCtrl.create({
			content: 'Fetching all <%=transactionName%> transactions'
		});
		loading.present();
		return this.service<%= transactionName %>.getAll().then((transactions) => {
			this.currentTransactions = transactions;
			this.transactions = transactions;
			this.transactionsLoaded = true;
			loading.dismiss();
		});

	}

	getTransactions(ev: any): void {
		this.service<%= transactionName %>.getAll().then((transactions) => {
			this.currentTransactions = transactions;
			this.transactions = transactions;
			// set val to the value of the searchbar
			let val = ev.target.value;

			// if the value is an empty string don't filter the transactions
			if (val && val.trim() != '') {
				this.transactions = this.transactions.filter((item) => {
					return (item['<%=currentTransaction.identifier%>'].toLowerCase().indexOf(val.toLowerCase()) > -1);
				});
			}
		});
	}

	refreshTransactions(refresher): Promise<void>{
		return this.service<%= transactionName %>.getAll().then((transactions) => {
			this.currentTransactions = transactions;
			this.transactions = transactions;
			refresher.complete();
		});
	}

	viewTransaction(transactionId){
		let modal = this.modalCtrl.create(TransactionViewPage, {
			transactionId: transactionId, transactionType: '<%= transactionName %>'
		});
		modal.present();
	}

	addTransaction(){
		let modal = this.modalCtrl.create(<%= transactionName %>Form, {
			transactionType: '<%=transactionName%>', properties: this.properties, formType: 'Add'
		});
		modal.present();

		modal.onDidDismiss(data => {
			if(data !== undefined && data.response && data.loading){
				let loading = data.loading;
				let response = data.response;

				this.service<%= transactionName %>.getAll().then((transactions) => {
					this.currentTransactions = transactions;
					this.transactions = transactions;

					loading.dismiss(); // Dismiss loading animation
					let alert = this.alertCtrl.create({
						title: 'Added <%= transactionName %>',
						subTitle: 'The <%= transactionName %> transaction has been submitted with the ID: '.concat(response.transactionId),
						buttons: ['OK']
					});

					alert.present(); // Present successful transaction addition message
				});
			}

		})
	}



	sortTransactions(){
		let tempcurrentTransactions = [];
		let tempTransactions = [];
		console.log('pre reverse',this.currentTransactions,this.transactions);
		for(let x=this.currentTransactions.length-1;x>=0;x--){
			tempcurrentTransactions.push(this.currentTransactions[x]);
		}
		for(let x=this.transactions.length-1;x>=0;x--){
			tempTransactions.push(this.transactions[x]);
		}
		this.currentTransactions = tempcurrentTransactions;
		this.transactions = tempTransactions;
		console.log('post reverse',this.currentTransactions,this.transactions);
	}

	presentPopover(event) {
		let popover = this.popoverCtrl.create(PopoverPage,);
		popover.present({
			ev: event
		});
		popover.onDidDismiss(data => {
			if(data == 'sort'){
				this.sortTransactions();
			}
		})
	}


}
