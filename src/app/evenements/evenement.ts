import {Personne} from '../personnes/personne';

export class Evenement {
  idEvenement: number;
  nom: string;
  description: string;
  dateEvenement: string;
  dateValidation?: string;
  type?: string;
  cycle?: boolean;
  valeurRecurrence?: number;
  typeRecurrence?: string;
  personne?: Personne;
}
