import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { AboutComponent } from "../about/about.component";

@Component({
  selector: 'app-lisicalc',
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './lisicalc.component.html',
  styleUrls: ['./lisicalc.component.css'],
})
export class LisicalcComponent {
}
