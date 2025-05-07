import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from "./about/about.component";
import { AppListComponent } from './app-list/app-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AboutComponent, AppListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LitToolkit';
  hideHomeComponents = false; // Visibilité des composants de la page d'accueil

  constructor(private router: Router) {
    // Ecouteur d'événements de navigation pour changer la visibilité des composants
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Cacher les composants de la page d'accueil si l'URL n'est pas '/'
        this.hideHomeComponents = event.url !== '/';
      }
    });
  }

}
