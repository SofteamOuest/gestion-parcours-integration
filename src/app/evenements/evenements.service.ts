import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../messages/message.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Evenement} from './evenement';
import {PersonnesService} from '../personnes/personnes.service';
import {Personne} from '../personnes/personne';
import {ResourceService} from '../services/ressource.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EvenementsService {

  listeEvenement: Evenement[];

  constructor(private messageService: MessageService, private http: HttpClient, private personneService: PersonnesService,
              private resource: ResourceService) {
  }


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
          this.personneService.getPersonneById(event).subscribe(p => {
            personne = p;
          }).unsubscribe();
          events[event].forEach(function (value) {
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
        this.messageService.openMessage('Impossible de charger la liste des evenements');
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
        console.log('Getting EvenementPersonne by #id' + id);
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
        console.log('Error on getting EvenementPersonne by #id' + id);
        this.messageService.openMessage('Erreur lors de la récupération des événements : ' + err.toString());
      }
    );
    return events;
  }


  updateEvenement(evenement: Evenement) {
    let personne = evenement.personne;
    delete evenement.personne; // On enlève l'aggregation de la personne à l'evenement pour le passer comme attendu dans l'API
    let headers = this.resource.putResourceHeaders();
    this.http.put('/api-evenement/evenement/' + evenement.idEvenement, evenement, {headers: headers}).subscribe(events => {
        this.messageService.openMessage('L\'événement a bien été mis à jour');
        evenement.personne = personne;
      }, err => {
        this.messageService.openMessage('Erreur lors de la validation de l\'évenement');
      }
    );
  }

  createEvenementGenerique(personne: Personne) {
    let headers = this.resource.postResourceHeaders();
    console.log(personne);
    this.http.post('/api-evenement/evenement/', {
      idPersonne: personne.id,
      dateArrivee: personne.date_debut_contrat
    }, {headers: headers}).subscribe(events => {
        console.log(events);
        this.messageService.openMessage('La création des événements génériques a bien été faite');
      }, err => {
        this.messageService.openMessage('Erreur lors de la validation de l\'évenement');
      }
    );
  }

  createEvenementVisiteMedical(personne: Personne) {

  }


  addAnniversairePersonne(): Evenement {
    console.log(this.personneService.getPersonnes());

    return new Evenement();
  }
}
