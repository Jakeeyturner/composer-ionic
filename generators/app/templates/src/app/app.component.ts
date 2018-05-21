import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { PlatformService } from './services/platform.service';
import { Toast } from '@ionic-native/toast';
import { HomePage } from './pages/home/home.component';
import { SettingsPage } from './pages/settings/settings.component';
import { AssetsPage } from './pages/assets/assets.component';
import { ParticipantsPage } from './pages/participants/participants.component';
import { TransactionsPage } from './pages/transactions/transactions.component';
import 'rxjs/Rx';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = HomePage;
	testDiv: string = "";
	testError: string = "";
	pages: Array<{title: string, component: any}>;

	constructor(
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public network: Network,
		public toast: Toast,
		public platformService: PlatformService,
		private storage: Storage
	){
		this.initializeApp();

		this.pages = [
			{ title: 'Home', component: HomePage },
			{ title: 'Assets', component: AssetsPage },
			{ title: 'Participants', component: ParticipantsPage },
			{ title: 'Transactions', component: TransactionsPage },
			{ title: 'Settings', component: SettingsPage }
		];



	}

	initializeApp(){
		this.platform.ready().then(() => {
			this.storage.ready().then(() => {
				this.storage.length().then((number) => {
					if(number == 0){
						this.storage.set("apiURL","<%= apiIP %>:<%= apiPort %>/api/")
					}
				})

				this.platformService.setConnection(this.network.type);
				// We can only use native mobile apis on devices (not when serving in a web browser)
				if(this.platformService.isDevice()){

					this.statusBar.styleDefault();
					this.splashScreen.hide();

					this.network.onDisconnect().subscribe(() => {
						this.toast.show('Disconnected from Network', '3000', 'bottom').subscribe(
							toast => {
								this.platformService.setConnection(this.network.type);
							}
						);

					});

					this.network.onConnect().subscribe(() => {
						this.toast.show('Reconnected to Network', '3000', 'bottom').subscribe(
							toast => {
								this.platformService.setConnection(this.network.type);
							}
						);
					});
				}

			});

		});
	}

	openPage(page){
		this.nav.setRoot(page.component);
	}
}
