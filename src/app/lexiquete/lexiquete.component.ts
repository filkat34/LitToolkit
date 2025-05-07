import { Component } from '@angular/core';
import { ClipboardService } from '../services/clipboard.service';
import { ImportdocumentService } from '../services/importdocument.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lexiquete',
  imports: [CommonModule, FormsModule],
  templateUrl: './lexiquete.component.html',
  styleUrl: './lexiquete.component.css'
})
export class LexiqueteComponent {

/**
 * Initialisations
 * @param clipboardService 
 * @param importdocument 
 */
  constructor(
    private clipboardService: ClipboardService,
    private importdocument: ImportdocumentService
  ) { }

  /**
   * Variables utilisées
   */
  currentStep: number = 1; // Étape actuelle (1 par défaut)
  text: string = ''; // Variable pour stocker le texte saisi
  clickableWords: string[] = []; // Liste des mots cliquables
  numberWords: number = 0 ;
  
  /**
   * Méthodes pour gérer la navigation dans l'application
   */
  nextStep(): void {
    if (this.currentStep === 1) {
      this.saveText();
    }
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }
  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  /**
   * Coller le texte depuis le presse-papiers
   */
  async Paste(): Promise<void> {
    const textarea = document.getElementById('text') as HTMLTextAreaElement;
    if (textarea) {
      await this.clipboardService.pasteFromClipboard(textarea);
      this.text = textarea.value.trim(); // Met à jour la variable text
      this.numberWords = this.nbMots(this.text); // Met à jour le compteur de mots
    }
  }

  /**
   * Importer un texte depuis un fichier et le coller dans la textarea
   * @param event 
   * @returns 
   */
  async FileInput(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0]; // Extraire le fichier
    const textarea = document.getElementById('text') as HTMLTextAreaElement;
    try {
      const text = await this.importdocument.readFile(file); // Appeler le service avec le fichier
      this.text = text.trim(); // Met à jour la variable text
      this.numberWords = this.nbMots(this.text); // Met à jour le compteur de mots
    } catch (err) {
      alert(err); // Gérer les erreurs
    }
  }

  /**
   * Mise à jour de la variable text
   * @param event 
   */
  updateText(event: Event): void {
  const textarea = event.target as HTMLTextAreaElement;
  this.text = textarea.value.trim();
  this.numberWords = this.nbMots(this.text); // Met à jour le compteur de mots
}

/**
 * Sauvegarde du texte saisi dans la variable
 * Génération d'un texte cliquable
 */
  saveText(): void {
    const textarea = document.getElementById('text') as HTMLTextAreaElement;
    if (textarea) {
      this.text = textarea.value.trim();
      this.generateClickableWords(); 
    }
  }

 /**
  * Compteur de mots
  * @param text 
  * @returns nombre de mots
  */
  nbMots(text: string): number {
    let regex = /(\w+)/gi;
    const mots = text.match(regex)
    return mots ? mots.length : 0;
  }

  /**
   * Division du texte en mots
   */
  generateClickableWords(): void {
    this.clickableWords = this.text.split(/\s+/);
  }

  /**
   * Méthode pour gérer le click sur un mot
   * @param word 
   */
  onWordClick(word: string): void {
    console.log(`Mot cliqué : ${word}`);
  }
}


