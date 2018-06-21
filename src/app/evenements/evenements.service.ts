import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../messages/message.service';
import {Observable, of} from 'rxjs';
import {Evenement} from './evenement';
import {PersonnesService} from '../personnes/personnes.service';
import {Personne} from '../personnes/personne';
import {ResourceService} from '../services/ressource.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EvenementsService {

  constructor(private messageService: MessageService, private http: HttpClient, private personneService: PersonnesService,
              private resource: ResourceService) {}

  enableBtValider(evenement) {
    // Si la date du jour est égale ou supérieur à la date de l'évenement alors le boutton est actif
    return moment(evenement.dateEvenement, 'DD/MM/YYYY') <= moment();
  }

  setDateValidation(evenement) {
    evenement.dateValidation = moment().format('DD/MM/YYYY');
    this.updateEvenement(evenement);
    return evenement;
  }

  getAllEvenements(): Observable<Evenement[]> {
    let le: Evenement[] = [];

    this.http.get('/api-evenement/evenement').subscribe(events => {
        for (let event in events) {
          let personne: Personne;
          this.personneService.getPersonneById(event).subscribe(p => personne = p);
          events[event].forEach(function (value) {
            // console.log(value);
            let evenement = new Evenement();
            evenement.idEvenement = value.idEvenement;
            evenement.nom = value.nom;
            evenement.description = value.description;
            evenement.dateEvenement = value.dateEvenement;
            evenement.dateValidation = value.dateValidation;
            evenement.type = value.type;
            evenement.cycle = value.cycle;
            evenement.valeurRecurrence = value.valeurRecurrence;
            evenement.typeRecurrence = value.typeRecurrence;
            evenement.personne = personne;
            le.push(evenement);
          });
        }
      }, err => {
        this.messageService.add('Impossible de charger la liste des evenements');
      }, () => {
        le.sort((a, b) => {
          let date_a = moment(a.dateEvenement, 'DD/MM/YYYY');
          let date_b = moment(b.dateEvenement, 'DD/MM/YYYY');
          return date_a.isBefore(date_b) ? -1 : date_b.isBefore(date_a) ? 1 : 0;
        });
      }
    );

    return of(le);
  }

  getEvenementsByPersonneId(id: string) {
    let events: Evenement[] = [];
    this.http.get<Evenement[]>('/api-evenement/evenement/personne/' + id).subscribe(evenements => {
        evenements.forEach(function (value) {
          // console.log(value);
          let evenement = new Evenement();
          evenement.idEvenement = value.idEvenement;
          evenement.nom = value.nom;
          evenement.description = value.description;
          evenement.dateEvenement = value.dateEvenement;
          evenement.dateValidation = value.dateValidation;
          evenement.type = value.type;
          evenement.cycle = value.cycle;
          evenement.valeurRecurrence = value.valeurRecurrence;
          evenement.typeRecurrence = value.typeRecurrence;
          evenement.personne = null;
          events.push(value);
        });
      }, err => {
        this.messageService.add('Erreur lors de la récupération des événements : ' + err.toString());
      }, () => {
        console.log('ok');
      }
    );
    return events;
  }


  updateEvenement(evenement: Evenement) {
    delete evenement.personne;
    let headers = this.resource.putResourceHeaders();
    this.http.put('/api-evenement/evenement/' + evenement.idEvenement, evenement, {headers: headers}).subscribe(events => {
        this.messageService.add('L\'evenement a bien été mis à jour');
      }, err => {
        this.messageService.add('Erreur lors de la validation de l\'évenement');
      }
    );
  }

}
