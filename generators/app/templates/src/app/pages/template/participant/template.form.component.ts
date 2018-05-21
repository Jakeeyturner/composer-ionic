import { Component } from '@angular/core';
import { ViewController, LoadingController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { <%= participantName %>Service } from '../../../services/participants/<%=participantName %>/<%=participantName %>.service';

@Component({
	selector: 'form-<%= participantName %>',
	templateUrl: '<%= participantName %>.form.component.html'
})

export class <%= participantName %>Form {

	participantId: string;
	participantType: string;
	properties: any[];
	formType: string;
	error: string;
	participantIdentifierProperty: string = "<%=participantIdentifier%>"
	form: FormGroup;

	constructor(
		public service<%=participantName%>: <%=participantName%>Service,
		public viewCtrl: ViewController,
		public navParams: NavParams,
		private formBuilder: FormBuilder,
		public loadingCtrl: LoadingController
	){
		this.participantId = navParams.get('participantId');
		this.participantType = navParams.get('participantType');
		this.properties = navParams.get('properties');

		this.formType = navParams.get('formType');
		this.form = this.formBuilder.group({
			<%_ for(let x=0;x<properties.length;x++){ _%>
				<%_ if(x == properties.length-1){ -%>
					<%_ if(properties[x].optional == false){ -%>
			<%= properties[x].name -%>:[{disabled: false}, Validators.required]
					<%_}else{-%>
			<%= properties[x].name -%>:[{disabled: false}]
					<%_}-%>
				<%_}else{-%>
					<%_ if(properties[x].optional == false){ -%>
			<%= properties[x].name -%>:[{disabled: false}, Validators.required],
					<%_}else{-%>
			<%= properties[x].name -%>:[{disabled: false}],
					<%_}-%>
				<%_}-%>
			<%_}-%>
		});
	}

	ionViewWillEnter(){
		if(this.formType == 'Update'){
			let loading = this.loadingCtrl.create({
				content: 'Fetching '.concat(this.participantId)
			});
			loading.present();
			return this.service<%= participantName %>.get(this.participantId).then((participant) => {
				let retrievedParticipant = participant;
				delete retrievedParticipant['$class'];
				this.form.setValue(participant);
				let disabledIdentifier = this.form.get('<%=participantIdentifier%>');
				disabledIdentifier.disable();

				loading.dismiss();
			})
		}
		else{
			let enabledIdentifier = this.form.get('<%=participantIdentifier%>');
			enabledIdentifier.enable();
		}
	}

	submit(){
		if(this.formType == 'Add'){
			this.addParticipant();
		}
		if(this.formType == 'Update'){
			this.updateParticipant()
		}
	}

	addParticipant(){
		let loading = this.loadingCtrl.create({
			content: 'Adding <%= participantName %>...'
		});
		loading.present();
		let participantIdValue = this.form.value[this.participantId];

		this.service<%=participantName%>.add(this.form.value).then(() =>{

			this.viewCtrl.dismiss({'participantId':participantIdValue,'loading':loading});
		}).catch((error) => {
			//error.toString();
			loading.dismiss();
			let parsedError = JSON.parse(error._body);
			this.error = parsedError.error.message;
		});
	}

	updateParticipant(){
		let loading = this.loadingCtrl.create({
			content: 'Updating <%= participantName %>...'
		});
		loading.present();

		// We need to enable the identifier field in order to access the value.
		let disabledIdentifier = this.form.get('<%=participantIdentifier%>');
		disabledIdentifier.enable();

		this.service<%=participantName%>.update(disabledIdentifier.value, this.form.value).then(() =>{
			this.viewCtrl.dismiss({'participantId':disabledIdentifier.value,'loading':loading});
		}).catch((error) => {
			loading.dismiss();
			let parsedError = JSON.parse(error._body);
			this.error = parsedError.error.message;
		})
	}

	dismiss(){
		this.viewCtrl.dismiss();
	}

}
