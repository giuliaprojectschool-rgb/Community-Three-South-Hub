/*
 * THE SOUTH HUB COMMUNITY TREE
 * Script con effetto WOW
 */

// CONFIGURAZIONE
// Sostituisci con il link del tuo Google Sheets pubblicato
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1pz57sSJiqW0ac7SpQ_V2qJBfpGRxb0kize13JiK6gKM/edit?usp=sharing';

// Colori per i temi
const themeColors = {
    '🌊': { start: '#74ebd5', end: '#ACB6E5' },
    '🫂': { start: '#f093fb', end: '#f5576c' },
    '🗺️': { start: '#f5576c', end: '#f6d365' },
    '💰': { start: '#f6d365', end: '#fda085' },
    '🌱': { start: '#84fab0', end: '#8fd3f4' },
    '💡': { start: '#fccb90', end: '#d57eeb' },
    '⚖️': { start: '#a18cd1', end: '#fbc2eb' },
    '🔗': { start: '#fad0c4', end: '#ffd1ff' },
    '🌍': { start: '#667eea', end: '#764ba2' },
    '🚀': { start: '#f093fb', end: '#667eea' },
    '✨': { start: '#ffd89b', end: '#19547b' },
    '🎯': { start: '#ff9a9e', end: '#fecfef' }
};

// Posizioni predefinite per le foglie (distribuite sull'albero)
const leafPositions = [
    { top: '15%', left: '35%' },
    { top: '18%', left: '60%' },
    { top: '22%', left: '45%' },
    { top: '25%', left: '68%' },
    { top: '28%', left: '30%' },
    { top: '32%', left: '52%' },
    { top: '35%', left: '40%' },
    { top: '38%', left: '65%' },
    { top: '42%', left: '35%' },
    { top: '45%', left: '58%' },
    { top: '20%', left: '50%' },
    { top: '30%', left: '48%' },
    { top: '40%', left: '42%' },
    { top: '25%', left: '55%' },
    { top: '35%', left: '38%' },
    { top: '48%', left: '50%' }
];

let leaves = [];
let animationDelay = 0;

// Crea particelle di sfondo
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Carica le foglie dal Google Sheets
async function loadLeaves() {
    const loading = document.getElementById('loading');

    if (SHEET_URL === 'INCOLLA_QUI_IL_LINK_DEL_TUO_GOOGLE_SHEETS_PUBBLICATO') {
        loading.innerHTML = `
            <div class="spinner"></div>
            <p>⚠️ Configura il link del tuo Google Sheets!</p>
            <p style="font-size: 0.8em; margin-top: 10px; opacity: 0.7;">Modifica il file script.js</p>
        `;
        return;
    }

    try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error('Errore nel caricamento');

        const data = await response.text();
        const rows = data.split('\n').slice(1); // Salta intestazione

        leaves = rows.filter(row => row.trim()).map(row => {
            const cols = row.split(',').map(col => col.trim().replace(/^"|"$/g, ''));
            return {
                name: cols[0] || 'Anonimo',
                theme: cols[1] || '🌱',
                met: cols[2] || '',
                discovered: cols[3] || '',
                connection: cols[4] || '',
                email: cols[5] || '',
                reward: cols[6] || '',
                timestamp: cols[7] || ''
            };
        });

        renderLeaves();
        updateStats();

        // Nascondi loading
        loading.style.display = 'none';

        // Aggiorna ultimo aggiornamento
        const now = new Date();
        document.getElementById('lastUpdate').textContent = 
            now.getHours().toString().padStart(2, '0') + ':' + 
            now.getMinutes().toString().padStart(2, '0');

    } catch (error) {
        console.error('Errore:', error);
        loading.innerHTML = `
            <div class="spinner"></div>
            <p>⚠️ Errore nel caricamento</p>
            <p style="font-size: 0.8em; margin-top: 10px; opacity: 0.7;">Controlla il link dello Sheets</p>
        `;
    }
}

// Renderizza le foglie
function renderLeaves() {
    const container = document.getElementById('leavesContainer');
    container.innerHTML = '';

    leaves.forEach((leaf, index) => {
        const leafEl = document.createElement('div');
        leafEl.className = 'leaf';

        // Posizione
        const pos = leafPositions[index % leafPositions.length];
        leafEl.style.top = pos.top;
        leafEl.style.left = pos.left;

        // Colore in base al tema
        const emoji = leaf.theme.charAt(0);
        const colors = themeColors[emoji] || themeColors['🌱'];
        leafEl.style.background = `linear-gradient(135deg, ${colors.start}, ${colors.end})`;

        // Animazione in ritardo progressivo
        leafEl.style.animationDelay = `${index * 0.1}s`;

        // Contenuto
        leafEl.innerHTML = `
            <div class="leaf-content">
                <span class="leaf-emoji">${leaf.theme}</span>
                <strong>${leaf.met.substring(0, 15)}${leaf.met.length > 15 ? '...' : ''}</strong>
            </div>
        `;

        // Tooltip con tutti i dettagli
        leafEl.title = `${leaf.name}\n${leaf.theme}\n\nIncontrato: ${leaf.met}\n\nScoperto: ${leaf.discovered}\n\nConnessione: ${leaf.connection}`;

        container.appendChild(leafEl);
    });
}

// Aggiorna statistiche
function updateStats() {
    // Totale foglie
    document.getElementById('totalLeaves').textContent = leaves.length;

    // Tema più popolare
    const themeCounts = {};
    leaves.forEach(leaf => {
        const theme = leaf.theme;
        themeCounts[theme] = (themeCounts[theme] || 0) + 1;
    });

    let topTheme = '-';
    let maxCount = 0;
    Object.entries(themeCounts).forEach(([theme, count]) => {
        if (count > maxCount) {
            maxCount = count;
            topTheme = theme;
        }
    });
    document.getElementById('topTheme').textContent = topTheme;
}

// Inizializza
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    loadLeaves();

    // Aggiorna ogni 30 secondi
    setInterval(loadLeaves, 30000);
});
