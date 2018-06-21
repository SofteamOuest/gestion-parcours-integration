import {Component, OnInit} from '@angular/core';
import {Evenement} from './evenement';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {EvenementsService} from './evenements.service';


@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.css']
})
export class EvenementsComponent implements OnInit {

  liste_evenement: Evenement[];

  constructor(private http: HttpClient, private evenementService: EvenementsService) {
  }

  ngOnInit() {
    this.getEvenements();
  }

  getEvenementsDuMois() {
    let evenements_courant = this.liste_evenement.filter(function (item) {
      let date_item = moment(item.dateEvenement, 'DD/MM/YYYY');
      return date_item.month() === moment().month();
    });
    return evenements_courant;
  }

  getEvenementsFutur() {
    let evenement_futur = this.liste_evenement.filter(function (item) {
      let date_item = moment(item.dateEvenement, 'DD/MM/YYYY');
      return date_item.month() > moment().month();
    });
    return evenement_futur;
  }

  setDateValidation(evenement) {
    let event = this.liste_evenement.filter(function (item) {
      return item.idEvenement === evenement.idEvenement;
    })[0];
    event = this.evenementService.setDateValidation(evenement);
  }

  setBtValiderEnabled(event: Evenement) {
    return this.evenementService.enableBtValider(event);
  }

  getEvenements() {
    this.evenementService.getAllEvenements().subscribe(events => this.liste_evenement = events);
  }


}
