import { Routes } from '@angular/router';
import { LisicalcComponent } from './lisicalc/lisicalc.component';


export const routes: Routes = [
  {
    path: 'lisicalc',
    component: LisicalcComponent,
  },
  {
    path: '**',
    redirectTo: 'index.html', // Redirige les routes non trouvées vers l'accueil
  }
];
