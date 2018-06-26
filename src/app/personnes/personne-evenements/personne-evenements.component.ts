import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Personne} from '../personne';
import {HttpClient} from '@angular/common/http';
import {EvenementsService} from '../../evenements/evenements.service';
import {EvenementsComponent} from '../../evenements/evenements.component';
import {Evenement} from '../../evenements/evenement';

@Component({
  selector: 'app-personne-evenements',
  templateUrl: './personne-evenements.component.html',
  styleUrls: ['./personne-evenements.component.css']
})

export class PersonneEvenementsComponent implements OnInit, OnChanges {
  @Input() personne: Personne;

  count_next = 0;

  constructor(private http: HttpClient, private evenementService: EvenementsService) {
  }

  ngOnInit() {
  }


  ngOnChanges() {
    if (this.personne) {
      setTimeout(this.setBtNavEnabled(), 5000);
      //this.setBtNavEnabled();
      // console.log(this.personne);
    }
  }

  setBtNavEnabled() {
    let evenements = this.personne.evenements;
    if (this.personne.evenements.length >= 2) {
      let arrow_next = document.querySelector('.arrow__next');
      console.log(arrow_next);
    }
  }

  setBtValiderEnabled(event: Evenement) {
    return this.evenementService.enableBtValider(event);
  }

  setDateValidation(evenement) {
     return evenement = this.evenementService.setDateValidation(evenement);
  }
}
