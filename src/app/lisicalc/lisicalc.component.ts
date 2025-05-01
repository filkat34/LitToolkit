import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import * as mammoth from 'mammoth';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-lisicalc',
  imports: [RouterOutlet, RouterLink, HeaderComponent, CommonModule],
  templateUrl: './lisicalc.component.html',
  styleUrls: ['./lisicalc.component.css'],
})

export class LisicalcComponent {

  //Déclaration des variables
  caracters: number = 0;
  voyelles: number = 0;
  digrammes: number = 0;
  trigrammes: number = 0;
  syllabes: number = 0;
  mots: number = 0;
  motslongs: number = 0;
  motspolysyl: number = 0;
  phrases: number = 0;
  lix: number = 0;
  lixdif: string = "";
  rix: number = 0;
  rixdif: string = "";
  fkgl: number = 0;
  fkgldif: string = "";
  fog: number = 0;
  fogdif: string = "";
  smog: number = 0;
  smogdif: string = "";
  colemanliau: number = 0;
  colemanliaudif: string = "";
  ari: number = 0;
  aridif: string = "";

  //Tableau des statistiques du texte
  stats: { name: string; value: number }[] = [];

  //Tableau des indices de lisibilité
  indices: { name: string; score: number; difficulty: string }[] = [];

  //Coller un texte depuis le presse-papiers
  async pasteFromClipboard(): Promise<void> {
    try {
      const text = await navigator.clipboard.readText(); // Wait for clipboard text
      const textarea = document.getElementById('text') as HTMLTextAreaElement;
      if (textarea) {
        textarea.value = text; // Paste the clipboard text into the textarea
      }
    } catch (err) {
      console.error('Impossible de coller le texte depuis le presse-papiers: ', err);
    }
  }

  //Importer un fichier texte (.txt, .docx, .odt)
  async readFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    const textarea = document.getElementById('text') as HTMLTextAreaElement;

    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = () => {
        if (textarea) {
          textarea.value = reader.result as string;
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.docx')) {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const result = await mammoth.extractRawText({ arrayBuffer: reader.result as ArrayBuffer });
          if (textarea) {
            textarea.value = result.value;
          }
        } catch (err) {
          console.error('Error reading DOCX file:', err);
          alert('Echec de lecture du fichier DOCX.');
        }
      };
      reader.readAsArrayBuffer(file);
    } else if (file.name.endsWith('.odt')) {
      const reader = new FileReader();
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
            if (textarea) {
              textarea.value = extractedText;
            }
          } else {
            alert('Impossible de lire le contenu du fichier ODT.');
          }
        } catch (err) {
          console.error('Error reading ODT file:', err);
          alert('Echec de lecture du fichier ODT.');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Type de fichier non pris en charge. Veuillez importer un fichier .txt, .docx ou .odt.');
    }
  }

  //Décompte du nombre de caractères
  nbCaracteres(text: string): number {
    let regex = /(\w)/gi;
    const nbCaracteres = text.match(regex);
    return nbCaracteres ? nbCaracteres.length : 0;
  }

  //Décompte du nombre de voyelles
  nbVoyelles(text: string): number {
    let regex = /[aeiouœ]/gi;
    const voyelles = text.match(regex);
    return voyelles ? voyelles.length : 0;
  }

  //Décompte du nombre de digrammes
  nbDigrammes(text: string): number {
    let regex = /(au)|(eu)|(ou)|(oi)|(œu)|(ei)|(ai)|(ee)|(ue)|(ui)|(ua)/gi;
    const digrammes = text.match(regex);
    return digrammes ? digrammes.length : 0;
  }

  //Décompte du nombre de trigrammes
  nbTrigrammes(text: string): number {
    let regex = /(eau)|(oue)|(aie)/gi;
    const trigrammes = text.match(regex)
    return trigrammes ? trigrammes.length : 0;
  }

  //Décompte du nombre de syllabes graphiques
  nbSyllabesGraphiques(text: string): number {
    return this.nbVoyelles(text) - (this.nbDigrammes(text) + this.nbTrigrammes(text));
  }

  //Décompte du nombre de mots
  nbMots(text: string): number {
    let regex = /(\w+)/gi;
    const mots = text.match(regex)
    return mots ? mots.length : 0;
  }

  //Décompte des mots polysyllabiques
  nbMotsPolysyllabiques(text: string): number {
    let punctuation = /[.,?!;:]/g;
    text = text.replace(punctuation, "").replace("  ", " ");
    let mots = text.split(' ');
    let motsPolysyllabiques = 0;
    for (const mot in mots) {
      if (this.nbSyllabesGraphiques(mots[mot]) >= 3) {
        motsPolysyllabiques++;
      }
    }
    return motsPolysyllabiques;
  }

  //Décompte des mots longs
  nbMotsLongs(text: string): number {
    let regex = /(\w{7,})/g;
    const motsLongs = text.match(regex);
    return motsLongs ? motsLongs.length : 0;
  }

  //Décompte des phrases
  nbPhrases(text: string): number {
    let regex = /..\.|!|\?/gi;
    const phrases = text.match(regex);
    return phrases ? phrases.length : 0;
  }

  //Calcul LIX
  scoreLix(text: string): number {
    return (this.nbMots(text) / this.nbPhrases(text)) + 100 * (this.nbMotsLongs(text) / this.nbMots(text));
  }

  //Calcul RIX
  scoreRix(text: string): number {
    return this.nbMotsLongs(text) / this.nbPhrases(text);
  }

  //Calcul FKGL
  scoreFkgl(text: string): number {
    return 0.39 * (this.nbMots(text) / this.nbPhrases(text)) + 11.8 * (this.nbSyllabesGraphiques(text) / this.nbMots(text)) - 15.59;
  }

  //Calcul Gunning Fog
  scoreGunningFog(text: string): number {
    return 0.4 * (this.nbMots(text) / this.nbPhrases(text)) + 100 * (this.nbMotsPolysyllabiques(text) / this.nbMots(text));
  }

  //Calcul SMOG
  scoreSMOG(text: string): number {
    return 1.043 * Math.sqrt((this.nbMotsPolysyllabiques(text) * (30 / this.nbPhrases(text)))) + 3.1291;
  }

  //Calcul Coleman-Liau
  scoreColemanLiau(text: string): number {
    return 0.0588 * ((this.nbCaracteres(text) / this.nbMots(text)) * 100) - 0.296 * ((this.nbPhrases(text) / this.nbMots(text)) * 100) - 15.8;
  }

  //Calcul Automated Readability Index
  scoreAri(text: string): number {
    return 4.71 * (this.nbCaracteres(text) / this.nbMots(text)) + 0.5 * (this.nbMots(text) / this.nbPhrases(text)) - 21.43;
  }

  //Analyse des scores de lisibilité
  scoreAnalysis(formula: string, score: number): string {
    let formula_scales = [['lix', 59, 50, 40, 30],
    ['rix', 7.1, 5.3, 2.9, 1.8],
    ['fkgl', 15, 12, 5, 1],
    ['gunning', 17, 13, 7, 1],
    ['smog', 14, 12, 7, 1],
    ['ari', 15, 9, 5, 1],
    ['coleman_liau', 15, 9, 5, 1]
    ]
    for (let column in formula_scales) {
      for (let row in formula_scales) {
        if (formula_scales[column][row] === formula) {
          if (score > Number(formula_scales[column][1])) {
            return "Très difficile";
          }
          if (score > Number(formula_scales[column][2])) {
            return "Difficile";
          }
          if (score > Number(formula_scales[column][3])) {
            return "Intermédiaire";
          }
          if (score > Number(formula_scales[column][4])) {
            return "Facile";
          }
          return "Très facile";
        }
      }
    }
    return "Erreur d'analyse";
  }

  analyser(): void {
    const textarea = document.getElementById('text') as HTMLTextAreaElement;
    let text = textarea.value;

    if (textarea) {

      //Décompose les caractères accentués et supprime tous les diacritiques
      text = text.normalize("NFD").replace(/[\u0300-\u036f]/gi, "");

      //Vérification si le texte est vide
      if (text.trim() === "") {
        alert("Veuillez saisir ou importer un texte à analyser.");
        return;
      }

      //Calcul des statistiques
      this.caracters = this.nbCaracteres(text);
      this.voyelles = this.nbVoyelles(text);
      this.digrammes = this.nbDigrammes(text);
      this.trigrammes = this.nbTrigrammes(text);
      this.syllabes = this.nbSyllabesGraphiques(text);
      this.mots = this.nbMots(text);
      this.motslongs = this.nbMotsLongs(text);
      this.motspolysyl = this.nbMotsPolysyllabiques(text);
      this.phrases = this.nbPhrases(text);

      //Remplissage du tableau des statistiques
      this.stats = [
        { name: 'Caractères', value: this.caracters },
        { name: 'Voyelles', value: this.voyelles },
        { name: 'Digrammes', value: this.digrammes },
        { name: 'Trigrammes', value: this.trigrammes },
        { name: 'Syllabes', value: this.syllabes },
        { name: 'Mots', value: this.mots },
        { name: 'Mots longs', value: this.motslongs },
        { name: 'Mots polysyllabiques', value: this.motspolysyl },
        { name: 'Phrases', value: this.phrases },
      ];

      //Calcul des indices de lisibilité
      this.lix = parseFloat(this.scoreLix(text).toFixed(2));
      this.lixdif = this.scoreAnalysis('lix', this.lix);
      this.rix = parseFloat(this.scoreRix(text).toFixed(2));
      this.rixdif = this.scoreAnalysis('rix', this.rix);
      this.fkgl = parseFloat(this.scoreFkgl(text).toFixed(2));
      this.fkgldif = this.scoreAnalysis('fkgl', this.fkgl);
      this.fog = parseFloat(this.scoreGunningFog(text).toFixed(2));
      this.fogdif = this.scoreAnalysis('gunning', this.fog);
      this.smog = parseFloat(this.scoreSMOG(text).toFixed(2));
      this.smogdif = this.scoreAnalysis('smog', this.smog);
      this.colemanliau = parseFloat(this.scoreColemanLiau(text).toFixed(2));
      this.colemanliaudif = this.scoreAnalysis('coleman_liau', this.colemanliau);
      this.ari = parseFloat(this.scoreAri(text).toFixed(2));
      this.aridif = this.scoreAnalysis('ari', this.ari);

      //Remplissage du tableau des indices de lisibilité
      this.indices = [
        { name: 'LIX', score: this.lix, difficulty: this.lixdif },
        { name: 'RIX', score: this.rix, difficulty: this.rixdif },
        { name: 'FKGL', score: this.fkgl, difficulty: this.fkgldif },
        { name: 'Gunning Fog', score: this.fog, difficulty: this.fogdif },
        { name: 'SMOG', score: this.smog, difficulty: this.smogdif },
        { name: 'Coleman-Liau', score: this.colemanliau, difficulty: this.colemanliaudif },
        { name: 'ARI', score: this.ari, difficulty: this.aridif },
      ];
    }
  }

  //Fonction pour changer la couleur de la ligne du tableau en fonction de la difficulté
  getBootstrapClass(difficulty: string): string {
    switch (difficulty) {
      case 'Très difficile':
        return 'table-danger'; // Rouge clair
      case 'Difficile':
        return 'table-danger'; // Orange
      case 'Intermédiaire':
        return 'table-warning'; // Jaune clair
      case 'Facile':
        return 'table-success'; // Vert clair
      case 'Très facile':
        return 'table-success'; // Vert foncé
      default:
        return '';
    }
  }

  clearText(): void {
    
  }
}
