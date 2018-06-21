import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonnesComponent} from '../personnes/personnes.component';
import {EvenementsComponent} from '../evenements/evenements.component';

const routes: Routes = [
  { path: '', component: EvenementsComponent},
  { path: 'personnes', component: PersonnesComponent}
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRouterModule { }
