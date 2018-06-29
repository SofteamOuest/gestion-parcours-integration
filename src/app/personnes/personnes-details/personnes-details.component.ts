import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Personne} from '../personne';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-personnes-details',
  templateUrl: './personnes-details.component.html',
  styleUrls: ['./personnes-details.component.css']
})
export class PersonnesDetailsComponent implements OnInit {

  dialogHeader: String;
  @Output() personne: Personne;
  @Input() errorStateMatcher: ErrorStateMatcher;
  personneForm: FormGroup;
  periode_essai_disabled: boolean;
  dateDeNaissance: any;
  dateDeDebutContrat: any;
  dateDeVisiteMedical: any;
  listeManager: Personne[];

  constructor(
    public dialogRef: MatDialogRef<PersonnesDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {

    this.dialogHeader = this.data.header;
    this.data.personne.periode_essai_validee = this.data.personne.periode_essai_validee == null ? false : true;
    this.data.personne.est_manager = this.data.personne.est_manager == null ? false : this.data.personne.est_manager;
    this.listeManager = this.data.listeManager;
    this.personne = this.data.personne;
    this.dateDeNaissance = this.personne.date_de_naissance ? moment(this.personne.date_de_naissance, 'DD/MM/YYYY').toDate() : '';
    this.dateDeDebutContrat = this.personne.date_debut_contrat ? moment(this.personne.date_debut_contrat, 'DD/MM/YYYY').toDate() : '';
    this.dateDeVisiteMedical = this.personne.date_visite_medicale ? moment(this.personne.date_visite_medicale, 'DD/MM/YYYY').toDate() : '';
    this.personne.manager_id = this.personne.manager_id ? this.personne.manager_id : null;
    this.setPeriodeDessai();
    console.log('Getting information from #personne:');
    console.log(this.personne);

    this.personneForm = new FormGroup({
      'nom': new FormControl(this.personne.nom, [
        Validators.required, Validators.pattern(this.acceptString())
      ]),
      'prenom': new FormControl(this.personne.prenom, [
        Validators.required, Validators.pattern(this.acceptString())
      ]),
      'date_de_naissance': new FormControl(this.personne.date_de_naissance, [
        Validators.required,
        this.dateNaissanceValidator()
      ]),
      'date_debut_contrat': new FormControl(this.personne.date_debut_contrat, [
        Validators.required
      ]),
      'mail_pro': new FormControl(this.personne.mail_pro, [
        Validators.email
      ]),
      'mail_perso': new FormControl(this.personne.mail_perso, [
        Validators.email
      ]),
      'tel_pro': new FormControl(this.personne.tel_pro, [
        Validators.pattern(this.acceptTelephone())
      ]),
      'tel_perso': new FormControl(this.personne.tel_perso, [
        Validators.pattern(this.acceptTelephone())
      ]),
      'manager': new FormControl(this.personne.manager_id, [])
    });
  }

  onSubmit() {
    if (this.personneForm.valid) {
      console.log(this.dateDeVisiteMedical);
      this.personne.date_de_naissance = moment(this.dateDeNaissance).format('DD/MM/YYYY');
      this.personne.date_debut_contrat = moment(this.dateDeDebutContrat).format('DD/MM/YYYY');
      this.personne.date_visite_medicale = moment(this.dateDeVisiteMedical).format('DD/MM/YYYY');

      this.dialogRef.close(this.personne);
      console.log(this.personne);
    } else {
      this.valideForm(this.personneForm);
    }
  }

  valideForm(form: FormGroup) {
    Object.keys(form.controls).forEach(champ => {
      const control = form.get(champ);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.valideForm(control);
      }
    });
  }

  acceptString(): RegExp {
    return new RegExp(/^[\D]+$/);
  }

  acceptTelephone(): RegExp {
    return new RegExp(/^[\d]{10}/);
  }

  get nom() {
    return this.personneForm.get('nom');
  }

  get prenom() {
    return this.personneForm.get('prenom');
  }

  get dateNaissance() {
    return this.personneForm.get('date_de_naissance');
  }

  get dateDebutContrat() {
    return this.personneForm.get('date_debut_contrat');
  }

  get mailPro() {
    return this.personneForm.get('mail_pro');
  }

  get mailPerso() {
    return this.personneForm.get('mail_perso');
  }

  get telPro() {
    return this.personneForm.get('tel_pro');
  }

  get telPerso() {
    return this.personneForm.get('tel_perso');
  }

  get managerId() {
    return this.personneForm.get('manager');
  }

  setPeriodeDessai() {
    const debut_contrat = moment(this.dateDeDebutContrat);
    this.periode_essai_disabled = debut_contrat > moment().subtract(3, 'months') || !debut_contrat.isValid();
  }

  dateNaissanceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const date_naissance = control.value; // Date Object
      const current_date = new Date();
      if (date_naissance !== null && (isNaN(date_naissance) || moment(date_naissance).isAfter(moment().subtract(18, 'years')))) {
        return {'dateNonExpected': true};
      }
      return null;
    };
  }

  setEstManager($event, personne: Personne) {
    personne.est_manager = $event.checked;
    personne.manager_id = $event.checked ? '' : personne.manager_id;
  }


}
