import * as fs from 'fs';
import ShortenList from './ShortenList';

class WYMWS {
    public Words: string[];

    constructor() {
        this.Words = this.getWords();
        this.Words = ShortenList(this.Words);
    }

    private getWords(): string[] {
        // Datei lesen und Wörter als JSON parsen
        const filePath = 'storage/WYMWS/english/words.json';
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const words = JSON.parse(data);
            return Array.isArray(words) ? words : [];
        } catch (error) {
            console.error('Error reading or parsing the file:', error);
            return [];
        }
    }
}
export = WYMWS;
// Beispiel: Instanziierung der Klasse
//const wymws = new WYMWS();
//console.log(wymws);
