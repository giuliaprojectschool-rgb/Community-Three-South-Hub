THE SOUTH HUB COMMUNITY TREE
Dashboard con effetto WOW per GitHub Pages
COSA HAI RICEVUTO
index.html — La struttura della pagina

style.css — Lo stile con animazioni ed effetti

script.js — La logica che carica le foglie dal Google Sheets

README.md — Queste istruzioni

STEP 1: CONFIGURA IL GOOGLE SHEETS
1.1 Crea il Form e collega a Sheets
Segui le istruzioni nel file README_Completo.md che hai già ricevuto per:

Creare il Google Form

Collegarlo a Google Sheets

Pubblicare il foglio sul web (File > Condividi > Pubblica sul web > CSV)

1.2 Copia il link del CSV
Dovrebbe essere tipo: https://docs.google.com/spreadsheets/d/e/2PACX-1vR.../pub?output=csv

STEP 2: MODIFICA script.js
Apri il file script.js con un editor di testo

Cerca questa riga all'inizio:

javascript
const SHEET_URL = 'INCOLLA_QUI_IL_LINK_DEL_TUO_GOOGLE_SHEETS_PUBBLICATO';
Sostituisci con il link del tuo foglio pubblicato

Salva il file

STEP 3: CARICA SU GITHUB
3.1 Crea un nuovo repository
Vai su https://github.com

Clicca su "+" in alto a destra > "New repository"

Nome del repository: south-hub-community-tree (o quello che preferisci)

Visibilità²² Pubblico (necessario per GitHub Pages gratis)

Clicca "Create repository"

3.2 Carica i file
Opzione A: Upload manuale (piu semplice)

Nel repository, clicca "uploading an existing file"

Trascina questi 4 file:

index.html

style.css

script.js

README.md

Clicca "Commit changes"

Opzione B: GitHub Desktop (se lo hai)

Clona il repository

Copia i file nella cartella

Fai commit e push

STEP 4: ATTIVA GITHUB PAGES
Nel repository, vai su "Settings" (in alto)

Nella sidebar sinistra, clicca su "Pages"

Sotto "Source", scegli:

Branch: main (o master)

Folder: / (root)

Clicca "Save"

4.1 Ottieni il link del sito
Dopo 1-2 minuti, GitHub Pages sarà attivo. Troverai il link qui:

Settings > Pages

Oppure: https://tuonomeutente.github.io/south-hub-community-tree/

Questo è il link da mostrare durante il festival!

STEP 5: TESTA IL SITO
Apri il link del tuo sito GitHub Pages

Dovresti vedere:

✅ Sfondo animato con gradiente

✅ Particelle fluttuanti

✅ Albero con effetti di luce

✅ Loading spinner

Se vedi un errore, controlla:

Che il link dello Sheets sia corretto in script.js

Che il foglio sia pubblicato (File > Condividi > Pubblica sul web)

STEP 6: CREA IL QR CODE
Copia il link del tuo sito GitHub Pages

Vai su https://www.qr-code-generator.com/

Incolla il link e genera il QR code

Scarica l'immagine PNG

Stampala su un cartello A4 o A3

Accanto al QR code, metti anche:

Il link del Google Form (per chi non vuole scansionare)

Istruzioni brevi: "Scansiona per aggiungere la tua foglia al Community Tree!"

DURANTE IL FESTIVAL
Setup
Apri il sito su un dispositivo:

TV o proiettore (collega un laptop)

Tablet grande (iPad, Surface)

Monitor dedicato

Posiziona il cartello con il QR code accanto allo schermo

Tieni il sito in fullscreen (F11 su Chrome/Firefox)

Come funziona
I partecipanti scansionano il QR code

Compilano il Google Form (2-3 minuti)

Tornano allo schermo e vedono la loro foglia apparire!

Il sito si aggiorna ogni 30 secondi in automatico

DOPO IL FESTIVAL
Scarica i dati
Vai sul tuo Google Sheets

File > Scarica > Excel o CSV

Hai tutti i dati per il report!

Cosa puoi analizzare
Numero totale di connessioni

Temi più popolari

Email per follow-up

Testi delle connessioni per storie e report

RISOLUZIONE PROBLEMI
"Vedo solo lo spinner di loading"
Controlla che il link in script.js sia corretto

Verifica che il foglio sia pubblicato (deve finire con ?output=csv)

Apri la console del browser (F12) per vedere errori

"Le foglie non appaiono"
Compila il form tu stesso come test

Aspetta 30 secondi (il refresh automatico)

Clicca F5 per ricaricare la pagina

"Il sito non si aggiorna"
GitHub Pages può impiegare 1-2 minuti per propagare le modifiche

Se hai modificato script.js, aspetta qualche minuto

Svuota la cache del browser (Ctrl+Shift+R)

"Le foglie si sovrappongono"
È normale con tante foglie, fa parte dell'effetto "albero pieno"

Se vuoi più spazio, modifica leafPositions in script.js

PERSONALIZZAZIONI (OPZIONALI)
Cambiare i colori dei temi
In script.js, modifica themeColors:

javascript
const themeColors = {
    '🌊': { start: '#74ebd5', end: '#ACB6E5' },
    // ... altri colori
};
Cambiare le posizioni delle foglie
In script.js, modifica leafPositions:

javascript
const leafPositions = [
    { top: '15%', left: '35%' },
    // ... altre posizioni
];
Cambiare la frequenza di aggiornamento
In script.js, in fondo:

javascript
setInterval(loadLeaves, 30000); // 30000 = 30 secondi
CONSIGLI EXTRA
Fai un test completo prima del festival

Tieni aperto il sito su un device di backup

Fai screenshot dell'albero che si riempie per il report

Prepara un piano B: se GitHub Pages ha problemi, mostra direttamente il Google Sheets

Buon festival! 🌳✨

The South Hub Community Tree — SouthSustainability Festival
