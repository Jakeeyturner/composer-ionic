import { Component } from '@angular/core';
import { LoadingController, ViewController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'page-transaction-view',
	templateUrl: 'transaction-view.component.html'
})

export class TransactionViewPage {

	transactionId: string = "";
	transactionType: string = "";
	loadedTransaction: any;
	loadedTransactionKeys: string[] = [];

	loading: any;
	constructor(
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public dataService: DataService,
		public loadingCtrl: LoadingController
	){
		this.transactionId = navParams.get('transactionId');
		this.transactionType = navParams.get('transactionType');
	}

	ionViewWillEnter(): any {

		this.loading = this.loadingCtrl.create({
			content: 'Fetching '.concat(this.transactionId)
		});
		this.loading.present();
		return this.getTransaction().then((transaction) => {
			this.loadedTransaction = transaction;
			this.loadedTransactionKeys = Object.keys(transaction);
			this.loadedTransactionKeys.splice(0,1); // No need to show $class
			this.loading.dismiss();
		});

	}

	getTransaction(): Promise<any> {
		return this.dataService.get(this.transactionType,this.transactionId);
	}

	dismiss(){
		this.viewCtrl.dismiss();
	}
}
