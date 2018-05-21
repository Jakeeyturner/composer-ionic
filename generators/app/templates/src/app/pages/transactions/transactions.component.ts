import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
<% for(var x=0;x<transactionList.length;x++){ %>
import { <%= transactionList[x].name %>Page } from '../transactions/<%= transactionList[x].name %>/<%= transactionList[x].name %>.component';<% } %>
@Component({
	selector: 'page-transactions',
	templateUrl: 'transactions.component.html'
})
export class TransactionsPage {
	transactionList: any[] = [<% for(var x=0;x<transactionList.length;x++){ %><% if(x == transactionList.length-1){%>{'name':'<%= transactionList[x].name %>','component':<%= transactionList[x].name %>Page}<%}else{%>{'name':'<%= transactionList[x].name %>','component':<%= transactionList[x].name %>Page},<%}} %>];
	constructor(public navCtrl: NavController){

  }

  transactionTapped(event, transaction) {
    this.navCtrl.push(transaction.component);
  }
}
