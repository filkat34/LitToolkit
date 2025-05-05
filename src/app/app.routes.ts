import { Routes } from '@angular/router';
import { LisicalcComponent } from './lisicalc/lisicalc.component';
import { LexiqueteComponent } from './lexiquete/lexiquete.component';


export const routes: Routes = [
  
  {
    path: 'lisicalc',
    component: LisicalcComponent,
  },
  {
    path: 'lexiquete',
    component: LexiqueteComponent
  },
  {
    path: '**',
    redirectTo: 'index.html', // Redirige les routes non trouvées vers l'accueil
  }
];
