// modules/dashboard.js
const DashboardModule = {
  render() {
    const appData = App.data;
    
    const totalBlocks = 10;
    const completedBlocks = Object.values(appData.blocks).filter(b => b.status === 'completed').length;
    const progressPercent = Math.round((completedBlocks / totalBlocks) * 100);
    
    const dayOfMonth = new Date().getDate();
    const dailyPhrase = DAILY_PHRASES.find(p => p.day === dayOfMonth) || DAILY_PHRASES[0];

    const unlockedBlocks = Object.values(appData.blocks).filter(b => b.status !== 'locked').length;
    const sprintDisabled = unlockedBlocks < 2 ? 'disabled' : '';

    let html = `
      <div class="header">
        <div class="logo">Life 3.</div>
        <div class="streak">
          🔥 ${appData.streakDays}
        </div>
      </div>

      <div class="progress-container glass">
        <h3 style="font-size:1.4rem;">Tu Progreso: <span style="color:var(--accent-blue);">${progressPercent}%</span></h3>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progressPercent}%"></div>
        </div>
      </div>

      <div class="daily-context glass">
        <p class="en">"${dailyPhrase.en}"</p>
        <p class="es">"${dailyPhrase.es}"</p>
        <div style="margin-top: 15px; font-size: 0.85rem; color: var(--accent-blue); font-weight:600; text-transform:uppercase; letter-spacing:1px;">
          Temas: ${dailyPhrase.topics.join(' • ')}
        </div>
      </div>

      <h2 style="margin-bottom: 20px; font-size:1.8rem;">Módulos de Estudio</h2>
      <div class="blocks-grid">
    `;

    for (let i = 1; i <= 10; i++) {
      const bData = BLOCKS[i];
      if (!bData) continue;
      
      const statusData = appData.blocks[i];
      const isLocked = statusData.status === 'locked';
      
      let statusIcon = '⭕';
      if (isLocked) statusIcon = '🔒';
      else if (statusData.status === 'completed') statusIcon = '✅';
      
      let starsHtml = '';
      if (!isLocked && statusData.stars > 0) {
        starsHtml = '⭐'.repeat(statusData.stars);
      }
      
      html += `
        <div class="block-card ${isLocked ? 'locked' : ''}" onclick="${isLocked ? '' : `window.location.hash='#block/${i}'`}">
          <div class="icon">${bData.icon}</div>
          <div class="title">B${i}: ${bData.title}</div>
          <div class="unit">${bData.unit}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
            <span style="font-size:1.2rem;">${statusIcon}</span>
            <span class="stars">${starsHtml}</span>
          </div>
        </div>
      `;
    }

    html += `
      </div>
      
      <a href="#sprint" class="action-btn sprint" style="text-decoration:none; display:flex; justify-content:center; align-items:center; gap:10px; ${sprintDisabled ? 'pointer-events:none; opacity:0.5;' : ''}">
        <span>⚡ Sprint 10 min</span>
        <span style="font-size:0.9rem; font-weight:400; opacity:0.8;">${sprintDisabled ? '(Desbloquea 2 bloques)' : ''}</span>
      </a>
    `;

    document.getElementById('dashboard').innerHTML = html;
  }
};
