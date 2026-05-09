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
    
    // Save XP & Streak
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
      
      if (stars === 3) {
         this.shootConfetti();
      }

      title = `¡Bloque ${blockId} Completado!`;
      
      // Unlock next block if accuracy >= 60%
      if (accuracy >= 60) {
        App.unlockNextBlock(blockId);
        
        const nextId = parseInt(blockId) + 1;
        if (nextId <= 10) {
          actionButtons += `<button class="action-btn" onclick="window.location.hash='#block/${nextId}'">Siguiente bloque →</button>`;
        }
      }
      
      actionButtons += `
        <button class="action-btn" style="background:var(--bg-elevated);" onclick="window.location.hash='#block/${blockId}'">Repasar este bloque</button>
        <button class="action-btn" style="background:var(--bg-elevated);" onclick="window.location.hash='#dashboard'">Ir al dashboard</button>
      `;
    } else {
      title = '⚡ ¡Sprint Completado!';
      starsHtml = '🏆';
      
      actionButtons += `
        <button class="action-btn" onclick="window.location.hash='#dashboard'">Ir al dashboard</button>
      `;
    }

    let html = `
      <div class="results-card">
        <div class="results-stars">${starsHtml}</div>
        <h1 style="margin-bottom:30px;">${title}</h1>
        
        <div class="stat-row">
          <span style="color:var(--text-secondary);">Aciertos</span>
          <span style="font-weight:bold; font-family:'JetBrains Mono', monospace;">${correct} / ${total} (${accuracy}%)</span>
        </div>
        
        <div class="stat-row">
          <span style="color:var(--text-secondary);">XP Ganado</span>
          <span style="font-weight:bold; color:var(--accent-orange);">+${xp}</span>
        </div>
        
        <div class="btn-group">
          ${actionButtons}
        </div>
      </div>
    `;

    document.getElementById('results').innerHTML = html;
    this.data = null; // Clear data after rendering
  },

  shootConfetti() {
    // Simple pure-css/js confetti if desired, or skip.
    // Since we don't have a library loaded, we'll just show an alert or let the stars speak for themselves.
    console.log("CONFETTI!");
  }
};
