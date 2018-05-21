import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from './pages/home/home.component';
import { AssetsPage } from './pages/assets/assets.component';
import { AssetViewPage } from './pages/asset-view/asset-view.component';
import { ParticipantsPage } from './pages/participants/participants.component';
import { ParticipantViewPage } from './pages/participant-view/participant-view.component';
import { TransactionsPage } from './pages/transactions/transactions.component';
import { TransactionViewPage } from './pages/transaction-view/transaction-view.component';
import { PopoverPage } from './pages/popover/popover.component';
import { SettingsPage } from './pages/settings/settings.component';
import { DataService } from './services/data.service';
import { PlatformService } from './services/platform.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';

// Import types generated from model
<% for(var x=0;x<namespaceList.length;x++){ let namespace=namespaceList[x].toUpperCase().replace(/\./g, "_");%>
import * as <%=namespace%> from './<%=namespaceList[x] %>';<% } %>

// Import asset components generated from model
<% for(var x=0;x<assetList.length;x++){ %>
import { <%= assetList[x].name %>Page } from './pages/assets/<%= assetList[x].name %>/<%= assetList[x].name %>.component';
import { <%= assetList[x].name %>Form } from './pages/assets/<%= assetList[x].name %>/<%= assetList[x].name %>.form.component';
<% } %>

// Import participant components generated from model
<% for(var x=0;x<participantList.length;x++){ %>
import { <%= participantList[x].name %>Page } from './pages/participants/<%= participantList[x].name %>/<%= participantList[x].name %>.component';
import { <%= participantList[x].name %>Form } from './pages/participants/<%= participantList[x].name %>/<%= participantList[x].name %>.form.component';
<% } %>

// Import transaction components generated from model
<% for(var x=0;x<transactionList.length;x++){ %>
import { <%= transactionList[x].name %>Page } from './pages/transactions/<%= transactionList[x].name %>/<%= transactionList[x].name %>.component';
import { <%= transactionList[x].name %>Form } from './pages/transactions/<%= transactionList[x].name %>/<%= transactionList[x].name %>.form.component';
<% } %>

// Import asset services generated from model
<% for(var x=0;x<assetServiceNames.length;x++){ %>
import { <%= assetServiceNames[x] %> } from './services/assets/<%= assetList[x].name %>/<%= assetList[x].name %>.service';<% } %>

// Import participant services generated from model
<% for(var x=0;x<participantServiceNames.length;x++){ %>
import { <%= participantServiceNames[x] %> } from './services/participants/<%= participantList[x].name %>/<%= participantList[x].name %>.service';<% } %>

// Import transaction services generated from model
<% for(var x=0;x<transactionServiceNames.length;x++){ %>
import { <%= transactionServiceNames[x] %> } from './services/transactions/<%= transactionList[x].name %>/<%= transactionList[x].name %>.service';<% } %>

@NgModule({
	declarations: [
		MyApp,
		SettingsPage,
		HomePage,
		AssetsPage,
		AssetViewPage,
		ParticipantsPage,
		ParticipantViewPage,
		TransactionsPage,
		TransactionViewPage,
		PopoverPage,
		<% for(var x=0;x<assetList.length;x++){ %>
			<%= assetList[x].name %>Page,
		<% } %>
		<% for(var x=0;x<assetList.length;x++){ %>
			<%= assetList[x].name %>Form,
		<% } %>
		<% for(var x=0;x<participantList.length;x++){ %>
			<%= participantList[x].name %>Page,
		<% } %>
		<% for(var x=0;x<participantList.length;x++){ %>
			<%= participantList[x].name %>Form,
		<% } %>
		<% for(var x=0;x<transactionList.length;x++){ %>
			<%= transactionList[x].name %>Page,
		<% } %>
    	<% for(var x=0;x<transactionList.length;x++){ %><% if(x == transactionList.length-1){ %>
			<%= transactionList[x].name %>Form<%}else{%><%= transactionList[x].name %>Form,<% } %>
		<% } %>
  	],
  	imports: [
    	HttpModule,
    	BrowserModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
  	],
  	bootstrap: [IonicApp],
  	entryComponents: [
		MyApp,
		SettingsPage,
    	HomePage,
		AssetsPage,
		AssetViewPage,
		ParticipantsPage,
		ParticipantViewPage,
		TransactionsPage,
		TransactionViewPage,
		PopoverPage,
    	<% for(var x=0;x<assetList.length;x++){ %>
			<%= assetList[x].name %>Page,
		<% } %>
		<% for(var x=0;x<assetList.length;x++){ %>
			<%= assetList[x].name %>Form,
		<% } %>
		<% for(var x=0;x<participantList.length;x++){ %>
			<%= participantList[x].name %>Page,
		<% } %>
		<% for(var x=0;x<participantList.length;x++){ %>
			<%= participantList[x].name %>Form,
		<% } %>
		<% for(var x=0;x<transactionList.length;x++){ %>
			<%= transactionList[x].name %>Page,
		<% } %>
    	<% for(var x=0;x<transactionList.length;x++){ %><% if(x == transactionList.length-1){ %>
			<%= transactionList[x].name %>Form<%}else{%><%= transactionList[x].name %>Form,<% } %>
		<% } %>
  	],
  	providers: [
		Geolocation,
    	StatusBar,
		SplashScreen,
		Network,
		Toast,
		DataService,
		PlatformService,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		<% for(var x=0;x<assetServiceNames.length;x++){ %>
			<%= assetServiceNames[x] %>,
		<% } %>
		<% for(var x=0;x<participantServiceNames.length;x++){ %>
			<%= participantServiceNames[x] %>,
		<% } %>
		<% for(var x=0;x<transactionServiceNames.length;x++){ %><% if(x == transactionServiceNames.length-1){ %>
		<%= transactionServiceNames[x] %><%}else{%><%= transactionServiceNames[x] %>,<% } %>
		<% } %>
  	]
})
export class AppModule {}
