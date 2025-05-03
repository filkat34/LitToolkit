import { Injectable } from '@angular/core';
import * as mammoth from 'mammoth';
import * as JSZip from 'jszip';

@Injectable({
  providedIn: 'root'
})
export class ImportdocumentService {

  // Fonction pour lire le contenu d'un fichier texte, DOCX ou ODT
  // Renvoie le contenu sous forme de chaîne de caractères
  async readFile(file: File): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const reader = new FileReader();

      if (file.type === 'text/plain') {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject('Erreur lors de la lecture du fichier texte.');
        reader.readAsText(file);
      } else if (file.name.endsWith('.docx')) {
        reader.onload = async () => {
          try {
            const result = await mammoth.extractRawText({ arrayBuffer: reader.result as ArrayBuffer });
            resolve(result.value);
          } catch (err) {
            reject('Erreur lors de la lecture du fichier DOCX.');
          }
        };
        reader.onerror = () => reject('Erreur lors de la lecture du fichier DOCX.');
        reader.readAsArrayBuffer(file);
      } else if (file.name.endsWith('.odt')) {
        reader.onload = async () => {
          try {
            const zip = await JSZip.loadAsync(reader.result as ArrayBuffer);
            const contentXml = await zip.file('content.xml')?.async('string');
            if (contentXml) {
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(contentXml, 'application/xml');
              const textElements = xmlDoc.getElementsByTagName('text:p');
              let extractedText = '';
              for (let i = 0; i < textElements.length; i++) {
                extractedText += textElements[i].textContent + '\n';
              }
              resolve(extractedText);
            } else {
              reject('Impossible de lire le contenu du fichier ODT.');
            }
          } catch (err) {
            reject('Erreur lors de la lecture du fichier ODT.');
          }
        };
        reader.onerror = () => reject('Erreur lors de la lecture du fichier ODT.');
        reader.readAsArrayBuffer(file);
      } else {
        reject('Type de fichier non pris en charge. Veuillez importer un fichier .txt, .docx ou .odt.');
      }
    });
  }
}
