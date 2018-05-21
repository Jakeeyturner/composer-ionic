import { Component } from '@angular/core';
import { ViewController, LoadingController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { <%= transactionName %>Service } from '../../../services/transactions/<%=transactionName %>/<%=transactionName %>.service';

@Component({
	selector: 'form-<%= transactionName %>',
	templateUrl: '<%= transactionName %>.form.component.html'
})

export class <%= transactionName %>Form {

	transactionType: string;
	properties: any[];
	formType: string;
	error: string;
	form: FormGroup;

	constructor(
		public service<%=transactionName%>: <%=transactionName%>Service,
		public viewCtrl: ViewController,
		public navParams: NavParams,
		private formBuilder: FormBuilder,
		public loadingCtrl: LoadingController
	){
		this.transactionType = navParams.get('transactionType');
		this.properties = navParams.get('properties');

		this.formType = navParams.get('formType');
		this.form = this.formBuilder.group({
			<%_ for(let x=0;x<properties.length;x++){ _%>
				<%_ if(properties[x].name != transactionIdentifier){ -%>
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
			<%_}-%>
		});
	}

	addTransaction(){
		let loading = this.loadingCtrl.create({
			content: 'Adding <%= transactionName %>...'
		});
		loading.present();

		this.service<%=transactionName%>.add(this.form.value).then((response) =>{

			this.viewCtrl.dismiss({'response':response,'loading':loading});
		}).catch((error) => {

			loading.dismiss();
			let parsedError = JSON.parse(error._body);
			this.error = parsedError.error.message;
		});
	}

	getProperties(){
		return this.properties.filter((property) => {
			return property.name != '<%=transactionIdentifier%>'
		});
	}

	dismiss(){
		this.viewCtrl.dismiss();
	}

}
