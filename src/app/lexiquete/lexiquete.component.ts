import { Component } from '@angular/core';
import { ClipboardService } from '../services/clipboard.service';
import { ImportdocumentService } from '../services/importdocument.service';

@Component({
  selector: 'app-lexiquete',
  imports: [],
  templateUrl: './lexiquete.component.html',
  styleUrl: './lexiquete.component.css'
})
export class LexiqueteComponent {

  constructor(
    private clipboardService: ClipboardService,
    private importdocument: ImportdocumentService
  ) {}

  //Coller le texte depuis le presse-papiers
  async Paste(): Promise<void> {
    await this.clipboardService.pasteFromClipboard(
      document.getElementById('text') as HTMLTextAreaElement
    );
  }

  //Importer un fichier texte et le coller dans le textarea
  async FileInput(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0]; // Extraire le fichier
    const textarea = document.getElementById('text') as HTMLTextAreaElement;
  
    try {
      const text = await this.importdocument.readFile(file); // Appeler le service avec le fichier
      if (textarea) {
        textarea.value = text; // Insérer le texte dans le textarea
      }
    } catch (err) {
      alert(err); // Gérer les erreurs
    }
  }

}
