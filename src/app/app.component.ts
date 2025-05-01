import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AboutComponent } from "./about/about.component";
import { AppListComponent } from './app-list/app-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AboutComponent, AppListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LitToolkit';
  hideHomeComponents = false; // State variable to control visibility

  constructor(private router: Router) {
    // Listen to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide home components on route change
        this.hideHomeComponents = event.url !== '/';
      }
    });
  }

}
