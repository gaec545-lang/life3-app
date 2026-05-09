// modules/results.js
const ResultsModule = {
  data: null,

  setResultsData(data) {
    this.data = data;
  },

  render() {
    if (!this.data) {
      window.location.hash = '#dashboard';
      return;
    }

    const { type, blockId, accuracy, xp, correct, total } = this.data;
    
    App.addXP(xp);
    App.incrementStreak();
    
    let title = '';
    let actionButtons = '';
    let starsHtml = '';
    
    if (type === 'block') {
      const stars = App.updateBlockScore(blockId, accuracy);
      
      if (stars === 3) starsHtml = '⭐⭐⭐';
      else if (stars === 2) starsHtml = '⭐⭐☆';
      else if (stars === 1) starsHtml = '⭐☆☆';
      else starsHtml = '☆☆☆';

      title = `¡Bloque ${blockId} Completado!`;
      
      if (accuracy >= 60) {
        App.unlockNextBlock(blockId);
        const nextId = parseInt(blockId) + 1;
        if (nextId <= 10) {
          actionButtons += `<button class="action-btn primary" onclick="window.location.hash='#block/${nextId}'">Siguiente bloque →</button>`;
        }
      } else {
         actionButtons += `<button class="action-btn primary" onclick="window.location.hash='#block/${blockId}?tab=practice'">Reintentar Práctica</button>`;
      }
      
      actionButtons += `
        <button class="action-btn" onclick="window.location.hash='#block/${blockId}'">Repasar este bloque</button>
        <button class="action-btn" style="background:transparent; border:none;" onclick="window.location.hash='#dashboard'">Ir al dashboard</button>
      `;
    } else {
      title = '⚡ ¡Sprint Completado!';
      starsHtml = '🏆';
      
      actionButtons += `
        <button class="action-btn primary" onclick="window.location.hash='#dashboard'">Ir al dashboard</button>
      `;
    }

    let html = `
      <div class="results-card glass" style="margin-top:40px; border-radius:var(--radius-lg); padding:50px 30px;">
        <div class="results-stars" style="font-size:5rem; filter:drop-shadow(0 0 20px rgba(245,200,66,0.5)); margin-bottom:20px;">${starsHtml}</div>
        <h1 style="margin-bottom:40px; font-size:2.5rem;">${title}</h1>
        
        <div style="background:rgba(0,0,0,0.3); border-radius:var(--radius-md); padding:20px; margin-bottom:40px;">
          <div class="flex-between" style="padding:15px 0; border-bottom:1px solid var(--border); font-size:1.2rem;">
            <span style="color:var(--text-secondary);">Aciertos</span>
            <span style="font-weight:800; font-family:'JetBrains Mono', monospace;">${correct} / ${total} (${accuracy}%)</span>
          </div>
          
          <div class="flex-between" style="padding:15px 0; font-size:1.2rem;">
            <span style="color:var(--text-secondary);">XP Ganado</span>
            <span style="font-weight:800; color:var(--accent-orange); text-shadow:0 0 10px rgba(245,140,0,0.5);">+${xp}</span>
          </div>
        </div>
        
        <div class="btn-group" style="display:flex; flex-direction:column; gap:15px;">
          ${actionButtons}
        </div>
      </div>
    `;

    document.getElementById('results').innerHTML = html;
    this.data = null; 
  }
};
