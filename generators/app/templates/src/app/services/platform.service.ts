import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';

@Injectable()
export class PlatformService {
	connection: boolean;
	constructor(public platform: Platform, public events: Events){}

	isConnected(){
		return this.connection;
	}

	setConnection(connection){
		if(this.isDevice()){
			if(connection != null && connection != 'none'){
				this.connection = true;
			}
			else{
				this.connection = false;
			}
		}
		else{
			//If we are serving the app in a web browser using 'ionic serve', we cannot detect the connection status.
			//Therefore we will assume it always connected to the network and can access our REST API.

			this.connection = true;
		}

		this.events.publish('connection',this.isConnected());

	}

	isDevice(){
		if(!this.platform.is('core') && !this.platform.is('mobileweb')){
			return true;
		}
		else{
			return false;
		}
	}
}
