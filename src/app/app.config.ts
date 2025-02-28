import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { ConsultarComponent } from './pages/consultar/consultar.component';

  import { RegistrarComponent } from './pages/registrar/registrar.component';

const routes: Routes = [
  { path: '', component: ConsultarComponent }, // Página inicial
  { path: 'Registrar', component: RegistrarComponent }, // Página sobre
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
