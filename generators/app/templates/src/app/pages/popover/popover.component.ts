import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
	selector: 'page-popover',
	templateUrl: 'popover.component.html'
})

export class PopoverPage {
	constructor(public viewCtrl: ViewController) {}

	close() {
		this.viewCtrl.dismiss();
	}
	sort(){
		this.viewCtrl.dismiss('sort');
	}
  }
