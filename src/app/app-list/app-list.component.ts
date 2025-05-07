import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-app-list',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './app-list.component.html',
  styleUrl: './app-list.component.css'
})
export class AppListComponent {

  // Liste des applications avec leurs détails
  // Chaque application a une catégorie, un titre, une description, un lien de route, un texte de bouton et une classe de bouton
  applications = [
    {
      categorie: 'Lecture',
      title: 'LisiCalc',
      description: 'Calculer la lisibilité d\'un texte pour mieux adapter les corpus d\'enseignement.',
      routerLink: '/lisicalc',
      buttonText: 'Lancer',
      buttonClass: 'btn-primary'
    },
    {
      categorie: 'Vocabulaire',
      title: 'LexiQuête',
      description: 'Apprendre des stratégies pour deviner le sens d\'un mot inconnu.',
      routerLink: '/lexiquete',
      buttonText: 'Lancer',
      buttonClass: 'btn-primary'
    },
    {
      categorie: 'Grammaire',
      title: 'TaGrammaire',
      description: 'S\'entraîner à la question de grammaire au bac.',
      routerLink: '',
      buttonText: 'À venir',
      buttonClass: 'btn-secondary'
    }
  ];

  // Fonction pour trier les applications par ordre alphabétique
  sortApplications(): void {
    this.applications.sort((a, b) => a.title.localeCompare(b.title));
  }

  searchTerm: string = ''; // Terme de recherche
  filteredApplications = [...this.applications]; // Applications filtrées

  // Méthode pour filtrer les applications
  filterApplications(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredApplications = this.applications.filter(app =>
      app.title.toLowerCase().includes(searchTermLower) ||
      app.description.toLowerCase().includes(searchTermLower) ||
      app.categorie.toLowerCase().includes(searchTermLower)
    );
  }
 
}
