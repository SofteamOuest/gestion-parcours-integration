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

  header: String;
  @Output() personne: Personne;
  @Input() errorStateMatcher: ErrorStateMatcher;
  personneForm: FormGroup;
  periode_essai_disabled: boolean;

  constructor(
    public dialogRef: MatDialogRef<PersonnesDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {

    this.header = this.data.header;
    this.data.personne.periode_essai_valide = this.data.personne.periode_essai_valide == null ? false : true;
    this.personne = this.data.personne;

    this.setPeriodeDessai();
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
      ])
    });
  }

  onSubmit() {
    if (this.personneForm.valid) {
      this.dialogRef.close(this.personne);
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

  setPeriodeDessai() {
    console.log(this.personne.date_debut_contrat);
    this.periode_essai_disabled = (moment(this.personne.date_debut_contrat) > moment().subtract(3, 'months') || this.personne.date_debut_contrat == null);
  }

  dateNaissanceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let date_naissance = control.value; // Date Object
      let current_date = new Date();
      if (date_naissance !== null && (isNaN(date_naissance) || moment(date_naissance).get('years') >= moment().subtract(18, 'years').get('years'))) {
          return {'dateNonExpected': true};
      }
      return null;
    }
  }

}
