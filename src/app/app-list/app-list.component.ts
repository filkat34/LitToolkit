import { Component } from '@angular/core';
import { LisicalcComponent } from '../lisicalc/lisicalc.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-app-list',
  imports: [LisicalcComponent, RouterLink],
  templateUrl: './app-list.component.html',
  styleUrl: './app-list.component.css'
})
export class AppListComponent {
  
 
}
