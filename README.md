# The South Hub Community Tree 🌳

## PLAY THE THEME. MEET THE PEOPLE. JOIN THE CONVERSATION.

The South Hub Community Tree è una visualizzazione digitale partecipata creata per SouthSustainability Festival.

Ogni partecipante completa una missione, incontra una persona o un’organizzazione e inserisce una connessione attraverso un Google Form. Le risposte arrivano in un Google Sheet e diventano foglie dell’albero digitale.

## Come funziona

1. Il partecipante pesca una carta-tema.
2. Esplora il tema durante il festival.
3. Incontra una persona, un progetto o un’organizzazione.
4. Compila il Google Form.
5. La connessione viene aggiunta al Community Tree digitale.
6. L’albero cresce in tempo reale sullo schermo.

## Struttura dei file

```text
index.html
style.css
script.js
README.md
```

- `index.html` contiene la struttura della pagina.
- `style.css` contiene grafica, colori e animazioni.
- `script.js` legge i dati dal Google Sheet e aggiunge le foglie.
- `README.md` contiene la documentazione del progetto.

## Collegamento al Google Sheet

Per visualizzare le connessioni, il Google Sheet deve essere pubblicato sul web in formato CSV:

```text
File → Condividi → Pubblica sul web
```

Seleziona:

```text
Intero documento → Valori separati da virgola (.csv) → Pubblica
```

Poi copia il link generato e inseriscilo nel file `script.js`, sostituendo:

```javascript
const SHEET_URL = 'INCOLLA_QUI_IL_LINK_CSV_PUBBLICO_DEL_TUO_GOOGLE_SHEET';
```

con il tuo link CSV pubblico.

## Struttura del Google Form

Il form è collegato a un Google Sheet e prevede queste domande:

1. Il tuo nome
2. La tua carta-tema
3. I MET
4. I DISCOVERED
5. OUR CONNECTION
6. Email o contatto — facoltativo
7. Livello reward
