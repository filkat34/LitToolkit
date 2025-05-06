import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-app-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './app-list.component.html',
  styleUrl: './app-list.component.css'
})
export class AppListComponent {
  
  applications = [
    {
      title: 'LisiCalc',
      description: 'Calculer les scores de lisibilité d\'un texte.',
      routerLink: '/lisicalc',
      buttonText: 'Lancer',
      buttonClass: 'btn-primary'
    },
    {
      title: 'LexiQuête',
      description: 'Apprendre des stratégies pour deviner le sens d\'un mot.',
      routerLink: '/lexiquete',
      buttonText: 'Lancer',
      buttonClass: 'btn-primary'
    },
    {
      title: 'Brouillez !',
      description: 'Apprendre les gestes du brouillon.',
      routerLink: '',
      buttonText: 'À venir',
      buttonClass: 'btn-secondary'
    }
  ];

  // Fonction pour trier les applications par ordre alphabétique
  sortApplications(): void {
    this.applications.sort((a, b) => a.title.localeCompare(b.title));
  }
 
}
