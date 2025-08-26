import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsultaListComponent } from './consulta/consulta-list.component';
import { ConsultaAddComponent } from './consulta/consulta-add.component';
import { ConsultaEditComponent } from './consulta/consulta-edit.component';
import { ErrorComponent } from './error/error.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: $localize`:@@home.index.headline:Welcome to your new app!`
  },
  {
    path: 'consultas',
    component: ConsultaListComponent,
    title: $localize`:@@consulta.list.headline:Consultas`
  },
  {
    path: 'consultas/add',
    component: ConsultaAddComponent,
    title: $localize`:@@consulta.add.headline:Add Consulta`
  },
  {
    path: 'consultas/edit/:id',
    component: ConsultaEditComponent,
    title: $localize`:@@consulta.edit.headline:Edit Consulta`
  },
  {
    path: 'error',
    component: ErrorComponent,
    title: $localize`:@@error.page.headline:Error`
  },
  {
    path: '**',
    component: ErrorComponent,
    title: $localize`:@@notFound.headline:Page not found`
  }
];
