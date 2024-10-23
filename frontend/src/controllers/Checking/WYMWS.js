"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs = __importStar(require("fs"));
const ShortenList_1 = __importDefault(require("./ShortenList"));
class WYMWS {
    constructor() {
        this.Words = this.getWords();
        this.Words = (0, ShortenList_1.default)(this.Words);
    }
    getWords() {
        // Datei lesen und Wörter als JSON parsen
        const filePath = 'storage/WYMWS/english/words.json';
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const words = JSON.parse(data);
            return Array.isArray(words) ? words : [];
        }
        catch (error) {
            console.error('Error reading or parsing the file:', error);
            return [];
        }
    }
}
module.exports = WYMWS;
// Beispiel: Instanziierung der Klasse
//const wymws = new WYMWS();
//console.log(wymws);
