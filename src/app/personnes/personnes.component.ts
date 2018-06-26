import {Component, OnInit} from '@angular/core';
import {Personne} from './personne';
import {HttpClient} from '@angular/common/http';
import {PersonnesService} from './personnes.service';
import {EvenementsService} from '../evenements/evenements.service';
import {PersonnesDetailsComponent} from './personnes-details/personnes-details.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MessageService} from '../messages/message.service';

@Component({
  selector: 'app-personnes',
  templateUrl: './personnes.component.html',
  styleUrls: ['./personnes.component.css']
})
export class PersonnesComponent implements OnInit {

  liste_personnes: Personne[] = [];
  selectedPersonne: Personne;

  constructor(private http: HttpClient, private personneService: PersonnesService, private evenementService: EvenementsService, private dialog: MatDialog, private messageService: MessageService) {
  }

  ngOnInit() {
    this.getPersonnes();
    this.scroll();
  }

  getPersonnes() {
    this.personneService.getPersonnes().subscribe(personnes => this.liste_personnes = personnes);
  }

  scroll() {
    window.onscroll = ev => {
      this.personneService.eventScroll();
    };
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
    let typeControle: string;
    if (personne != null) {
      typeControle = 'update';
      header = 'Modification des informations de ' + personne.prenom + ' ' + personne.nom + ' :';
    } else {
      typeControle = 'add';
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

    dialogRef.afterClosed().subscribe(personne => {
      if (personne !== undefined && typeControle === 'add') {
        this.personneService.addPersonne(personne).subscribe(p => {

          this.messageService.succesToastr('La personne a bien été ajoutée');
          this.evenementService.createEvenementGenerique(p);
          this.liste_personnes.push(p);
        });
      } else if (personne !== undefined && typeControle === 'update') {
        this.personneService.update(personne).subscribe(p => {
            this.messageService.succesToastr('La personne a bien été modifiée');
          }
        );
      }
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }


}
