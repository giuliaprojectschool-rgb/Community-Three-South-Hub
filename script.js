// THE SOUTH HUB COMMUNITY TREE
// Inserisci qui il link CSV pubblico del tuo Google Sheet.
// Esempio:
// https://docs.google.com/spreadsheets/d/e/XXXXXXX/pub?output=csv

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1pz57sSJiqW0ac7SpQ_V2qJBfpGRxb0kize13JiK6gKM/edit?usp=sharing';

/*
  Ogni posizione rappresenta uno spazio della chioma.

  0 risposte: solo tronco e rami.
  1 risposta: appare la prima foglia.
  Più risposte: la chioma si riempie progressivamente.
*/
const leafPositions = [
  ['17%', '50%'],
  ['20%', '40%'],
  ['20%', '60%'],

  ['24%', '31%'],
  ['24%', '51%'],
  ['24%', '70%'],

  ['29%', '22%'],
  ['29%', '40%'],
  ['29%', '60%'],
  ['29%', '78%'],

  ['34%', '15%'],
  ['34%', '32%'],
  ['34%', '50%'],
  ['34%', '69%'],
  ['34%', '85%'],

  ['39%', '10%'],
  ['39%', '25%'],
  ['39%', '43%'],
  ['39%', '58%'],
  ['39%', '76%'],
  ['39%', '90%'],

  ['44%', '5%'],
  ['44%', '18%'],
  ['44%', '35%'],
  ['44%', '51%'],
  ['44%', '67%'],
  ['44%', '83%'],
  ['44%', '96%'],

  ['49%', '12%'],
  ['49%', '29%'],
  ['49%', '46%'],
  ['49%', '63%'],
  ['49%', '80%'],

  ['54%', '20%'],
  ['54%', '37%'],
  ['54%', '54%'],
  ['54%', '71%'],
  ['54%', '88%']
];

const leafColors = [
  ['#2d5f36', '#73ab31'],
  ['#3e702f', '#93c93a'],
  ['#4d8136', '#b8df44'],
  ['#577c29', '#9ccc35'],
  ['#214f31', '#6e9e38']
];

let leaves = [];

