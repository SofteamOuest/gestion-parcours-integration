import {Injectable} from '@angular/core';
import {Personne} from './personne';
import {Observable, of} from 'rxjs';
import {MessageService} from '../messages/message.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonnesService {

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getPersonnes(): Observable<Personne[]> {
    let lp: Personne[] = [];
    this.http.get<Personne[]>('/api-personne/personnes').subscribe(personnes => {
        for (let i = 0; i < personnes.length; i++) {
          lp[i] = personnes[i];
        }
      }, err => {
        this.messageService.add('Impossible de charger la liste du personnel');
      }, () => {
        // console.log('ok');
      }
    );
    return of(lp);
  }

  getPersonneById(id: string): Observable<Personne> {
    const p = new Personne();
    this.http.get<Personne>('/api-personne/personnes/' + id).subscribe(personne => {
        p.id = personne.id;
        p.nom = personne.nom;
        p.prenom = personne.prenom;
        p.date_de_naissance = personne.date_de_naissance;
        p.photo = personne.photo;
        p.mail_pro = personne.mail_pro;
        p.mail_perso = personne.mail_perso;
        p.tel_pro = personne.tel_pro;
        p.tel_perso = personne.tel_perso;
        p.poste = personne.poste;
        p.date_debut_contrat = personne.date_debut_contrat;
        p.date_visite_medical = personne.date_visite_medical;
      }, err => {
        this.messageService.add('Impossible de charger les informations de la personne : ' + id);
      }, () => {
        // console.log('ok');
      }
    );
    return of(p);
  }


}
