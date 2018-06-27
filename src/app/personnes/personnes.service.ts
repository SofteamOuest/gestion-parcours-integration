import {Injectable} from '@angular/core';
import {Personne} from './personne';
import {Observable, of} from 'rxjs';
import {MessageService} from '../messages/message.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ResourceService} from '../services/ressource.service';
import {EvenementsService} from '../evenements/evenements.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonnesService {


  page = 1;
  offset = 18;
  trigger = 10;

  constructor(private messageService: MessageService, private http: HttpClient, private resource: ResourceService) {
    // this.messageService.openMessage('Test');
  }


  eventScroll() {
    const listePersonne = this.getPersonnes();
    if (innerHeight + window.scrollY >= document.body.offsetHeight - this.trigger) {
      listePersonne.subscribe(personnes => {
        if (personnes.length === this.page * this.offset) {
          this.page++;
          this.getPersonnes();
        }
      });
    }
  }

  getPersonnes(): Observable<Personne[]> {
    let lp: Personne[] = [];
    const headers = this.resource.getResourceHeaders();
    let params = new HttpParams();
    params.set('_page', this.page.toString()).set('_limit', this.offset.toString()).set('_sort', 'nom');
    this.http.get<Personne[]>('/api-personne/personnes', {params: params}).subscribe(personnes => {
        for (let i = 0; i < personnes.length; i++) {
          lp[i] = personnes[i];
        }
      }, err => {
        this.messageService.openMessage('Impossible de charger la liste du personnel');
      }, () => {
        lp.sort(function (a, b) {
          if (a.nom.toUpperCase() < b.nom.toUpperCase()) return -1;
          if (a.nom.toUpperCase() > b.nom.toUpperCase()) return 1;
          return 0;
        });
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
        p.periode_essai_validee = personne.periode_essai_validee;
        p.est_manager = personne.est_manager;
        p.manager_id = personne.manager_id;
      }, err => {
        this.messageService.openMessage('Impossible de charger les informations de la personne : ' + id);
      }, () => {
        // console.log('ok');
      }
    );
    return of(p);
  }

  addPersonne(personne: Personne): Observable<Personne> {
    const headers = this.resource.putResourceHeaders();
    return this.http.put<Personne>('/api-personne/personnes/add', personne, {headers: headers});
  }


  update(personne: Personne): Observable<Personne> {
    const headers = this.resource.putResourceHeaders();
    return this.http.put<Personne>('/api-personne/personnes/update', personne, {headers: headers});
  }
}