/* Crea piccole particelle decorative sullo sfondo */
function makeParticles() {
  const container = document.getElementById('particles');

  if (!container) {
    return;
  }

  for (let i = 0; i < 35; i += 1) {
    const particle = document.createElement('i');

    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${15 + Math.random() * 12}s`;
    particle.style.animationDelay = `${Math.random() * 12}s`;

    container.appendChild(particle);
  }
}

/* Legge correttamente un CSV, anche se un testo contiene virgole */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const character = text[i];
    const nextCharacter = text[i + 1];

    if (character === '"' && quoted && nextCharacter === '"') {
      value += '"';
      i += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(value.trim());
      value = '';
    } else if (
      (character === '\n' || character === '\r') &&
      !quoted
    ) {
      if (character === '\r' && nextCharacter === '\n') {
        i += 1;
      }

      row.push(value.trim());

      if (row.some((cell) => cell !== '')) {
        rows.push(row);
      }

      row = [];
      value = '';
    } else {
      value += character;
    }
  }

  row.push(value.trim());

  if (row.some((cell) => cell !== '')) {
    rows.push(row);
  }

  return rows;
}

function getField(row, index) {
  return row[index] ? row[index].trim() : '';
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* Crea una foglia per ogni risposta ricevuta */
function renderLeaves() {
  const container = document.getElementById('leavesContainer');

  if (!container) {
    return;
  }

  container.innerHTML = '';

  leaves.forEach((leaf, index) => {
    const element = document.createElement('article');
    const position = leafPositions[index % leafPositions.length];
    const top = position[0];
    const left = position[1];
    const color = leafColors[index % leafColors.length];

    /*
      Se superi il numero di posizioni:
      le foglie continuano a comparire con lievi variazioni,
      mantenendo l'effetto di chioma densa.
    */
    const cycle = Math.floor(index / leafPositions.length);

    element.className = 'leaf';
    element.style.top = `calc(${top} + ${cycle * 3}px)`;
    element.style.left = `calc(${left} - 4%)`;
    element.style.background =
      `linear-gradient(135deg, ${color[0]}, ${color[1]})`;

    /* Ritardo progressivo: le foglie crescono una dopo l'altra */
    element.style.animationDelay = `${Math.min(index * 0.07, 2)}s`;

    /*
      Testo brevissimo sulla foglia:
      mostra prima I MET.
      Se I MET è vuoto, mostra il tema.
    */
    const leafLabel = leaf.met || leaf.theme || 'Connessione';

    element.innerHTML = `
      <span class="leaf-vein"></span>
      <span class="leaf-text">${escapeHtml(leafLabel)}</span>
    `;

    /* Dettagli visibili passando con il mouse */
    element.title =
      `${leaf.name || 'Partecipante'}\n` +
      `${leaf.theme || ''}\n\n` +
      `I MET: ${leaf.met || ''}\n\n` +
      `I DISCOVERED: ${leaf.discovered || ''}\n\n` +
      `OUR CONNECTION: ${leaf.connection || ''}`;

    container.appendChild(element);
  });
}

/* Aggiorna i tre dati in basso */
function updateStats() {
  const totalLeaves = document.getElementById('totalLeaves');
  const lastUpdate = document.getElementById('lastUpdate');
  const topTheme = document.getElementById('topTheme');

  if (totalLeaves) {
    totalLeaves.textContent = leaves.length;
  }

  if (lastUpdate) {
    lastUpdate.textContent = new Date().toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (topTheme) {
    topTheme.textContent = leaves.length > 0 ? '🌿' : '-';
  }
}

function showMessage(message) {
  const loading = document.getElementById('loading');

  if (!loading) {
    return;
  }

  loading.innerHTML = `<p>${message}</p>`;
  loading.style.display = 'grid';
}

/* Legge il Google Sheet e trasforma le risposte in foglie */
async function loadLeaves() {
  if (
    SHEET_URL ===
    'INCOLLA_QUI_IL_LINK_CSV_PUBBLICO_DEL_TUO_GOOGLE_SHEET'
  ) {
    /*
      Finché non metti il link:
      l'albero resta volutamente senza foglie,
      con tronco e rami visibili.
    */
    leaves = [];
    renderLeaves();
    updateStats();

    showMessage(
      'Configura il link del Google Sheet nel file script.js.'
    );

    return;
  }

  try {
    /* Parametro cache per leggere sempre le nuove risposte */
    const joiner = SHEET_URL.includes('?') ? '&' : '?';

    const response = await fetch(
      `${SHEET_URL}${joiner}cache=${Date.now()}`
    );

    if (!response.ok) {
      throw new Error('Impossibile leggere il Google Sheet');
    }

    const text = await response.text();
    const rows = parseCsv(text);

    /*
      La prima riga contiene le intestazioni.
      L'ordine atteso dal tuo Google Form è:

      0 = Timestamp
      1 = Il tuo nome
      2 = La tua carta-tema
      3 = I MET
      4 = I DISCOVERED
      5 = OUR CONNECTION
      6 = Email o contatto
      7 = Livello reward
    */
    const dataRows = rows.slice(1);

    leaves = dataRows
      .map((row) => ({
        timestamp: getField(row, 0),
        name: getField(row, 1),
        theme: getField(row, 2),
        met: getField(row, 3),
        discovered: getField(row, 4),
        connection: getField(row, 5)
      }))
      .filter(
        (leaf) =>
          leaf.name ||
          leaf.theme ||
          leaf.met ||
          leaf.connection
      );

    renderLeaves();
    updateStats();

    const loading = document.getElementById('loading');

    if (loading) {
      loading.style.display = 'none';
    }
  } catch (error) {
    console.error(error);

    showMessage(
      'Non riesco a leggere il Google Sheet. Controlla che sia pubblicato sul web in formato CSV e verifica il link nel file script.js.'
    );
  }
}

/* Avvio e aggiornamento automatico ogni 30 secondi */
document.addEventListener('DOMContentLoaded', () => {
  makeParticles();
  loadLeaves();

  window.setInterval(loadLeaves, 30000);
});
