import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
<% for(var x=0;x<participantList.length;x++){ %>
  import { <%= participantList[x].name %>Page } from '../participants/<%= participantList[x].name %>/<%= participantList[x].name %>.component';<% } %>
@Component({
  selector: 'page-participants',
  templateUrl: 'participants.component.html'
})
export class ParticipantsPage {
  participantList: any[] = [<% for(var x=0;x<participantList.length;x++){ %><% if(x == participantList.length-1){%>{'name':'<%= participantList[x].name %>','component':<%= participantList[x].name %>Page}<%}else{%>{'name':'<%= participantList[x].name %>','component':<%= participantList[x].name %>Page},<%}} %>];
  constructor(public navCtrl: NavController){

  }

  participantTapped(event, participant) {
    this.navCtrl.push(participant.component);
  }
}
