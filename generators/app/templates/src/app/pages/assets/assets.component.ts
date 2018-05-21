import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
<% for(var x=0;x<assetList.length;x++){ %>
  import { <%= assetList[x].name %>Page } from '../assets/<%= assetList[x].name %>/<%= assetList[x].name %>.component';<% } %>
@Component({
  selector: 'page-assets',
  templateUrl: 'assets.component.html'
})
export class AssetsPage {
  assetList: any[] = [<% for(var x=0;x<assetList.length;x++){ %><% if(x == assetList.length-1){%>{'name':'<%= assetList[x].name %>','component':<%= assetList[x].name %>Page}<%}else{%>{'name':'<%= assetList[x].name %>','component':<%= assetList[x].name %>Page},<%}} %>];
  constructor(public navCtrl: NavController){

  }

  assetTapped(event, asset) {
    this.navCtrl.push(asset.component);
  }
}
