import {Component, OnInit} from '@angular/core';
import {Personne} from './personne';
import {HttpClient} from '@angular/common/http';
import {PersonnesService} from './personnes.service';
import {EvenementsService} from '../evenements/evenements.service';
import {PersonnesDetailsComponent} from './personnes-details/personnes-details.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-personnes',
  templateUrl: './personnes.component.html',
  styleUrls: ['./personnes.component.css']
})
export class PersonnesComponent implements OnInit {

  liste_personnes: Personne[] = [];

  selectedPersonne: Personne;

  constructor(private http: HttpClient, private personneService: PersonnesService, private evenementService: EvenementsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getPersonnes();

  }

  getPersonnes() {
    this.personneService.getPersonnes().subscribe(personnes => this.liste_personnes = personnes);
  }

  getPersonnesById(id: string) {
    this.personneService.getPersonneById(id);
  }

  onSelectPersonne(personne: Personne) {
    this.selectedPersonne = personne;
    this.selectedPersonne.evenements = this.evenementService.getEvenementsByPersonneId(personne.id);
  }


  showDetailPersonne(personne: any) {
    let header: string;
    if (personne != null) {
      // console.log(personne);
      header = 'Modification des informations de ' + personne.prenom + ' ' + personne.nom + ' :';
    } else {
      header = 'Ajout d\'une personne : ';
      personne = new Personne();
    }

    let dialogRef = this.dialog.open(PersonnesDetailsComponent, {
      hasBackdrop: true,
      width: '900px',
      height: 'auto',
      disableClose: true,
      data: {
        header: header,
        personne: personne
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }


}
