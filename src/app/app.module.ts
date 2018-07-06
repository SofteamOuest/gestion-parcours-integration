import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {PersonnesComponent} from './personnes/personnes.component';
import {EvenementsComponent} from './evenements/evenements.component';
import {AppRouterModule} from './app-router/app-router.module';
import {HttpClientModule} from '@angular/common/http';
import {PersonneEvenementsComponent} from './personnes/personne-evenements/personne-evenements.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatGridListModule,
  MatListModule,
  MatExpansionModule,
  MatDialogModule,
  MatSelectModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatCheckboxModule,
  MAT_LABEL_GLOBAL_OPTIONS,
  MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule
} from '@angular/material';
import {MessagesComponent} from './messages/messages.component';
import {ResourceService} from './services/ressource.service';
import {PersonnesDetailsComponent} from './personnes/personnes-details/personnes-details.component';
import {MessageService} from './messages/message.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonnesComponent,
    EvenementsComponent,
    PersonneEvenementsComponent,
    MessagesComponent,
    PersonnesDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatGridListModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    Ng2SearchPipeModule
  ],
  entryComponents: [
    PersonnesDetailsComponent
  ],
  providers: [ResourceService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
