# Parcours intégration
## Le besoin :
 
Afin de suivre le parcours d'intégration des nouveaux arrivants, Catherine et Florie souhaitent avoir une interface de visualisation des événements à venir. Cela leur permet une amélioration de la gestion du parcours d'intégration dès l'arrivée d'une personne. 

## Spécifications fonctionnelles:

Fonctionnalités attendues :
- Visualisation de l'ensemble des événements du mois
- Visualisation de l'ensemble des événements à venir (M+1 et plus)
- Ajout d'une personne 
- Modification d'une personne
- Visualisation des événements liés à une personne

## Spécifications technique :

Application Angular 6 se basant sur 4 services REST :
- referentiel-personne-api : https://github.com/SofteamOuest/referentiel-personnes-api
- gestion-evenement : https://github.com/SofteamOuest/gestion-evenement
- evenement-parcours-integration : https://github.com/SofteamOuest/evenement-parcours-integration
- gestion-rappel : https://github.com/SofteamOuest/evenement-rappel

## Reste à faire (front) :
- Reprise de la CSS globale
- Déplacement sur la frise des événements (visualisation des événements pour une personne)
- Implémation des photos pour chaque personne
- Connexion via keycloak (à confirmer)
- Recherche de personnes dans la liste
- Ajout des anniversaires


# Informations générales
## Angular version
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

## Development server
Run `npm install`
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
