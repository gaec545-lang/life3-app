// modules/dashboard.js
const DashboardModule = {
  render() {
    const appData = App.data;
    
    // Calculate global progress
    const totalBlocks = 10;
    const completedBlocks = Object.values(appData.blocks).filter(b => b.status === 'completed').length;
    const progressPercent = Math.round((completedBlocks / totalBlocks) * 100);
    
    // Get daily phrase
    const dayOfMonth = new Date().getDate();
    // Default to first phrase if current day is > 30 or not found
    const dailyPhrase = DAILY_PHRASES.find(p => p.day === dayOfMonth) || DAILY_PHRASES[0];

    // Check if sprint is available (>= 2 available/completed blocks)
    const unlockedBlocks = Object.values(appData.blocks).filter(b => b.status !== 'locked').length;
    const sprintDisabled = unlockedBlocks < 2 ? 'disabled' : '';

    let html = `
      <div class="header">
        <div class="logo">📘 Life 3 Study</div>
        <div class="streak">
          🔥 ${appData.streakDays}
        </div>
      </div>

      <div class="progress-container">
        <h3>Tu Progreso: ${progressPercent}%</h3>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progressPercent}%"></div>
        </div>
      </div>

      <div class="daily-context">
        <p class="en">"${dailyPhrase.en}"</p>
        <p class="es">"${dailyPhrase.es}"</p>
        <div style="margin-top: 10px; font-size: 0.8rem; color: var(--accent-blue);">
          Temas: ${dailyPhrase.topics.join(' / ')}
        </div>
      </div>

      <h2 style="margin-bottom: 15px;">Módulos de Estudio</h2>
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
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
            <span>${statusIcon}</span>
            <span class="stars">${starsHtml}</span>
          </div>
        </div>
      `;
    }

    html += `
      </div>
      
      <a href="#sprint" class="sprint-btn" ${sprintDisabled ? 'style="pointer-events:none; opacity:0.5;"' : ''}>
        ⚡ Sprint 10 min ${sprintDisabled ? '(Desbloquea 2 bloques)' : ''}
      </a>
    `;

    document.getElementById('dashboard').innerHTML = html;
  }
};
