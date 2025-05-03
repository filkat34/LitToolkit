import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {

  //Coller le texte dans un élément cible
  async pasteFromClipboard(targetElement: HTMLTextAreaElement | HTMLInputElement): Promise<void> {
    try {
      const text = await navigator.clipboard.readText();
      if (targetElement) {
        targetElement.value = text;
      }
    } catch (err) {
      console.error('Impossible de coller le texte depuis le presse-papiers: ', err);
    }
  }
}